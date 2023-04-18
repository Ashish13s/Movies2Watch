from database.database import connectDB, get_collection
from bson import ObjectId


class MovieDatabase:
    def __init__(self):
        self.db = connectDB('Netflix')
        self.collection = get_collection(self.db, 'Movies')

    def get_all_movies(self):
        all_movies = list(self.collection.find().limit(15))
        return all_movies

    def search_movie(self, search_str):
        print(search_str)
        query = {"movie_name": {"$regex": f"{search_str}", "$options": "i"}}
        docs = self.collection.find(query).limit(100)
        return docs

    def add_movie(self, data):
        result = self.collection.insert_one(data)
        return result.inserted_id

    def update_movie(self, id, data):
        query = {'_id': ObjectId(id)}
        new_values = {'$set': {data}}
        result = self.collection.update_one(query, new_values)
        return result.modified_count

    def remove_movie(self, id):
        query = {'_id': ObjectId(id)}
        result = self.collection.delete_one(query)
        return result.deleted_count
    
    def get_movie(self, id):
        query = {'_id': ObjectId(id)}
        result = self.collection.find_one(query)
        return result
    
    def get_all_genre(self):
        result = self.collection.distinct("movie_genre")
        result = [genre.title() for genre in result]
        return result
    
    def get_all_genre_movies(self, data, limit):
        query = {'movie_genre': data}
        movies = []
        for movie in self.collection.find(query).limit(limit):
            movie['_id'] = str(movie['_id'])
            movies.append(movie)
        return movies
    
    def get_all_featured_movies(self):
        movies = []
        for movie in self.collection.aggregate([{'$sample': {'size': 5 }}]):
            movie['_id'] = str(movie['_id'])
            if not movie['movie_background_image']:
                movie['movie_background_image'] = movie['movie_poster']
            movies.append(movie)
        return movies
        