from database.database import connectDB, get_collection
from bson import ObjectId


class SeriesDatabase:
    def __init__(self):
        self.db = connectDB('Netflix')
        self.collection = get_collection(self.db, 'TV-Series')

    def get_all_series(self):
        all_seriess = list(self.collection.find().limit(15))
        return all_seriess

    def search_series(self, search_str):
        print(search_str)
        query = {"series_name": {"$regex": f"{search_str}", "$options": "i"}}
        docs = self.collection.find(query)
        return docs

    def add_series(self, data):
        result = self.collection.insert_one(data)
        return result.inserted_id

    def update_series(self, id, data):
        query = {'_id': ObjectId(id)}
        new_values = {'$set': {data}}
        result = self.collection.update_one(query, new_values)
        return result.modified_count

    def remove_series(self, id):
        query = {'_id': ObjectId(id)}
        result = self.collection.delete_one(query)
        return result.deleted_count
    
    def get_series(self, id):
        query = {'_id': ObjectId(id)}
        result = self.collection.find_one(query)
        return result
    
    def get_all_genre(self):
        result = self.collection.distinct("series_genre")
        result = [genre.title() for genre in result]
        return result
    
    def get_all_genre_series(self, data, limit):
        query = {'series_genre': data}
        seriess = []
        for series in self.collection.find(query).limit(limit):
            series['_id'] = str(series['_id'])
            seriess.append(series)
        return seriess
        