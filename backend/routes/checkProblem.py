from flask import Blueprint, jsonify, session
from utils.supabase_client import supabase

checkProblem_bp = Blueprint("checkProblem", __name__)

@checkProblem_bp.route("/api/checkProblem/<int:order>", methods=["GET"])
def checkProblem(order):
    try:
        response = supabase.from_("problems").select("is_unlocked").eq("order_id", order).execute()
        if not hasattr(response, "data") or response.data is None:
            return jsonify({"error": "Failed to fetch problem status"}), 500

        isUnlocked = response.data[0]["is_unlocked"]
        return jsonify(isUnlocked), 200

    except Exception as e:
        print("Exception occurred:", str(e))
        return jsonify({"error": str(e)}), 500