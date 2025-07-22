from flask import Flask
from flask_cors import CORS
from flask_session import Session
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.secret_key = os.getenv("SECRET_KEY") # Secret key for session signing

#  ROUTES
from routes.auth import auth_bp
from routes.problems import problems_bp
from routes.ProblemDescription import problem_Description_bp
from routes.starterCode import starterCode_bp
from routes.onEditor import onEditor_bp

# Flask-Session Configuration
app.config["SESSION_TYPE"] = "filesystem" 
app.config["SESSION_FILE_DIR"] = os.path.join(app.instance_path, "flask_sessions")
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIME"] = 86400  # 1 day in seconds
app.config["SESSION_USE_SIGNER"] = True
app.config["SESSION_COOKIE_HTTPONLY"] = True
app.config["SESSION_COOKIE_SECURE"] = False  # Set to True on HTTPS in production
os.makedirs(app.config["SESSION_FILE_DIR"], exist_ok=True)

Session(app)

# CORS for frontend-backend communication


app.register_blueprint(auth_bp)
app.register_blueprint(problems_bp)
app.register_blueprint(problem_Description_bp)
app.register_blueprint(starterCode_bp)
app.register_blueprint(onEditor_bp)

if __name__ == "__main__":
    app.run(debug=True)
