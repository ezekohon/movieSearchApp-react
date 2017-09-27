import React from 'react';
import '../Styles/scss/moviecard.css';
import {Col, Row, Image} from 'react-bootstrap';
const numeral = require('numeral');

class MovieCard extends React.Component {

  componentDidUpdate() {
    const data = this.props.data;
    const backdrop = 'https://image.tmdb.org/t/p/original' + data.backdrop;
    document.body.style.backgroundImage = 'url(' + backdrop + ')';
    
  }

  render(){
    const data = this.props.data;
    const poster = 'https://image.tmdb.org/t/p/w500' + data.poster;
    let boxoffice = numeral(data.revenue).format('($0,0)');

    

    return(
      <Col xs={12} className="cardContainer container">

        <Col xs={12} md={8} lg={7} mdPush={4} lgPush={5} className="dataContainer">
          <h1 className="upperCase title">{data.original_title}</h1>
          <h4 className="upperCase tagline">{data.tagline}</h4>
          <p className="overview">{data.overview}</p>

          <Row className="movie-data-container">
            <Col xs={6} >Original Release: <span className="movie-data">{data.release}</span> </Col>
            <Col xs={6} >Running Time: <span className="movie-data">{data.runtime} mins</span></Col>
            <Col xs={6} >Box Office: <span className="movie-data">{boxoffice}</span></Col>
            <Col xs={6} >Vote Average: <span className="movie-data">{data.vote}/10</span> </Col>
          </Row>
          
        </Col>

        <Col xs={12} md={4} lg={5} mdPull={8} lgPull={7} className="posterContainer">
          <Image src={poster} className="poster" />
        </Col>

      </Col>

      )
  }
}

export default MovieCard;