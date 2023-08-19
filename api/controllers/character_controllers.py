from flask import jsonify

from models import Character
from tools import db


def get_all_characters():
    query = db.select(Character).order_by(Character.name)
    characters = db.session.execute(query).scalars()
    characters = [character.serialize() for character in characters]
    return jsonify(characters), 200


def get_character_by_id(user_id):
    try:
        query = db.select(Character).where(Character.id == user_id)
        character = db.session.execute(query).scalar()
        if not character:
            return "Character not found", 400

        return jsonify(character.serialize()), 200

    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500
