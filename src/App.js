import React, { Component } from 'react';
//import logo from './logo.svg';
import {Col, Row} from 'react-bootstrap';

import './Styles/scss/app.css';
import MainSearch from './Components/MainSearch';

class App extends Component {
  render() {
    return (
      <div className="container">
      <Row>
      <Col sm={12}  lg={10} lgOffset={1} >
        <MainSearch />
        </Col>
        </Row>
      </div>
    );
  }
}

export default App;
