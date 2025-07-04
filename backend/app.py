from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.problems import problems_bp
from routes.ProblemDescription import problem_Description_bp
from routes.starterCode import starterCode_bp
from routes.onEditor import onEditor_bp

app = Flask(__name__)
CORS(app, supports_credentials=True)

app.register_blueprint(auth_bp)
app.register_blueprint(problems_bp)
app.register_blueprint(problem_Description_bp)
app.register_blueprint(starterCode_bp)
app.register_blueprint(onEditor_bp)

if __name__ == "__main__":
    app.run(debug=True)
