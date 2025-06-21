from flask import Blueprint, request, jsonify
from utils.supabase_client import supabase

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        role = data.get("role","student")
        print("Received:", repr(email), repr(password))
        print(f"type(email): {type(email)}, type(password): {type(password)}")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        if response.get("error"):
            if "User already registered" in response["error"]["message"]:
                return jsonify({"error": "User already exists. Please log in."}), 409
            else:
                return jsonify({"error": response["error"]["message"]}), 400

        user = response.get("user")
        if not user:
            return jsonify({"error": "Signup failed. Please try again later."}), 400

        user_id = user["id"]

        # Insert role into the users table
        supabase.table("users").insert({
            "id": user_id,
            "email": email,
            "role": role
        }).execute()

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

