import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { catalogoReducer } from './catalogo.duck';
import { commonReducer } from './common.duck';
import { admProductoReducer } from './adm-producto.duck';
import  usersReducer from './users.duck';

export default combineReducers({
    carritoReducer, catalogoReducer, commonReducer, admProductoReducer, usersReducer
});
