from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from controllers.favorite_controllers import *

favorite_routes = Blueprint("favorite", __name__)

current_user_id = get_jwt_identity

@favorite_routes.route("/planet/<int:planet_id>", methods=["POST", "DELETE"])
@jwt_required()
def favorite_planet(planet_id):
    user_id = get_jwt_identity()
    if request.method == 'POST':
        return post_favorite_planet(user_id)
    if request.method == 'DELETE':
        return delete_favorite_planet(user_id)


@favorite_routes.route("/character/<int:character_id>", methods=["POST", "DELETE"])
@jwt_required()
def favorite_character(character_id):
    user_id = get_jwt_identity()
    if request.method == 'POST':
        return post_favorite_character(user_id)
    if request.method == 'DELETE':
        return delete_favorite_character(user_id)


@favorite_routes.route("/vehicle/<int:vehicle_id>", methods=["POST", "DELETE"])
@jwt_required()
def favorite_vehicle(vehicle_id):
    user_id = get_jwt_identity()
    if request.method == 'POST':
        return post_favorite_vehicle(user_id)
    if request.method == 'DELETE':
        return delete_favorite_vehicle(user_id)


@favorite_routes.route("/", methods=["GET"])
@jwt_required()
def get_user_favorites():
    user_id = get_jwt_identity()
    favorites = get_all_favorites(user_id)
    return favorites

