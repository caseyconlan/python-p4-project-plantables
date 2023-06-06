from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import ForeignKey, Column, Integer, String, Numeric, Float, create_engine
from sqlalchemy.orm import Session, declarative_base, relationship, column_property
from sqlalchemy.ext.associationproxy import association_proxy
# from sqlalchemy.ext.hybrid import hybrid_property

from config import db

# Models go here!
class Owner(db.Model):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    bankroll = db.Column(db.Integer, nullable=False)
    

