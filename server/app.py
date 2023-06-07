#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, crossdomain
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, Length
from flask_wtf.csrf import CSRFProtect


# Local imports
from config import app, db, api
from models import Owner, Plant

csrf=CSRFProtect(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-CSRF-Token')
    if 'Set-Cookie' in response.headers:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

class OwnerForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    username = StringField('Username', validators=[DataRequired()])
    password = StringField('Password', validators=[DataRequired(), Length(min=6)])
    bankroll = IntegerField('Bankroll', validators=[DataRequired()])
    submit = SubmitField('Create Owner')
    

class OwnerList(Resource):
    def get(self):
        owners = Owner.query.all()
        owner_data = [owner.to_dict() for owner in owners]
        return make_response(jsonify(owner_data), 200)
    def post(self):
        form = OwnerForm(request.form)
        if form.validate():
            new_owner = Owner(
                first_name=form.first_name.data,
                last_name=form.last_name.data,
                email=form.email.data,
                username=form.username.data,
                password=form.password.data,
                bankroll=1000)
            db.session.add(new_owner)
            db.session.commit()
            owner_dict = new_owner.to_dict()
            return owner_dict, 201
        else:
            errors = form.errors
            return {'errors': errors}, 400


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
        
class PlantCatalog(Resource):
    def get(self):
        plants = Plant.query.all()
        plant_data = [plant.to_dict() for plant in plants]
        return make_response(jsonify(plant_data), 200)


api.add_resource(OwnerList, '/owners')
api.add_resource(OwnerByID, '/owners/<int:owner_id>')
api.add_resource(OwnerPlants, '/owners/<int:owner_id>/plants')
api.add_resource(PlantCatalog, '/plants')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
