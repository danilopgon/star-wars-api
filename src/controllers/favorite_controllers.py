from flask import jsonify, request
from flask_jwt_extended import  get_jwt_identity

from models import Favorite_vehicles, Favorite_characters, Favorite_planets, User, Planet, Character, Vehicle
from tools import db

def post_favorite_planet(user_id):
    try:
        planet_id = request.json.get('planet_id')

        if not planet_id:
            return "Planet not found in body", 400

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

def post_favorite_character(user_id):
    try:
        character_id = request.json.get('character_id')

        if not character_id:
            return "Character not found in body", 400

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

def post_favorite_vehicle(user_id):
    try:
        vehicle_id = request.json.get('vehicle_id')

        if not vehicle_id:
            return "Vehicle not found in body", 400

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


def delete_favorite_planet(user_id):
    try:
        planet_id = request.json.get('planet_id')

        if not planet_id:
            return "Planet not found in body", 400

        query = db.select(Favorite_planets).where(user_id == user_id and planet_id == planet_id)
        favorite_planet = db.session.execute(query).scalar()
        

        if not favorite_planet:
            return "Favorite planet not found", 404


        db.session.delete(favorite_planet)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def delete_favorite_character(user_id):
    try:
        character_id = request.json.get('character_id')

        if not character_id:
            return "Character not found in body", 400

        query = db.select(Favorite_characters).where(user_id == user_id and character_id == character_id)
        favorite_character = db.session.execute(query).scalar()

        if not favorite_character:
            return "Favorite character not found", 404

        db.session.delete(favorite_character)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500


def delete_favorite_vehicle(user_id):
    try:
        vehicle_id = request.json.get('vehicle_id')

        if not vehicle_id:
            return "Vehicle not found in body", 400

        query = db.select(Favorite_vehicles).where(user_id == user_id and vehicle_id == vehicle_id)
        favorite_vehicle = db.session.execute(query).scalar()

        if not favorite_vehicle:
            return "Favorite vehicle not found", 404

        db.session.delete(favorite_vehicle)
        db.session.commit()

        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500

def get_all_favorites(user_id):
    try:
        user = User.query.get(user_id)
        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500