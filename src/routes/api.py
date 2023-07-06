from flask import Blueprint

from .character_routes import character_routes
from .user_routes import user_routes

api = Blueprint("api", __name__)

api.register_blueprint(character_routes, url_prefix="/people")
api.register_blueprint(user_routes, url_prefix="/users")