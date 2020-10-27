import React, { useEffect } from 'react';
import { CarritoIcono } from './components/organisms';
import './App.css';

import { HomeComprador, Probador, Categoria, Login, Registrar, Carrito } from './pages';
import { Navbar, Nav } from 'react-bootstrap';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

function App() {
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/users')
    .then(res => res.json())
    .then(users => {
      console.log('users', users);
    })
  });

  /* TODO: 
  -Hacer diferentes navs por rol
  -Agregarle menú hamburguesa
  */
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Focus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/probador">Probador</Nav.Link>
            <Nav.Link as={NavLink} to="/registrar">Registrar</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/carrito"><CarritoIcono /></Nav.Link>
            <Nav.Link as={NavLink} to="/">Salir</Nav.Link>
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
        <Route path="/carrito">
          <Carrito />
        </Route>
        <Route path="/registrar">
          <Registrar />
        </Route>         
        <Route path="/login">
          <Login />
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
