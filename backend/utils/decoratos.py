from functools import wraps
from flask import session, jsonify
required_role = "faculty"
def role_required(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'role' not in session:
                return jsonify({"error": "Authentication required"}), 401
            if session['role'] != required_role:
                return jsonify({"error": "Access denied"}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator
