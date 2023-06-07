from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy


from config import db

# Models go here!

class OwnedPlant(db.Model):
    __tablename__ = 'owned_plants'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plants.id'))

    owner = db.relationship('Owner', backref=db.backref('owned_plants', cascade='all, delete-orphan'))
    plant = db.relationship('Plant', backref=db.backref('owned_plants', cascade='all, delete-orphan'))

    # Add a unique constraint to ensure only one instance of OwnedPlant per owner and plant
    db.UniqueConstraint('owner_id', 'plant_id')

class Owner(db.Model):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    bankroll = db.Column(db.Integer, nullable=False)
    plants = association_proxy('owned_plants', 'plant')

class Plant(db.Model):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(50))
    light_req = db.Column(db.String(100))
    water_req = db.Column(db.String(100))
    fertilizer_req = db.Column(db.String(100))
    pests = db.Column(db.Boolean)
    owned_plants = db.relationship('OwnedPlant', backref='plant')





    
    

