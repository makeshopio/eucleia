import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Container } from '../components';

class NoMatch extends Component {

  render() {
    return (
      <Container>
        <Helmet title='Not Found' />
        Page was not found
      </Container>
    )
  }
}

export default NoMatch;
