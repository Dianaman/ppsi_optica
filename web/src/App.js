import React, { useEffect } from 'react';
import { CarritoIcono } from './components/organisms';
import './App.css';
import {  Compra, Envio, Pago, Confirmarcompra } from './pages/Procesocompra';
import { 
  HomeComprador, Probador, Categoria, Login, Registrar, Store, Carrito,
  AdmVentas, AdmProductos, AdmUsuarios
} from './pages';

import { Navbar, Nav } from 'react-bootstrap';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Spinner } from './components/atoms';

function App() {

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/users')
    .then(res => res.json())
    .then(users => {
      //console.log('users', users);
      console.log("loggedInUser: ", loggedInUser);
    })
  });

  /* TODO: 
  -Hacer diferentes navs por rol
  -Agregarle menú hamburguesa
  */
  return (
    <div>
      <Spinner />
      
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Focus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            { loggedInUser != null && (loggedInUser.tipo == "admin" ? <Nav.Link as={NavLink} to="/probador">Probador</Nav.Link> : "")}
            { loggedInUser == null && <Nav.Link as={NavLink} to="/registrar">Registrar</Nav.Link> }
            { loggedInUser != null && (loggedInUser.tipo == "admin" ? <Nav.Link as={NavLink} to="/ventas">Ventas</Nav.Link> : "")}
            { loggedInUser != null && (loggedInUser.tipo == "admin" ? <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link> : "")}
            { loggedInUser != null && (loggedInUser.tipo == "admin" ? <Nav.Link as={NavLink} to="/usuarios">Usuarios</Nav.Link> : "")}
            <Nav.Link as={NavLink} to="/Compra">Compra</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/carrito"><CarritoIcono /></Nav.Link>
            {loggedInUser && <Nav.Link as={NavLink} to="/login">Salir</Nav.Link>}
            {!loggedInUser && <Nav.Link as={NavLink} to="/login">Entrar</Nav.Link>}
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
          <Provider store={ Store }>
            <Registrar />
          </Provider>
        </Route>         
        <Route path="/login">
          <Login />
        </Route>        
        <Route path="/categoria/:id">
          <Categoria />
        </Route>
        <Route path="/ventas">
          <AdmVentas />
        </Route>        
        <Route path="/productos">
          <AdmProductos />
        </Route>        
        <Route path="/usuarios">
          <AdmUsuarios />
        </Route>        
        <Route path="/Compra">
          <Compra/>
        </Route>
        <Route path="/Envio">
          <Envio/>
        </Route>    
        <Route path="/Pago">
          <Pago/>
        </Route>
        <Route path="/Confirmarcompra">
          <Confirmarcompra/>
        </Route>
        <Route>
          <Redirect to={{pathname: '/'}} />
        </Route>
      </Switch>

    </div>
  );    

}

export default App;
