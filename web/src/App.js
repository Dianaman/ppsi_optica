import React from 'react';
import logo from './logo.svg';
import './App.css';

import { HomeComprador, Probador, Categoria } from './pages';
import { Navbar, Nav } from 'react-bootstrap';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Focus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/probador">Probador</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        
      <Switch>
        <Route exact path="/">
          <HomeComprador />
        </Route>
        <Route path="/probador">
          <Probador />
        </Route>
        <Route path="/categoria/:id">
          <Categoria />
        </Route>
        <Route>
          <Redirect to={{pathname: '/'}} />
        </Route>
      </Switch>

    </div>
  );    

}

export default App;
