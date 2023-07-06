from flask import jsonify

from models import User
from tools import db


def get_all_users():
    query = db.select(User).order_by(User.email)
    users = db.session.execute(query).scalars()
    users = [user.serialize() for user in users]
    return jsonify(users), 200
