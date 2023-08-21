from flask import Blueprint, request

from controllers.vehicle_controllers import get_all_vehicles, get_vehicle_by_id

vehicle_routes = Blueprint("vehicle_routes", __name__)


@vehicle_routes.route("/", methods=["GET"])
def vehicles():
    return get_all_vehicles()


@vehicle_routes.route("/<int:vehicle_id>", methods=["GET"])
def caracter(vehicle_id):
    return get_vehicle_by_id(vehicle_id)
