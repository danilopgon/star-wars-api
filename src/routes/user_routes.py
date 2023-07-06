from flask import Blueprint, request

from controllers.users_controllers import get_all_users

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/", methods=["GET"])
def user():
    return get_all_users()
