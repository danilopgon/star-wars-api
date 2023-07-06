from flask import Blueprint, request

character_routes = Blueprint("character_routes", __name__)


@character_routes.route("/", methods=["GET"])
def character():
    return "Obteniendo personajes"
