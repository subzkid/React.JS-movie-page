import 'whatwg-fetch'; //for polyfill
 
 //TMDB constants
 const apiKey = "d37398a8fa01ed9f121f9074b614e320";
 const baseApiUrl = "https://api.themoviedb.org/3";
 const baseImageUrl = "https://image.tmdb.org/t/p/w92"; //small posters
 
 //module with functions to download a model from online
 export default {
   searchTMDB: function(query) {
     var resource = '/search/movie'
     var tmdbUri = baseApiUrl+resource+'?api_key='+apiKey+'&query='+query;
     return fetch(tmdbUri)
       .then(function(res) { return res.json()})
   },

   genreList: function(){
     var resource = '/genre/movie/list';
      var tmdbUri = baseApiUrl+resource+'?api_key='+apiKey+'&language=en-US';
      return fetch(tmdbUri)
          .then(function(res) { return res.json()})
   },

   genreMovies: function(genre_id){
    var resource = '/genre/'+genre_id+'/movies';
    var url = baseApiUrl+resource+'?api_key='+apiKey+'&language=en-US&include_adult=undefined&sort_by=created_at.asc';
    return fetch(url)
      .then(function(res) { return res.json()})
  },

  movieDetail: function(movie_id){
    var resource = '/movie/'+movie_id;
    var url = baseApiUrl+resource+'?api_key='+apiKey+'&language=en-US';
    return fetch(url)
      .then(function(res) { return res.json()})
  },
  
  popularMovie: function(){
    var resource = '/movie/popular';
    var tmdbUri = baseApiUrl+resource+'?api_key='+apiKey+'&language=en-US';
    return fetch(tmdbUri)
        .then(function(res) { return res.json()})
  },

  Recommandation: function(movie_id){
    var resource = '/movie/'+movie_id+'/recommendations';
    var tmdbUri = baseApiUrl+resource+'?api_key='+apiKey+'&language=en-US';
    return fetch(tmdbUri)
        .then(function(res) { return res.json()})
  },


   getPosterUrl: function(movie){
     if(movie.poster_path) {
       return baseImageUrl + movie.poster_path;
     }
     else {
       return ''; //don't load bad image'
     }
   }
 }