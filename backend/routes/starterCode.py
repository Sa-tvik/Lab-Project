from flask import Blueprint, jsonify
from utils.supabase_client import supabase

starterCode_bp = Blueprint("starterCode_bp", __name__)

@starterCode_bp.route('/problem/<int:order>/starter', methods=['GET'])
def get_starterCode(order):
    result = supabase.from_("starter_code").select("language","code").eq("order_id", order).execute()
    print(result.data, flush=True)
    try: 
        if not hasattr(result, "data") or result.data is None:
            return jsonify({"error": "Failed to fetch problem description"}), 500
    
        return jsonify(result.data), 200
    except Exception as e:
        print("Exception occured", str(e))
        return jsonify({"error": str(e)}), 500