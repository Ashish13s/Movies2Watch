def get_route_details():
    routes = {
        'admin/': "Django Admin Panel",
        '/': "View Information of All the routes",
        'getAllMovies/': "To get Top 15 movies from Movies database",
        'getAllFeaturedMovies/': "To get top 5 Featured Movies from database",
        'searchMovie/': "To search the movie (body: {'search_str': 'example'})",
        'movie/<id>': "To get details of a movie using ID",
        'getAllGenre/': "To get list of all the Genres from movie database",
        'getAllGenreMovies/': "To get movies of a particular Genre in database (body: {'genre': 'example', 'limit':10})",
        'getAllSeries/': "To get Top 15 series from Series Database",
        'searchSeries/': "To search the series (body: {'search_str': 'example'})",
        'series/<id>/': "To get details of a series using ID",
        'getAllGenreSeries/': "To get series of a particular genre (body: {'genre':'example', limit:10})",
        'getAllGenreOfSeries/': "To get list of all the genres from series database",
        'addMovie/': "(Restricted) To add a movie to Movie Database",
        'updateMovie/': "(Restricted) To update a movie in Movie Database",
        'deleteMovie/': "(Restricted) To delete a movie from Movie Database",
    }
    return routes
