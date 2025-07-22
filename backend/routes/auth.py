from flask import Blueprint, request, jsonify, session, current_app
from utils.supabase_client import supabase

auth_bp = Blueprint('auth', __name__)

def set_user_session(user_id, email, role, access_token):
    session["user_id"] = user_id
    session["email"] = email
    session["role"] = role
    session["access_token"] = access_token


@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        allowed_domain = "@muj.manipal.edu" 
        password = data.get("password", "").strip()
        role = data.get("role", "student")
        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        phone = data.get("phone", "").strip()
        registration_number = data.get("registration_number", "").strip()

        if not email.endswith(allowed_domain):
            return jsonify({"error": f"Signups are only allowed with {allowed_domain} email addresses."}), 403
    
        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })

        user = response.user
        session_data = response.session

        if not user:
            return jsonify({"error": "Signup failed. Check if the email is already registered."}), 400

        user_id = user.id

        # Insert user into your users table
        insert_response = supabase.table("users").insert({
            "id": user_id,
            "email": email,
            "registration_number": registration_number,
            "first_name": first_name,
            "last_name": last_name,
            "phone":phone,
            "role": role
        }).execute()

        if insert_response.data is None:
            return jsonify({"error": "Failed to store user data"}), 500

        if session_data:
            access_token = session_data.access_token
            set_user_session(user_id, email, role, access_token)
            return jsonify({
                "message": "User signed up and auto-logged in.",
                "autoLoggedIn": True,
                "user": {
                    "id": user_id,
                    "email": email,
                    "role": role
                }
            }), 200
        else:
            return jsonify({
                "message": "Signup successful. Please verify your email before logging in.",
                "autoLoggedIn": False,
                "emailConfirmationRequired": True,
                "user": {
                    "id": user_id,
                    "email": email,
                    "role": role
                }
            }), 200

    except Exception as e:
        current_app.logger.error(f"Signup error: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if hasattr(response, "error") and response.error:
            return jsonify({"error": "Invalid login credentials"}), 401

        user = getattr(response, "user", None)
        if not user:
            return jsonify({"error": "Login failed"}), 401

        if not getattr(user, "email_confirmed_at", None):
            return jsonify({"error": "Email not verified. Please confirm your email first."}), 403

        user_id = getattr(user, "id", None)
        email = getattr(user, "email", None)

        # Fetch user role from users table
        role_data = supabase.table("users").select("role").eq("id", user_id).single().execute()
        if role_data.get("error"):
            return jsonify({"error": "Failed to fetch user role"}), 500

        role = role_data.get("data", {}).get("role", "student")
        access_token = getattr(response.session, "access_token", None)

        set_user_session(user_id, email, role, access_token)

        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user_id,
                "email": email,
                "role": role
            }
        }), 200

    except Exception as e:
        current_app.logger.error(f"Login error: {str(e)}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500


@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

