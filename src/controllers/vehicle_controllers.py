from flask import jsonify

from models import Vehicle
from tools import db


def get_all_vehicles():
    query = db.select(Vehicle).order_by(Vehicle.name)
    vehicles = db.session.execute(query).scalars()
    vehicles = [vehicle.serialize() for vehicle in vehicles]
    return jsonify(vehicles), 200


def get_vehicle_by_id(user_id):
    try:
        query = db.select(Vehicle).where(Vehicle.id == user_id)
        vehicle = db.session.execute(query).scalar()
        if vehicle:
            return jsonify(vehicle.serialize()), 200
        else:
            return "Vehicle not found", 400
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500
