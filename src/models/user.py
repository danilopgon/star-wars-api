from tools import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    favorite_planets = db.relationship(
        "Planet", secondary="favorite_planets", backref="users"
    )
    # Otra tabla primaria | Tabla secundaria que recoge la relación | Columna que representa la tabla actual en la otra primaria
    favorite_characters = db.relationship(
        "Character", secondary="favorite_characters", backref="users"
    )
    favorite_vehicles = db.relationship(
        "Vehicle", secondary="favorite_vehicles", backref="users"
    )
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return "<User %r>" % self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

    def serialize_with_favorites(self):
        return {
            "id": self.id,
            "username": self.username,
            "favorites_planets": [
                planet.serialize() for planet in self.favorite_planets
            ],
            "favorites_vehicles": [
                vehicle.serialize() for vehicle in self.favorite_vehicles
            ],
            "favorites_characters": [
                character.serialize() for character in self.favorite_characters
            ],
        }
