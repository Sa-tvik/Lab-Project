from flask import Blueprint, request, jsonify
from supabase import create_client
from utils.supabase_client import supabase

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        print("Received:", repr(email), repr(password))
        print(f"type(email): {type(email)}, type(password): {type(password)}")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        print("Supabase response:", response)
        return jsonify({"message": "User signed up successfully!"}), 200

    except Exception as e:
        print("Signup error:", str(e))
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
    

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    try:
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        # Extract relevant session info
        session = response.session
        user = response.user

        return jsonify({
            "message": "Login successful",
            "access_token": session.access_token,
            "refresh_token": session.refresh_token,
            "user": {
                "id": user.id,
                "email": user.email
            }
        }), 200

    except Exception as e:
        print("Login error:", e)
        return jsonify({"error": str(e)}), 401

