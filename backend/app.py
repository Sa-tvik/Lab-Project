import os
from flask import Flask, request
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix

load_dotenv()

app = Flask(__name__)

# ProxyFix only in production (behind nginx)
if os.getenv("FLASK_ENV") == "production":
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)

# CORS config: allow localhost during dev, only your domain in prod
if os.getenv("FLASK_ENV") == "production":
    cors_origins = [
        "https://lab-cad.me",
        "https://www.lab-cad.me"
    ]
else:
    cors_origins = [
        "http://localhost:3000",  # React default dev port
        "http://localhost:5173",  # Your other dev ports if any
    ]

CORS(
    app,
    supports_credentials=True,
    origins=cors_origins,
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    expose_headers=["Content-Type"]
)

app.secret_key = os.getenv("SECRET_KEY")

app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = os.path.join(app.instance_path, "flask_sessions")
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = 86400
app.config["SESSION_USE_SIGNER"] = True

app.config["SESSION_COOKIE_SECURE"] = os.getenv("FLASK_ENV") == "production"

os.makedirs(app.config["SESSION_FILE_DIR"], exist_ok=True)

Session(app)

ALLOWED_ORIGINS = cors_origins

@app.after_request
def after_request(response):
    origin = request.headers.get('Origin')
    if origin in ALLOWED_ORIGINS:
        response.headers['Access-Control-Allow-Origin'] = origin
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With, Accept, Origin'
    return response


# Import and register blueprints
from routes.auth import auth_bp
from routes.problems import problems_bp
from routes.ProblemDescription import problem_Description_bp
from routes.starterCode import starterCode_bp
from routes.onEditor import onEditor_bp
from routes.submission import submission_bp

app.register_blueprint(auth_bp)
app.register_blueprint(problems_bp)
app.register_blueprint(problem_Description_bp)
app.register_blueprint(starterCode_bp)
app.register_blueprint(onEditor_bp)
app.register_blueprint(submission_bp)

@app.route('/health', methods=['GET'])
def health_check():
    return {"status": "ok", "message": "Server is running"}

@app.route('/cors-test', methods=['GET', 'POST', 'OPTIONS'])
def cors_test():
    return {"status": "ok", "origin": request.headers.get('Origin', 'None')}

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
