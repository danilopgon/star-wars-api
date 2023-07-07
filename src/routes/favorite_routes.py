from flask import Blueprint, request


from controllers.favorite_controllers import *

favorite_routes = Blueprint("favorite", __name__)

@favorite_routes.route("/planet/<int:planet_id>", methods=["POST", "DELETE"])
def favorite_planet(planet_id):
    if request.method == 'POST':
        return post_favorite_planet(1)
    if request.method == 'DELETE':
        return delete_favorite_planet(1)


@favorite_routes.route("/character/<int:character_id>", methods=["POST", "DELETE"])
def favorite_character(character_id):
    if request.method == 'POST':
        return post_favorite_character(1)
    if request.method == 'DELETE':
        return delete_favorite_character(1)


@favorite_routes.route("/vehicle/<int:vehicle_id>", methods=["POST", "DELETE"])
def favorite_vehicle(vehicle_id):
    if request.method == 'POST':
        return post_favorite_vehicle(1)
    if request.method == 'DELETE':
        return delete_favorite_vehicle(1)


