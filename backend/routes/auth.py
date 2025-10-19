from flask import Blueprint, request, jsonify, session, current_app
from utils.supabase_client import supabase

auth_bp = Blueprint('auth', __name__)

def set_user_session(user_id, email, role, access_token):
    session["user_id"] = user_id
    session["email"] = email
    session["role"] = role
    session["access_token"] = access_token


@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        role = data.get("role", "student")
        first_name = data.get("first_name", "").strip()
        last_name = data.get("last_name", "").strip()
        phone = data.get("phone", "").strip()
        registration_number = data.get("registration_number", "").strip()
        allowed_domain = "@muj.manipal.edu"

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
            return jsonify({"error": "Signup failed. Email may already be registered."}), 400

        user_id = user.id

        # Insert user into custom users table
        insert_response = supabase.table("users").insert({
            "id": user_id,
            "email": email,
            "registration_number": registration_number,
            "first_name": first_name,
            "last_name": last_name,
            "phone": phone,
            "role": role
        }).execute()

        if insert_response.data is None:
            return jsonify({"error": "User registered, but failed to insert into users table."}), 500

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


@auth_bp.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        # Authenticate user
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if response.user is None:
            current_app.logger.error(f"Login failed: {response}")
            return jsonify({"error": "Invalid email or password"}), 401

        if not response.user.confirmed_at:
            return jsonify({"error": "Please confirm your email before logging in."}), 403

        # Store token and user ID in session
        session['access_token'] = response.session.access_token
        session['user_id'] = response.user.id

        return jsonify({"message": "Login successful"}), 200

    except Exception as e:
        current_app.logger.error(f"Login error: {e}")
        return jsonify({"error": "Internal server error"}), 500

@auth_bp.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

@auth_bp.route('/api/check-auth')
def check_auth():
    if 'user_id' in session:
        return jsonify({
            "authenticated": True,
            "user_id": session['user_id'],
            "email": session.get('email'),
            "role": session.get('role')
        }), 200
    else:
        return jsonify({"authenticated": False}), 401

