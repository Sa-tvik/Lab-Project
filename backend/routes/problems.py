from flask import Blueprint, jsonify
from utils.supabase_client import supabase

problems_bp = Blueprint('problems', __name__)

@problems_bp.route("/api/problems", methods=["GET"])
def get_problems():
    try:
        response = supabase.from_("problems").select("*").order("order_id", desc=False).execute()
        if not hasattr(response, "data") or response.data is None:
            return jsonify({"error": "Failed to fetch problem status"}), 500

        return jsonify(response.data    ), 200

    except Exception as e:
        print("🔥 Exception occurred:", str(e))
        return jsonify({"error": str(e)}), 500
    


