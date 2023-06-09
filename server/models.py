from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Enum
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash


from config import db

# Models go here!


class OwnedPlant(db.Model, SerializerMixin):
    __tablename__ = 'owned_plants'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'))

    # Add a unique constraint to ensure only one instance of OwnedPlant per owner and plant
    db.UniqueConstraint('owner_id', 'plant_id')


class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    bankroll = db.Column(db.Integer, nullable=False)
    plants = association_proxy('owned_plants', 'plant')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Plant(db.Model, SerializerMixin):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(50))
    light_req = db.Column(Enum('low', 'medium', 'high', name='light_requirement'), nullable=False)
    water_req = db.Column(Enum('low', 'medium', 'high', name='water_requirement'), nullable=False)
    fertilizer_req = db.Column(Enum('low', 'medium', 'high', name='fertilizer_requirement'), nullable=False)
    pests = db.Column(db.Boolean)
    owned_plants = db.relationship('OwnedPlant', backref='plant')
