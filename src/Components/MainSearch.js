import React from 'react';
import Autosuggest from 'react-autosuggest';
import MovieCard from './MovieCard';
import '../Styles/scss/mainsearch.css';
import {Col, Row} from 'react-bootstrap';
//const icon = 'https://image.flaticon.com/icons/svg/149/149090.svg';

//const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=aadd4dbd32fd04685cd6cc4f51123a4d`;

class MainSearch extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      movieID: 76341 //Default movie
    };

    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.fetchMovieID = this.fetchMovieID.bind(this);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  fetchMovieID = (movieID) => {
    const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=aadd4dbd32fd04685cd6cc4f51123a4d`;
    this.fetchApi(url);
  }

  fetchApi = (url) => {
    fetch(url).then((res) => res.json()).then((data) => {
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path
      })
    })
  }

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=cfe422613b250f702980a3bbf9e90716`
    this.fetchApi(url);
  }

  getSuggestions = (value) => {

  }

  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  renderSuggestion = (suggestion) => {
    return (
      <span>{suggestion.title}</span>
    )
  }

  onSuggestionSelected = (event, { suggestion }) => {
    console.log('Movie selected:', suggestion);

    //aca llamar a fetchApi con la url con la suggestion.id
    this.fetchMovieID(suggestion.id);
    this.setState({
      value: ''
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }


  // Autosuggest will call this function every time you need to update suggestions.
  // aca se hace la llamada para el fetch de la api
  onSuggestionsFetchRequested = ({ value }) => { //FETCH OR UPDATE????
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${inputValue}&api_key=cfe422613b250f702980a3bbf9e90716&page=1&include_adult=false`


    if (inputLength > 0) {

      fetch(url).then((res) => {
        return res.json();
      }).then((json) => {
        const results = json.results.map((movie) => {
          return {
            title: movie.original_title,
            id: movie.id
          }
        }).slice(0, 5);
        console.log(results);

        if (this.state.value === value) {
          this.setState({
            suggestions: results
          });
        } else {
          this.setState({
            suggestions: []
          })
        }
      });
    }
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search for a movie',
      value,
      onChange: this.onChange
    };

    return (
      <div className="">
        <Col sm={12} className="searchContainer">
        <Row>
        
        
            <Col sm={12} md={6} mdOffset={4} lg={6} lgOffset={5}>

                <Autosuggest 
                suggestions={suggestions}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                inputProps={inputProps}
                />
              </Col>
            </Row>
          </Col>


          <div className="cardContainer">
            <MovieCard data={this.state} />
         </div>
       </div>
      
    );
  }
  

}

export default MainSearch;