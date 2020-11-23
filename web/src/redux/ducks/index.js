import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { catalogoReducer } from './catalogo.duck';
import { commonReducer } from './common.duck';
import { admProductoReducer } from './adm-producto.duck';
import  usersReducer from './users.duck';
import { createForms } from 'react-redux-form';

const initialProductState = {
    articulo: '',
    descripcion: '',
    marca: '',
    modelo: '',
    imagen: ''
};

const initialProdState = {
    precio: 0
}

export default combineReducers({
    carritoReducer, catalogoReducer, commonReducer, admProductoReducer, usersReducer,
    ...createForms({
        producto: initialProductState,
        prod: initialProdState
    }, 'form')
});
