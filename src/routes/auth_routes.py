from flask import Blueprint, request

from controllers.auth_controllers import login, signup

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/login", methods=["POST"])
def login_route():
    return login()

@auth_routes.route("/signup", methods=["POST"])
def signup_route():
    return signup()
