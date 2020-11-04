import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { catalogoReducer } from './catalogo.duck';
import { commonReducer } from './common.duck';
import { admProductoReducer } from './adm-producto.duck';

export default combineReducers({
    carritoReducer, catalogoReducer, commonReducer, admProductoReducer
});