import { combineReducers } from 'redux';

import { carritoReducer } from './carrito.duck';
import { catalogoReducer } from './catalogo.duck';
import { commonReducer } from './common.duck';

export default combineReducers({carritoReducer, catalogoReducer, commonReducer});