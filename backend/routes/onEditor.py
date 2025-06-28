from flask import Blueprint, jsonify
from utils.supabase_client import supabase

onEditor_bp  = Blueprint('onEditor_bp', __name__)

@onEditor_bp.route('/problem/<int:order>/Editor', methods=['GET'])
def get_testcases(order):
    result = supabase.from_("test_cases").select("order_id","testcase_index","input","expected_output").eq("order_id", order).eq("is_hidden", False).execute()
    print(result.data, flush=True)
    try: 
        if not hasattr(result, "data") or result.data is None:
            return jsonify({"error": "Failed to fetch problem description"}), 500
    
        return jsonify(result.data), 200
    except Exception as e:
        print("Exception occured", str(e))
        return jsonify({"error": str(e)}), 500



