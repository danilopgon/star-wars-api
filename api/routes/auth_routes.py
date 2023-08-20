from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from controllers.auth_controllers import login, signup, validate_token

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/login", methods=["POST"])
def login_route():
    return login()

@auth_routes.route("/signup", methods=["POST"])
def signup_route():
    return signup()

@auth_routes.route("/validate-token", methods=["GET"])
@jwt_required()
def validate_route():
    return validate_token()