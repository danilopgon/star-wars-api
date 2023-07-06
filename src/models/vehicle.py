from tools import db


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    cargo_capacity = db.Column(db.Integer, nullable=False)
    crew = db.Column(db.Integer, nullable=False)
    length = db.Column(db.Integer, nullable=False)
    manufacturer = db.Column(db.String(100), nullable=False)
    max_atmosphering_speed = db.Column(db.Integer, nullable=False)
    model = db.Column(db.String(100), nullable=False)
    vehicle_class = db.Column(db.String(100), nullable=False)
    url = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return "<Vehicle %r>" % self.name

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "url": self.url,
            "cargo_capacity": self.cargo_capacity,
            "crew": self.crew,
            "length": self.length,
            "manufacturer": self.manufacturer,
            "max_atmosphering_speed": self.max_atmosphering_speed,
            "model": self.model,
            "vehicle_class": self.vehicle_class,
        }
