from flask import Blueprint, jsonify, request
from utils.supabase_client import supabase
import requests
import time
import os
from utils.inputFormatter import format_input

# blueprint for submission routes
submission_bp = Blueprint("submission_bp", __name__)

# judge0 setup - pull from env, with a fallback for local dev
JUDGE0_BASE_URL = os.environ.get("JUDGE0_BASE_URL")
HEADERS = {"Content-Type": "application/json"}

# map our language names to judge0's internal IDs
ALLOWED_LANGUAGES = {
    'Java': 62,
    'Python': 71,
    'C++': 54,
    'C': 50,
}


@submission_bp.route('/problem/<int:order>/submission', methods=['POST'])
def batch_submissions(order):
    """
    Handles code submissions for a given problem. It runs the code against
    all test cases and returns the graded results.
    """
    try:
        # 1. grab all test cases for this problem from the db
        testcases_response = supabase.from_("test_cases") \
            .select("input", "expected_output", "testcase_index") \
            .eq("order_id", order).execute()

        # if there are no test cases, we can't do anything
        if not hasattr(testcases_response, "data") or not testcases_response.data:
            return jsonify({"error": f"No test cases found for problem order {order}"}), 404

        testcases = testcases_response.data
        
        # 2. format each test case's raw JSON input into a plain string for stdin
        formatted_inputs = []
        for tc in testcases:
            try:
                formatted = format_input(order, tc)
                formatted_inputs.append(formatted)
            except Exception as e:
                # bail if the formatter breaks on any specific test case
                print(f"Input format error for testcase {tc.get('testcase_index')}: {str(e)}")
                return jsonify({"error": f"Invalid input format for testcase {tc.get('testcase_index')}"}), 400

        # 3. get the user's code and language from the request body
        data = request.get_json()
        language_id = data.get("language_id")
        source_code = data.get("source_code")

        if not language_id or not source_code:
            return jsonify({"error": "Missing 'language_id' or 'source_code' in request body"}), 400
            
        if language_id not in ALLOWED_LANGUAGES.values():
            return jsonify({"error": "Language not supported"}), 400

        # 4. build the payload for judge0's batch api. one submission per test case.
        submissions_payload = {
            "submissions": [
                {
                    "source_code": source_code,
                    "language_id": language_id,
                    "stdin": f_input["input"]
                } for f_input in formatted_inputs
            ]
        }

        # 5. send the whole batch to judge0
        batch_response = requests.post(
            f"{JUDGE0_BASE_URL}/submissions/batch?base64_encoded=false",
            headers=HEADERS,
            json=submissions_payload
        )

        if batch_response.status_code != 201:
            return jsonify({"error": "Failed to create submission in Judge0", "details": batch_response.text}), 500

        tokens = [item["token"] for item in batch_response.json()]
        tokens_query = ",".join(tokens)
        
        # 6. poll judge0 until the submissions are done. `time.sleep()` is a sin.
        final_results = {}
        for _ in range(10): # poll for ~15s max
            result_response = requests.get(
                f"{JUDGE0_BASE_URL}/submissions/batch",
                params={"tokens": tokens_query, "base64_encoded": "false", "fields": "stdout,stderr,status_id,token,compile_output"},
                headers=HEADERS
            )
            
            if result_response.status_code != 200:
                return jsonify({"error": "Failed to poll results from Judge0"}), 500
            
            submissions_data = result_response.json().get("submissions", [])
            
            # check for a compilation error first. if it fails to compile, fail fast.
            for sub in submissions_data:
                if sub.get("status_id") == 6: # status 6 == Compilation Error
                    # return 200 OK because the API call was fine, but include the CE details
                    return jsonify({
                        "results": [],
                        "error_type": "Compilation Error",
                        "details": sub.get("compile_output") or sub.get("stderr", "No details available.")
                    }), 200

            # status > 2 means it's not "In Queue" or "Processing" anymore
            if all(sub.get("status_id", 0) > 2 for sub in submissions_data):
                final_results = {res["token"]: res for res in submissions_data}
                break # exit the polling loop
            
            time.sleep(1.5)

        # if we're still here, the polling timed out
        if not final_results:
            return jsonify({"error": "Submission processing timed out"}), 408

        # batch results aren't guaranteed to be in order, so we need to sort them back
        ordered_results = [final_results.get(token) for token in tokens]

        # 7. now, grade the ordered results
        graded_results = []
        for i, result in enumerate(ordered_results):
            if not result: continue

            expected_output = testcases[i]["expected_output"].strip()
            actual_output = (result.get("stdout") or "").strip()
            status_id = result.get("status_id")
            
            # a "pass" requires Judge0 status "Accepted" (3) AND a matching output
            passed = status_id == 3 and (expected_output == actual_output)

            graded_results.append({
                "testcase_index": testcases[i]["testcase_index"],
                "input": formatted_inputs[i]["input"],
                "expected_output": expected_output,
                "actual_output": actual_output,
                "status_id": status_id,
                "passed": passed
            })

        return jsonify({"results": graded_results}), 200

    except Exception as e:
        print(f"An unexpected exception occurred: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500