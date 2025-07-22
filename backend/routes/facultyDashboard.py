from flask import Blueprint, jsonify
from utils.supabase_client import supabase
from utils.decoratos import role_required

facultyDashboard_bp  = Blueprint('facultyDashboard_bp', __name__)

@role_required('faculty')
@facultyDashboard_bp.route('/faculty/dashboard', methods=['GET'])
def get_testcases(order):
        return jsonify({"error": str(e)}), 500