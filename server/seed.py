#!/usr/bin/env python3

# Standard library imports
from sqlalchemy import
from sqlalchemy.orm import Session
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
import csv

# Specify the number of user records you want to generate
num_users = 100

# Open the seed file in write mode
with open('seed_file.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)

    # Write the header row
writer.writerow(['username', 'password', 'first_name', 'last_name', 'email','commit_message'])

# Generate user data and write to the seed file
for _ in range(num_users):
    username = fake.user_name()
    password = fake.password()
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = fake.email()

    writer.writerow([username, password, first_name, last_name, email, 'Initial commit'])
    
