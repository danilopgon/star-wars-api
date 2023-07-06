from tools import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    favorite_planets = db.relationship("Planet", secondary="favorite_planets", backref="users")
    favorite_characters = db.relationship("Character", secondary="favorite_characters", backref="users")
    favorite_vehicles = db.relationship("Vehicle", secondary="favorite_vehicles", backref="users")
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return "<User %r>" % self.email

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
