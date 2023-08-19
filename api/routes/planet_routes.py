from flask import Blueprint, request

from controllers.planet_controllers import get_all_planets, get_planet_by_id

planet_routes = Blueprint("planet_routes", __name__)


@planet_routes.route("/", methods=["GET"])
def planets():
    return get_all_planets()


@planet_routes.route("/<int:planet_id>", methods=["GET"])
def caracter(planet_id):
    return get_planet_by_id(planet_id)
