import React from 'react';
import {Form, FormControl, InputGroup, Button, Glyphicon} from 'react-bootstrap';
import DataController from './DataController';
 
 class App extends React.Component {
   //constructor for the whole layout
   constructor(props){
     super(props);
      this.state = {movies:[], totalResults:0};
      //refers to new objects in constructors
      this.fetchData = this.fetchData.bind(this);
      this.fetchGenreList = this.fetchGenreList.bind(this);
      this.fetchGenreMovies = this.fetchGenreMovies.bind(this);
      this.fetchMovieDetail = this.fetchMovieDetail.bind(this);
      this.fetchPopularMovie = this.fetchPopularMovie.bind(this);
      console.log(this.fetchGenreList());
      console.log(this.fetchPopularMovie());
   }

   //download the data
   fetchData(searchTerm) {
     //save this for later
    var thisComponent = this; 
    DataController.searchTMDB(searchTerm)
      .then(function(data) {
        //use saved this
        thisComponent.setState({movies:data.results, totalResults:data.total_results});
      })
      // .then((data) => this.setState({movies:data})); 
      .catch( (err) => this.setState({movies:[], totalResults:0}));
  }

  //get genre list data
   fetchGenreList() {
     var thisComponent = this;
     DataController.genreList()
       .then(function(data) {
          //console.log(data);
         thisComponent.setState({genres:data.genres});
       })
        .catch( (err) => console.log(err));
   }

   //get movies data according to genres
   fetchGenreMovies(genre_id){
     var thisComponent = this;
     DataController.genreMovies(genre_id)
      .then(function(data){
        thisComponent.setState({movies:data.results, totalResults:data.total_results});
      })
   }

   //get the movie detail data
    fetchMovieDetail(movie_id){
      var thisComponent = this;
      DataController.movieDetail(movie_id)
        .then(function(data){
          thisComponent.setState({movies:data.results, totalResults:data.total_results});
      })
    }

    //get the most popular movies data
    fetchPopularMovie(){
      var thisComponent = this;
      DataController.popularMovie()
        .then(function(data) {
         thisComponent.setState({movies:data.results, totalResults:data.total_results});
       })
    }

   render(){
     return(
       //basic page layout
       <div>
        <header>
            <h1>Movie Data Browser</h1>
          </header>
          <SearchForm searchFunction={this.fetchData} resultCount={this.state.totalResults} />
          <main>
            <div>
              <Navigation genres={this.state.genres} links={this.fetchGenreMovies} />
              <MovieTable movies={this.state.movies} />
            </div>
          </main>
       </div>
     );
   }
 }

 //make the navigation bar for the genres of movies
 class Navigation extends React.Component{
  render(){
    //defind links
    var links = this.props.links;
    if(this.props.genres){
      var items = this.props.genres.map(function(genre){
        return <MovieCategory key={genre.id} genre={genre} links={links} />
      })
    }
    return(
      <nav>
          <ul className="list-unstyled" aria-label="nav items" aria-live="polite">
            {items}
          </ul>            
      </nav>
    );
  }
}

class MovieCategory extends React.Component{
  constructor(props){
    super(props);
    //save the this click info 
    this.click=this.click.bind(this);
  }
  click(){
    var thisComponent = this;
    this.props.links(thisComponent.props.genre.id);
  }
    render(){
      //after click it refres to the click component
      return <li key={this.props.genre.id}><a href="#" onClick={this.click}>{this.props.genre.name}</a></li>
    }
}

//class to define a table for putting into movies
 class MovieTable extends React.Component {
   render() {
     var movieRows = this.props.movies.map(function(movie){
       return <MovieRow movie={movie} key={movie.id} />;
     })
     return (
       <table className="table table-striped" id="table">
         <thead>
           <tr>
           <th className="col-xs-2">Poster</th>
           <th className="col-xs-2">Title</th>
           <th className="col-xs-2">Released</th>
           <th>Detail</th>
           </tr>
         </thead>
         <tbody className="demo-card-wide mdl-card mdl-shadow--2dp">
           {movieRows}
        </tbody>
       </table>      
     );
   }
 }
 
 //class to define the rows in the movie table
 class MovieRow extends React.Component {
   render() {
     return (
       <tr id="tr">
         <td><img className="img-thumbnail" src={DataController.getPosterUrl(this.props.movie)} alt="poster for {this.props.movie.title}"/></td>
         <td>{this.props.movie.title}</td>
         <td>{this.props.movie.release_date}</td>
         <td>{this.props.movie.overview}</td>
       </tr>
     );
   }
 }
 
 //search methos to search movie by the input
 class SearchForm extends React.Component {
   constructor(props){
     super(props);
     this.state = {value:''}
   }
   handleChange(event){
     this.setState({value:event.target.value});
   }
   handleClick(event) {
     this.props.searchFunction(this.state.value);
   }
   render() {
     return (
       <Form inline>
         <InputGroup>
           <InputGroup.Button>
             <Button onClick={this.handleClick.bind(this)} className="btn btn-danger" aria-label="Close"><Glyphicon glyph="search"/></Button>
           </InputGroup.Button>
           <FormControl type="text" placeholder="Search for a movie..." onChange={this.handleChange.bind(this)} className="form-control"/>
           <InputGroup.Addon>
             {this.props.resultCount} results
           </InputGroup.Addon>
         </InputGroup>
       </Form>
     );
   }
 }
 
 export default App;