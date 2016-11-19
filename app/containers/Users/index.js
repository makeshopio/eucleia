import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import * as UsersActions from '../../redux/modules/users';
import UserList from '../../components/UserList';
import { Container } from '../../components';

class Users extends Component {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(UsersActions.fetchUsersIfNeeded())
    ]);
  }

  componentDidMount() {
    Users.readyOnActions(this.props.dispatch);
  }

  renderUsers() {
    const users = this.props.users;

    if (users.status === UsersActions.USERS_INVALID ||
      users.status === UsersActions.USERS_FETCHING) {
      return <p>Loading...</p>;
    }

    if (users.status === UsersActions.USERS_FETCH_FAILED) {
      return <p>Failed to fetch users</p>;
    }

    return <UserList users={users.list} />;
  }

  render() {
    return (
      <Container>
        <Helmet title='Users' />
        <h5>Users:</h5>
        {this.renderUsers()}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps)(Users);
