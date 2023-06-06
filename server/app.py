#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy

# Local imports
from config import app, db, api
from models import Owner


# Views go here!

if __name__ == '__main__':
    app.run(port=5555, debug=True)
