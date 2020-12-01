import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { commonReducer } from './common.duck';
import { admProductoReducer } from './adm-producto.duck';
import { categoriaReducer } from './categoria.duck';
import { usuariosReducer } from './users.duck';
import { filesReducer } from './files.duck';
import { ventaReducer } from './venta.duck';
import { misPedidosReducer } from './my-orders.duck';

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

const initialItemCarrito = {
    cantidad: 1,
    receta: null,
    extras: []
}

export default combineReducers({
    carritoReducer,
    commonReducer,
    admProductoReducer,
    categoriaReducer,
    usuariosReducer,
    filesReducer,
    ventaReducer,
    misPedidosReducer,
    ...createForms({
        producto: initialProductState,
        prod: initialProdState,
        user: initialUser,
        item: initialItemCarrito
    }, 'form')
});
