#!/usr/bin/env python3

# Standard library imports
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from models import Plant
from config import app, db
from faker import Faker
import random

api = Api(app)
# Local imports
from app import app
from models import db

def create_plants():
    Plant.query.delete()
    plants = []
    for _ in range(50):
        name = "Plant " + str(random.randint(1, 100))
        plant = Plant(
            name=name,
            image='/images/smallerjadeplant.jpg',
            price=random.uniform(10.0, 50.0),
            size=random.choice(['small', 'medium', 'large']),
            light_req=random.choice(['low', 'medium', 'high']),
            water_req=random.randint(1, 5),
            fertilizer_req=random.randint(1, 5),
            pests=False
        )
        plants.append(plant)

    return plants


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        plants = create_plants()
        db.session.add_all(plants)
        db.session.commit()




# if __name__ == '__main__':
#     fake = Faker()
#     with app.app_context():
#         print("Starting seed...")
#         # Seed code goes here!
# import csv

# # Specify the number of user records you want to generate
# num_users = 100

# # Open the seed file in write mode
# with open('seed_file.csv', 'w', newline='') as csvfile:
#     writer = csv.writer(csvfile)

#     # Write the header row
# writer.writerow(['username', 'password', 'first_name', 'last_name', 'email','commit_message'])

# # Generate user data and write to the seed file
# for _ in range(num_users):
#     username = fake.user_name()
#     password = fake.password()
#     first_name = fake.first_name()
#     last_name = fake.last_name()
#     email = fake.email()

#     writer.writerow([username, password, first_name, last_name, email, 'Initial commit'])
    
