import React from 'react';
import Route from 'react-router/lib/Route';
import App from './containers/App';
import Home from './containers/Home';
import Users from './containers/Users';
import User from './containers/Users/User';
import NoMatch from './containers/NoMatch';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='users' component={Users} />
    <Route path='user/:id' component={User} />
    <Route path="*" component={NoMatch} />
  </Route>
);
