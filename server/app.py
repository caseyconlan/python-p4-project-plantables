#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, jsonify, request, make_response, abort, session, redirect, url_for
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, PasswordField
from wtforms.validators import DataRequired, Email, Length
from flask_wtf.csrf import CSRFProtect, generate_csrf
from werkzeug.datastructures import MultiDict
from flask_cors import CORS
from sqlalchemy import func


# Local imports
from config import app, db, api
from models import Owner, Plant

csrf = CSRFProtect(app)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization,X-CSRF-Token')
    if 'Set-Cookie' in response.headers:
        response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


class CreateOwnerForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[
                           DataRequired(), Length(min=6)])
    submit = SubmitField('Create Owner')


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = StringField('Password', validators=[
                           DataRequired()])
    submit = SubmitField('Login')

class LoginResource(Resource):
    def post(self):
        if request.headers.get('Content-Type') == 'application/json':
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
        else:
            username = request.form.get('username')
            password = request.form.get('password')

        owner = Owner.query.filter(func.lower(Owner.username) == func.lower(username)).first()
        if owner and owner.check_password(password):
            # Password is correct, proceed with authentication and session handling
            session['user_id'] = owner.id
            # ...

            return {'message': 'Login successful'}
        else:
            # Invalid credentials
            return {'message': 'Invalid username or password'}

api.add_resource(LoginResource, '/login')

class OwnerList(Resource):
    def get(self):
        owners = Owner.query.all()
        owner_data = [owner.to_dict() for owner in owners]
        return make_response(jsonify(owner_data), 200)

    def post(self):
        json_data = request.get_json()
        form_data = request.form

        if json_data:
            form = CreateOwnerForm(MultiDict(json_data))
        else:
            form = CreateOwnerForm(form_data)

        if form.validate():
            new_owner = Owner(
                first_name=form.first_name.data,
                last_name=form.last_name.data,
                email=form.email.data,
                username=form.username.data,
                # password=form.password.data,
                bankroll=1000)
            new_owner.set_password(form.password.data)
            try:
                db.session.add(new_owner)
                db.session.commit()
                owner_dict = new_owner.to_dict()
                return owner_dict, 201
            except Exception as e:
                print(e)
                return abort(500, {"error": "Internal Server Error"})
        else:
            errors = form.errors
            print(errors)  # Print form validation errors for debugging
            return {'errors': errors}, 422


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
            # Convert plants to dictionaries
            plant_data = [plant.to_dict() for plant in plants]
            return make_response(jsonify(plant_data), 200)
        else:

            return make_response(jsonify({'message': 'Owner not found'}), 404)


class PlantCatalog(Resource):
    def get(self):
        plants = Plant.query.all()
        plant_data = [plant.to_dict() for plant in plants]
        return make_response(jsonify(plant_data), 200)


class CSRFToken(Resource):
    def get(self):
        csrf_token = generate_csrf()
        response = make_response(jsonify({'csrf_token': csrf_token}), 200)
        response.headers['X-CSRF-Token'] = csrf_token
        return response

class ForgotPasswordResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')  # Changed 'email' to 'username'

        owner = Owner.query.filter_by(username=username).first()  # Changed filter_by(email=...) to filter_by(username=...)
        if owner:
            # Ideally, you'd want to send an email with a reset password link 
            # This is just a placeholder action
            return {'message': 'Password reset link has been sent to your email'}
        else:
            return {'message': 'Email not found'}, 404

class UpdatePasswordResource(Resource):
    def patch(self):
        data = request.get_json()
        username = data.get('username')
        new_password = data.get('new_password')

        owner = Owner.query.filter_by(username=username).first()
        if owner:
            owner.set_password(new_password)
            db.session.add(owner)
            db.session.commit()
            return {'message': 'Password updated successfully'}
        else:
            return {'message': 'Username not found'}, 404


class DeleteAccountResource(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        owner = Owner.query.filter_by(username=username).first()
        if owner and owner.check_password(password):
            db.session.delete(owner)
            db.session.commit()
            return '', 204  # Return 204 No Content without a response body
        else:
            return {'message': 'Invalid username or password'}, 404

api.add_resource(CSRFToken, '/csrf-token')
api.add_resource(OwnerList, '/owners')
api.add_resource(OwnerByID, '/owners/<int:owner_id>')
api.add_resource(OwnerPlants, '/owners/<int:owner_id>/plants')
api.add_resource(PlantCatalog, '/plants')
api.add_resource(DeleteAccountResource, '/delete-account')
api.add_resource(ForgotPasswordResource, '/forgot-password')
api.add_resource(UpdatePasswordResource, '/update-password')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
