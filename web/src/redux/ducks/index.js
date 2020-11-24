import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { commonReducer } from './common.duck';
import { admProductoReducer } from './adm-producto.duck';
import { categoriaReducer } from './categoria.duck';
import { usuariosReducer } from './users.duck';
import { createForms } from 'react-redux-form';

const initialProductState = {
    articulo: '',
    idCategoria: 1,
    descripcion: '',
    marca: '',
    modelo: '',
    imagen: '',
    stock: 0,
    puntoDeReposicion: 20,
    stockMaximo: 30,
    precio: 0
};

const initialProdState = {
    precio: 0
}

const initialUser = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    tipo: 'cliente'
  };

export default combineReducers({
    carritoReducer,
    commonReducer,
    admProductoReducer,
    categoriaReducer,
    usuariosReducer,
    ...createForms({
        producto: initialProductState,
        prod: initialProdState,
        user: initialUser
    }, 'form')
});
