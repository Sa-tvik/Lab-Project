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


# (only the function body needs to replace your current batch_submissions implementation)
@submission_bp.route('/api/problem/<int:order>/submission', methods=['POST'])
def batch_submissions(order):
    try:
        testcases_response = supabase.from_("test_cases") \
            .select("input", "expected_output", "testcase_index") \
            .eq("order_id", order).execute()

        if not hasattr(testcases_response, "data") or not testcases_response.data:
            return jsonify({"error": f"No test cases found for problem order {order}"}), 404

        testcases = testcases_response.data

        formatted_inputs = []
        for tc in testcases:
            try:
                formatted = format_input(order, tc)
                formatted_inputs.append(formatted)
            except Exception as e:
                print(f"Input format error for testcase {tc.get('testcase_index')}: {str(e)}")
                return jsonify({"error": f"Invalid input format for testcase {tc.get('testcase_index')}"}), 400

        data = request.get_json()
        language_id = data.get("language_id")
        source_code = data.get("source_code")

        if not language_id or not source_code:
            return jsonify({"error": "Missing 'language_id' or 'source_code' in request body"}), 400

        if language_id not in ALLOWED_LANGUAGES.values():
            return jsonify({"error": "Language not supported"}), 400

        submissions_payload = {
            "submissions": [
                {
                    "source_code": source_code,
                    "language_id": language_id,
                    "stdin": f_input["input"]
                } for f_input in formatted_inputs
            ]
        }

        # Add a small timeout to the request call to judge0
        try:
            batch_response = requests.post(
                f"{JUDGE0_BASE_URL}/submissions/batch?base64_encoded=false",
                headers=HEADERS,
                json=submissions_payload,
                timeout=20  # seconds for the create call
            )
        except requests.RequestException as e:
            return jsonify({"error": "Failed to reach Judge0", "details": str(e)}), 502

        if batch_response.status_code != 201:
            return jsonify({"error": "Failed to create submission in Judge0", "details": batch_response.text}), 500

        tokens = [item["token"] for item in batch_response.json()]
        tokens_query = ",".join(tokens)

        # Poll with fewer iterations and shorter sleep; set timeouts on each request
        final_results = {}
        max_polls = 15
        poll_sleep = 2.0
        for _ in range(max_polls):
            try:
                result_response = requests.get(
                    f"{JUDGE0_BASE_URL}/submissions/batch",
                    params={"tokens": tokens_query, "base64_encoded": "false", "fields": "stdout,stderr,status_id,token,compile_output"},
                    headers=HEADERS,
                    timeout=20
                )
            except requests.RequestException as e:
                return jsonify({"error": "Failed to poll results from Judge0", "details": str(e)}), 502

            if result_response.status_code != 200:
                return jsonify({"error": "Failed to poll results from Judge0", "details": result_response.text}), 500

            submissions_data = result_response.json().get("submissions", [])

            # check for compilation error first
            for sub in submissions_data:
                if sub.get("status_id") == 6:
                    return jsonify({
                        "results": [],
                        "error_type": "Compilation Error",
                        "details": sub.get("compile_output") or sub.get("stderr", "No details available.")
                    }), 200

            if all(sub.get("status_id", 0) > 2 for sub in submissions_data):
                final_results = {res["token"]: res for res in submissions_data}
                break

            # shorter sleep to reduce total blocking time
            time.sleep(poll_sleep)

        if not final_results:
            # Give a clear response to client — and don't let the worker die silently
            return jsonify({"error": "Submission processing timed out"}), 408

        ordered_results = [final_results.get(token) for token in tokens]

        graded_results = []
        for i, result in enumerate(ordered_results):
            if not result: continue

            expected_output = testcases[i]["expected_output"].strip()
            actual_output = (result.get("stdout") or "").strip()
            status_id = result.get("status_id")

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
