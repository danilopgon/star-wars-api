from flask import jsonify

from models import User
from tools import db


def get_all_users():
    query = db.select(User).order_by(User.username)
    users = db.session.execute(query).scalars()
    users = [user.serialize() for user in users]
    return jsonify(users), 200

def get_user_with_favorites(user_id):
    try:
        query = db.select(User).where(User.id == user_id)
        user = db.session.execute(query).scalar()
        if not user:
            return "User not found", 400

        return jsonify(user.serialize_with_favorites()), 200
    except Exception as e:
        response = {"error": str(e)}
        return jsonify(response), 500
