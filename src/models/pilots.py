from tools import db


class Pilots(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(db.Integer, db.ForeignKey("character.id"))
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicle.id"))

    def serialize(self):
        return {
            'id': self.id,
            'character_id': self.character_id,
            'vehicle_id': self.vehicle_id
        }