import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { commonReducer } from './common.duck';
import { admProductoReducer } from './adm-producto.duck';
import { categoriaReducer } from './categoria.duck';
import  usersReducer from './users.duck';
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

export default combineReducers({
    carritoReducer,
    commonReducer,
    admProductoReducer,
    categoriaReducer,
    usersReducer,
    ...createForms({
        producto: initialProductState,
        prod: initialProdState
    }, 'form')
});
