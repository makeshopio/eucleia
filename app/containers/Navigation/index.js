import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Link, LinkContainer } from '../../components';

export default
class MainMenu extends Component {
  render() {
    return(
      <Navbar inverse collapseOnSelect staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Eucleia</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/users">
              <NavItem eventKey={1} href="#">Users</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem eventKey={1} href="#">Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/register">
              <NavItem eventKey={2} href="#">Register</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ) 
  }
}