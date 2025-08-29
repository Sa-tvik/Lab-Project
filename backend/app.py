from flask import Flask, request, make_response
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix
import os

load_dotenv()

app = Flask(__name__)

# Trust Cloudflare proxy headers
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

# Secure CORS config: only allow your specific frontend URLs
CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:5173",         # dev frontend
        "http://localhost:5174",         # alternative dev port
        "https://lab-cad.vercel.app",    # production frontend (Vercel)
        "https://www.lab-cad.me",        # production frontend (custom domain)
        "https://lab-cad.me"             # production frontend (custom domain without www)
    ],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    expose_headers=["Content-Type"]
)

# Secret key for signing sessions and cookies
app.secret_key = os.getenv("SECRET_KEY")

# Flask-Session configuration
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = os.path.join(app.instance_path, "flask_sessions")
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = 86400  # 1 day in seconds
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = os.getenv("FLASK_ENV") == "production"  

os.makedirs(app.config["SESSION_FILE_DIR"], exist_ok=True)

Session(app)

# Define allowed origins as a module-level constant
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://lab-cad.vercel.app",
    "https://www.lab-cad.me",
    "https://lab-cad.me"
]

# Manual CORS preflight handling removed; Flask-CORS handles CORS automatically.

from routes.auth import auth_bp
from routes.problems import problems_bp
from routes.ProblemDescription import problem_Description_bp
from routes.starterCode import starterCode_bp
from routes.onEditor import onEditor_bp
from routes.submission import submission_bp

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(problems_bp)
app.register_blueprint(problem_Description_bp)
app.register_blueprint(starterCode_bp)
app.register_blueprint(onEditor_bp)
app.register_blueprint(submission_bp)

# Test endpoint for Cloudflare
@app.route('/health', methods=['GET'])
def health_check():
    return {"status": "ok", "message": "Server is running"}

@app.route('/cors-test', methods=['GET', 'POST', 'OPTIONS'])
def cors_test():
    return {"status": "ok", "origin": request.headers.get('Origin', 'None')}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
