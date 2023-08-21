from flask import Blueprint, request

from controllers.character_controllers import get_all_characters, get_character_by_id

character_routes = Blueprint("character_routes", __name__)


@character_routes.route("/", methods=["GET"])
def characters():
    return get_all_characters()

@character_routes.route("/<int:character_id>", methods=["GET"])
def caracter(character_id):
    return get_character_by_id(character_id)