from flask import jsonify, request
from flask_jwt_extended import  get_jwt_identity

from models import Favorite_vehicles, Favorite_characters, Favorite_planets, User, Planet, Character, Vehicle
from tools import db

from flask_jwt_extended import jwt_required, get_jwt_identity


def post_favorite_planet(planet_id):
    try:
        user = get_jwt_identity()
        user_id = user["id"]

        planet = Planet.query.get(planet_id)
        
        if not planet:
            return "Planet not found", 404
        

        existing_favorite = Favorite_planets.query.filter_by(user_id=user_id, planet_id=planet_id).first()
        
        if existing_favorite:
            return "Favorite planet already exists for the user", 409

        favorite_planet = Favorite_planets(user_id=user_id, planet_id=planet_id)
        db.session.add(favorite_planet)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 201
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def post_favorite_character(character_id):
    try:
        user = get_jwt_identity()
        user_id = user["id"]

        character = Character.query.get(character_id)
        if not character:
            return "Character not found", 404

        existing_favorite = Favorite_characters.query.filter_by(user_id=user_id, character_id=character_id).first()
        if existing_favorite:
            return "Favorite character already exists for the user", 409

        favorite_character = Favorite_characters(user_id=user_id, character_id=character_id)
        db.session.add(favorite_character)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 201
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def post_favorite_vehicle(vehicle_id):
    try:
        user = get_jwt_identity()
        user_id = user["id"]

        vehicle = Vehicle.query.get(vehicle_id)
        if not vehicle:
            return "Vehicle not found", 404

        existing_favorite = Favorite_vehicles.query.filter_by(user_id=user_id, vehicle_id=vehicle_id).first()
        if existing_favorite:
            return "Favorite vehicle already exists for the user", 409

        favorite_vehicle = Favorite_vehicles(user_id=user_id, vehicle_id=vehicle_id)
        db.session.add(favorite_vehicle)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 201
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def delete_favorite_planet(planet_id):
    try:
        user = get_jwt_identity()
        user_id = user["id"]

        favorite_planet = Favorite_planets.query.filter_by(user_id=user_id, planet_id=planet_id).first()
        if not favorite_planet:
            return "Favorite planet not found", 404

        db.session.delete(favorite_planet)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def delete_favorite_character(character_id):
    try:
        user = get_jwt_identity()
        user_id = user["id"]

        favorite_character = Favorite_characters.query.filter_by(user_id=user_id, character_id=character_id).first()
        if not favorite_character:
            return "Favorite character not found", 404

        db.session.delete(favorite_character)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def delete_favorite_vehicle(vehicle_id):
    try:
        user = get_jwt_identity()
        user_id = user["id"]

        favorite_vehicle = Favorite_vehicles.query.filter_by(user_id=user_id, vehicle_id=vehicle_id).first()
        if not favorite_vehicle:
            return "Favorite vehicle not found", 404

        db.session.delete(favorite_vehicle)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500
    
def get_all_favorites():
    try:
        user = get_jwt_identity()
        user_id = user["id"]
        
        found_user = User.query.get(user_id)
        return jsonify(found_user.serialize_with_favorites()), 200

        
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500