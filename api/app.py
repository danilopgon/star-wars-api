"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS
from tools import db


from routes.api import api

static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "front", "dist")


app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "8X4HjdXkyV"
jwt = JWTManager(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
migrate = Migrate(app, db)
CORS(app)


# initialize the app with the extension
db.init_app(app)

# create tables
with app.app_context():
    db.create_all()

app.register_blueprint(api, url_prefix="/api")


@app.route("/")
@app.route("/<path:path>", methods=["GET"])
def serve_any_other_file(path="index.html"):
    path = path if os.path.isfile(os.path.join(static_file_dir, path)) else "index.html"
    response = send_from_directory(static_file_dir, path)
    return response


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
