from tools import db


class Favorite_vehicles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    vehicle_id = db.Column(db.Integer, db.ForeignKey("vehicle.id"))
