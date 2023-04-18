from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_403_FORBIDDEN,
    HTTP_400_BAD_REQUEST,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
)
from database.movies_db import MovieDatabase
from database.series_db import SeriesDatabase
from database.utils import *
# Movies

@api_view(['GET'])
def getAllMovies(request):
    try:
        all_movies = MovieDatabase().get_all_movies()
        for movie in all_movies:
            # print(movie)
            movie['_id'] = str(movie['_id'])
        all_movies = all_movies[:5]
    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    return Response([movie for movie in all_movies])

@api_view(['POST'])
def getMoviesBySearch(request):
    try:
        movies = []
        if request.data:
            search_str = request.data.get('search_str')
            docs = MovieDatabase().search_movie(search_str) 
            for movie in docs:
                movie['_id'] = str(movie['_id'])
                movies.append(movie)

    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(movies)

@api_view(['GET'])
def getMovie(request, id:str):
    try:
        response = MovieDatabase().get_movie(id)
        if response is not None:
            response['_id'] = str(response['_id'])
            return Response(status=HTTP_200_OK, data=response)
        else:
            return Response(status=HTTP_400_BAD_REQUEST, data='No record found with this id')
    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def deleteMovie(request):
    if request.user.is_superuser:
        id = request.data.get('_id')
        try:
            if id != None:
                response = MovieDatabase().remove_movie(id)
                if response == 0:
                    return Response(status=HTTP_204_NO_CONTENT, data='No Movie found with this id')
                else:
                    return Response(status=HTTP_200_OK)
            else:
                return Response(status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(str(e))
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=HTTP_403_FORBIDDEN)



@api_view(['PUT'])
def updateMovie(request):
    if request.user.is_superuser:
        id = request.data.get('_id')
        data = request.data.get('data')
        try:
            if id == None or data == None:
                return Response(status=HTTP_400_BAD_REQUEST)
            else:
                response = MovieDatabase().update_movie(id, data)
                if response == 0:
                    return Response(status=HTTP_204_NO_CONTENT, data='No Movie found with this id')
                else:
                    return Response(status=HTTP_200_OK, data='Record Updated Successfully')
        except Exception as e:
            print(str(e))
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)

    else:
        return Response(status=HTTP_403_FORBIDDEN)

@api_view(['POST'])
def addMovie(request):
    if request.user.is_superuser:
        data = request.data.get('data')
        try:
            if data == None:
                return Response(status=HTTP_400_BAD_REQUEST)
            else:
                response = MovieDatabase.add_movie(data)
                if response == None:
                    return Response(status=HTTP_500_INTERNAL_SERVER_ERROR, data='Can not insert record')
                else:
                    return Response(status=HTTP_201_CREATED, data=f'Record added Successfully with Id = {response}')
        except Exception as e:
            print(str(e))
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=HTTP_403_FORBIDDEN)
    
@api_view(['GET'])
def getAllGenre(request):
    try:
        response = MovieDatabase().get_all_genre()
        return Response(status=HTTP_200_OK, data=list(response))
    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def getAllGenreMovies(request):
    data = request.data.get('genre')
    data = data.title()
    limit = request.data.get('limit')
    if not limit:
        limit = 10
    if data:
        try:
            response = MovieDatabase().get_all_genre_movies(data, limit)
            return Response(status=HTTP_200_OK, data=list(response))
        except:
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="No genre found in request")

@api_view(['GET'])
def getAllFeaturedMovies(request):
    try:
        response = MovieDatabase().get_all_featured_movies()
        return Response(status=HTTP_200_OK, data=list(response))
    except:
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    

# Series
    

@api_view(['GET'])
def getAllSeries(request):
    try:
        all_series = SeriesDatabase().get_all_series()
        for serie in all_series:
            # print(serie)
            serie['_id'] = str(serie['_id'])
        all_series = all_series[:5]
    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    return Response([serie for serie in all_series])

@api_view(['POST'])
def getSeriesBySearch(request):
    try:
        series = []
        if request.data:
            search_str = request.data.get('search_str')
            docs = SeriesDatabase().search_series(search_str) 
            for serie in docs:
                serie['_id'] = str(serie['_id'])
                series.append(serie)

    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(series)

@api_view(['GET'])
def getSeries(request, id:str):
    try:
        response = SeriesDatabase().get_series(id)
        if response is not None:
            response['_id'] = str(response['_id'])
            return Response(status=HTTP_200_OK, data=response)
        else:
            return Response(status=HTTP_400_BAD_REQUEST, data='No record found with this id')
    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['GET'])
def getAllGenreOfSeries(request):
    try:
        response = SeriesDatabase().get_all_genre()
        return Response(status=HTTP_200_OK, data=list(response))
    except Exception as e:
        print(str(e))
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['POST'])
def getAllGenreSeries(request):
    data = request.data.get('genre')
    data = data.title()
    limit = request.data.get('limit')
    if not limit:
        limit = 10
    if data:
        try:
            response = SeriesDatabase().get_all_genre_series(data, limit)
            return Response(status=HTTP_200_OK, data=list(response))
        except:
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response(status=HTTP_400_BAD_REQUEST, data="No genre found in request")
    
@api_view(['GET'])
def getRouteDetails(request):
    try:
        response = get_route_details()
        return Response(status=HTTP_200_OK, data=response)
    except:
        return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
