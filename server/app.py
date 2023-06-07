#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, reqparse
from flask_sqlalchemy import SQLAlchemy

# Local imports
from config import app, db, api
from models import Owner, Plant

class OwnerList(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('first_name', type=str, required=True)
        parser.add_argument('last_name', type=str, required=True)
        parser.add_argument('email', type=str, required=True)
        parser.add_argument('username', type=str, required=True)
        parser.add_argument('password', type=str, required=True)
        parser.add_argument('bankroll', type=int, required=True)
        args = parser.parse_args()

        new_owner = Owner(
            first_name=args['first_name'],
            last_name=args['last_name'],
            email=args['email'],
            username=args['username'],
            password=args['password'],
            bankroll=args['bankroll']
        )
        db.session.add(new_owner)
        db.session.commit()
        owner_dict = new_owner.to_dict()
        return owner_dict, 201

class OwnerByID(Resource):
    def get(self, owner_id):
        owner = Owner.query.filter_by(id=owner_id).first()
        if owner:
            owner_data = owner.to_dict()
            return make_response(jsonify(owner_data), 200)
        else:
            return make_response(jsonify({'message': 'Owner not found'}), 404)

    def patch(self, owner_id):
        owner = Owner.query.filter_by(id=owner_id).first()
        if owner:
            data = request.get_json()
            for attr in data:
                setattr(owner, attr, data[attr])
            db.session.add(owner)
            db.session.commit()
            owner_dict = owner.to_dict()
            return make_response(jsonify(owner_dict), 200)
        else:
            return make_response(jsonify({'message': 'Owner not found'}), 404)

    def delete(self, owner_id):
        owner = Owner.query.filter_by(id=owner_id).first()
        if owner:
            db.session.delete(owner)
            db.session.commit()
            return make_response('', 204)
        else:
            return make_response(jsonify({'message': 'Owner not found'}), 404)


class OwnerPlants(Resource):
    def get(self, owner_id):
        owner = Owner.query.filter_by(id=owner_id).first()
        if owner:
            plants = owner.plants  # Retrieve all plants associated with the owner
            plant_data = [plant.to_dict() for plant in plants]  # Convert plants to dictionaries
            return make_response(jsonify(plant_data), 200)
        else:
            
            return make_response(jsonify({'message': 'Owner not found'}), 404)


api.add_resource(OwnerList, '/owners')
api.add_resource(OwnerByID, '/owners/<int:owner_id>')
api.add_resource(OwnerPlants, '/owners/<int:owner_id>/plants')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
