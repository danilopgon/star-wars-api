from flask import jsonify

from models import Planet
from tools import db


def get_all_planets():
    query = db.select(Planet).order_by(Planet.name)
    planets = db.session.execute(query).scalars()
    planets = [planet.serialize() for planet in planets]
    return jsonify(planets), 200


def get_planet_by_id(user_id):
    try:
        query = db.select(Planet).where(Planet.id == user_id)
        planet = db.session.execute(query).scalar()
        if not planet:
            return "Planet not found", 400

        return jsonify(planet.serialize()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500
