from tools import db


pilots = db.Table(
    "Pilots",
    db.Column("id", db.Integer, primary_key=True),  # ID para la tabla
    db.Column(
        "vehicle_id", db.ForeignKey("vehicle.id")
    ),  # Columna que pillamos como foreignkey (por eso minuscula), para unir
    db.Column(
        "pilot_id", db.ForeignKey("character.id")
    ),  # Columna que pillamos como foreignkey (por eso minuscula), para unir
)

passengers = db.Table(
    "Passengers",
    db.Column("id", db.Integer, primary_key=True),
    db.Column("vehicle_id", db.ForeignKey("vehicle.id")),
    db.Column("passenger_id", db.ForeignKey("character.id")),
)


class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    url = db.Column(db.String, nullable=False, unique=True)
    cargo_capacity = db.Column(db.Integer, nullable=False)
    created = db.Column(db.String, nullable=False)
    crew = db.Column(db.Integer, nullable=False)
    length = db.Column(db.String, nullable=False)
    manufacturer = db.Column(db.String, nullable=False)
    max_atmosphering_speed = db.Column(db.Integer, nullable=False)
    model = db.Column(db.String, nullable=False)
    vehicle_class = db.Column(db.String, nullable=False)
    created = db.Column(db.DateTime, nullable=False)
    edited = db.Column(db.DateTime, nullable=False)
    pilots = db.relationship(
        "Character",  # Clase (en mayus) de la tabla a la que asociar, la otra primaria
        secondary=pilots,  # Nombre de la tabla secundaria donde hacemos la unión
        lazy="subquery",  # Estrategia de lazy
        backref=db.backref(
            "pilots", lazy=True
        ),  # Backref para que pueda aparecer la tabla secundaria como una columna y lazy True (es un boolean)
    )
    passengers = db.relationship(
        "Character",
        secondary=passengers,
        lazy="subquery",
        backref=db.backref("passengers", lazy=True),
    )


class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    height = db.Column(db.Integer, nullable=False)
    mass = db.Column(db.Integer, nullable=False)
    hair_color = db.Column(db.String, nullable=False)
    skin_color = db.Column(db.String, nullable=False)
    eye_color = db.Column(db.String, nullable=False)
    birth_year = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    homeworld = db.Column(db.String, nullable=False)
    created = db.Column(db.DateTime)
    edited = db.Column(db.DateTime)
