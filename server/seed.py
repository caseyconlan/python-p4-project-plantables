#!/usr/bin/env python3

import os
from decimal import Decimal
from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from models import Plant
from config import app, db
from faker import Faker
import random

api = Api(app)

# Get the absolute path of the public/images folder
base_path = os.path.dirname(os.path.abspath(__file__))
images_path = os.path.join(base_path, '../python-p4-project-plantables/public/images')

# Local imports
from app import app
from models import db




def create_plants():
    Plant.query.delete()
    plants = []

    # Get the list of image files in the public/images folder
    image_files = os.listdir(images_path)

    for image_file in image_files:
        image_path = os.path.join(images_path, image_file)

        # Extract the name of the image file (without extension) to use as the plant name
        name = os.path.splitext(image_file)[0]

        price = Decimal(random.uniform(10.0, 50.0)).quantize(Decimal('0.00')).__str__()

        plant = Plant(
            name=name,
            image=image_path,
            price=price,
            size=random.choice(['small', 'medium', 'large']),
            light_req=random.choice(['low', 'medium', 'high']),
            water_req=random.choice(['low', 'medium', 'high']),
            fertilizer_req=random.choice(['low', 'medium', 'high']),
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
