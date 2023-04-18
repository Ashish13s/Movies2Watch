"""movies URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from movies.views import (
    getAllMovies,
    getMoviesBySearch,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie,
    getAllGenre,
    getAllGenreMovies,
    getAllFeaturedMovies,
    getAllSeries,
    getSeriesBySearch,
    getSeries,
    getAllGenreSeries,
    getAllGenreOfSeries,
    getRouteDetails,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', getRouteDetails, name='getRouteDetails'),
    path('getAllMovies/', getAllMovies, name='getAllMovies'),
    path('getAllFeaturedMovies/', getAllFeaturedMovies, name='getAllFeaturedMovies'),
    path('searchMovie/', getMoviesBySearch, name='getMovieBySearch'),
    path('movie/<str:id>/', getMovie, name='getMovie'),
    path('addMovie/', addMovie, name='addMovie'),
    path('getAllGenre/', getAllGenre, name='getAllGenre'),
    path('getAllGenreMovies/', getAllGenreMovies, name='getAllGenreMovies'),
    path('updateMovie/', updateMovie, name='updateMovie'),
    path('deleteMovie/', deleteMovie, name='deleteMovie'),
    path('getAllSeries/', getAllSeries, name='getAllSeries'),
    path('searchSeries/', getSeriesBySearch, name='getSeriesBySearch'),
    path('series/<str:id>', getSeries, name='getSeries'),
    path('getAllGenreSeries/', getAllGenreSeries, name='getAllGenreSeries'),
    path('getAllGenreOfSeries/', getAllGenreOfSeries, name='getAllGenreOfSeries'),
]
