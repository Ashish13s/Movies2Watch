import pymongo
from credentials import *

def connectDB(database_name): 
    uri = f"mongodb+srv://{USERNAME}:{PASSWORD}@{CLUSTER}/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)
    database = client[database_name]
    return database

def get_collection(db, collection_name):
    return db[collection_name]

    
