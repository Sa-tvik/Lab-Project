from flask import Blueprint, request, jsonify
from utils.supabase_client import supabase
import os

unlockProblem_bp = Blueprint('unlock', __name__)

@unlockProblem_bp.route("/api/problems/unlock/<int:order>", methods=["PATCH"])
def unlock_problem(order):
    data = request.get_json()
    status = False if data.get("is_unlocked") else True
    response = supabase.table("problems").update({"is_unlocked": status}).eq("order_id", order).execute()

    if response.data:
        return jsonify({"success": True, "problem": response.data[0]})
    return jsonify({"success": False, "message": "Failed to update"}), 400
