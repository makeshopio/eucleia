import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import Helmet from 'react-helmet';
// import styles from '../styles/app.scss';

class App extends Component {

  render() {
    return (
      <div>
        <Helmet
          title='MyApp'
          titleTemplate='MyApp - %s'
          meta={[
            {'char-set': 'utf-8'},
            {'name': 'description', 'content': 'My super dooper dope app'}
          ]}
        />
        <nav>
          <ul>
            <li><Link to='/'>Users</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;
