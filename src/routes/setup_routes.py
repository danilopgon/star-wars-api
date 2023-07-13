from flask import Blueprint

from tools import db
from models import Character, Planet, Vehicle
from controllers.setup_controllers import setupCharacters, setupPlanets, setupVehicles

setup_routes = Blueprint('setup_routs', __name__)

@setup_routes.route('/', methods=["GET"])
def setup():
    try:
        with db.session.no_autoflush:
            if db.session.query(Character).count() == 0:
                setupCharacters()
                return "Data setup completed for Characters."
            
            if db.session.query(Planet).count() == 0:
                setupPlanets()
                return "Data setup completed for Planets."
            
            if db.session.query(Vehicle).count() == 0:
                setupVehicles()
                return "Data setup completed for Vehicles."
            
            return "All tables already have rows. Data setup skipped."
    except Exception as e:
        return f"An error occurred during data setup: {str(e)}"
