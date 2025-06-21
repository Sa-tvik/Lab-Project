from flask import Blueprint, jsonify
from utils.supabase_client import supabase

problem_Description_bp = Blueprint('problem_description', __name__)

@problem_Description_bp.route("/problem/<int:order>", methods=["GET"])
def get_problem_by_order(order):
    try:
        result = supabase.from_("problems").select("*").eq("order_id", order).single().execute()

        if not hasattr(result, "data") or result.data is None:
            return jsonify({"error": "Failed to fetch problem description"}), 500
        return jsonify(result.data), 200
    except Exception as e:
        print("Exception occured", str(e))
        return jsonify({"error": str(e)}), 500