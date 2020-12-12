import React, { useEffect } from 'react';
import { CarritoIcono } from './components/organisms';
import './App.css';
import {  Procesocompra, Envio, Pago, Confirmarcompra, Compra } from './pages/Procesocompra';
import { 
  HomeComprador, Probador, Categoria, Login, Registrar, Store, Carrito,
  AdmVentas, AdmProductos, AdmUsuarios, MisPedidos
} from './pages';

import { Navbar, Nav } from 'react-bootstrap';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Spinner, Error, Success } from './components/atoms';
import { setActualUser } from './redux/ducks/users.duck';
import { setCart } from './redux/ducks/carrito.duck';

function App() {
  const dispatch = useDispatch();
  const app = useSelector(state => state);
  const loggedInUser = app.usuariosReducer.usuarioActual;

  useEffect(() => {
      const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null;
      if (storedUser) {
        dispatch(setActualUser(storedUser));
      }

      const carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')): null;
      if (carrito) {
        dispatch(setCart(carrito));
      }
  }, []);

  /* TODO: 
  -Hacer diferentes navs por rol
  -Agregarle menú hamburguesa
  */

  function renderRoutes() {
    if (loggedInUser) {
      switch(loggedInUser.tipo) {
        case 'superadmin':
        case 'admin':
          return (
            <>
              <Nav.Link as={NavLink} to="/ventas">Ventas</Nav.Link>
              <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/usuarios">Usuarios</Nav.Link>
            </>
          );
        case 'vendedor':
          return (
            <>
              <Nav.Link as={NavLink} to="/ventas">Ventas</Nav.Link>
              <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            </>
          );
        case 'cliente':
        default:
          return (
            <>
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              {false && <Nav.Link as={NavLink} to="/probador">Probador</Nav.Link>}
              <Nav.Link as={NavLink} to="/mis-pedidos">Mis Pedidos</Nav.Link>
            </>
          );
      }
    } else {
      return (
        <>
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          {false && <Nav.Link as={NavLink} to="/probador">Probador</Nav.Link>}
        </>
      );
    }
  }

  return (
    <div>
      <Spinner />
      <Error />
      <Success />
      
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Focus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {
              renderRoutes()
            }
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/carrito"><CarritoIcono /></Nav.Link>
            {!loggedInUser && <Nav.Link as={NavLink} to="/registrar">Registro</Nav.Link>}
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
        <Route path="/Procesocompra">
          <Procesocompra/>
        </Route>
        <Route path="/Compra">
          <Compra/>
        </Route>
        <Route path="/mis-pedidos">
          <MisPedidos/>
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
