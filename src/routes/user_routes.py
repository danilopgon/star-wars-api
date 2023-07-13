from flask import Blueprint, request

from controllers.users_controllers import get_all_users, get_user_with_favorites

user_routes = Blueprint("user_routes", __name__)


@user_routes.route("/", methods=["GET"])
def user():
    return get_all_users()

@user_routes.route("/favorites", methods=["GET"])
def user_favorites():
    return get_user_with_favorites(1)