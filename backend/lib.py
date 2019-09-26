
# Imports
from pymongo import MongoClient
from flask import Flask, request, redirect, url_for
import os
import hashlib
import datetime
import csv

# Tokenization
import pyffx
from cryptography.fernet import Fernet
import random

# Parameters
path_upload = 'uploads'
path_download = 'downloads'
path_secrets = 'secrets'
error = 'error'
anonymous_user = 'anonymous'
newline = '\n'
equal = '='
db_config_path = '../../data/db_config'
config = dict()

# Database
def read_db_config():
    config = dict()
    f = open(db_config_path, 'r')
    for line in f:
        line = line.strip()
        if (line != ''):
            name, value = line.split(equal)
            config[name] = value
        else: continue
    return(config)

# Mongo: connection
def init_ontology(config):
    client = MongoClient(config['mongodb_url'] % \
        (config['mongodb_user'], config['mongodb_pass']))
    mongodb_db = client[config['mongodb_db_name']]
    return(mongodb_db)

# Mongo: save dict
def insert_ontology_single(
        data, collection):
    database[collection].insert_one(
        data)

# Mongo: query
def query_ontology(
        collection, match = {}):
    cursor = database[collection].find(
        match, { '_id': False })
    return(cursor)

# Init
config = read_db_config()
database = init_ontology(config)