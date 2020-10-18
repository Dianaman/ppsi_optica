import { combineReducers } from 'redux';

import { catalogoReducer } from './catalogo.duck';
import { commonReducer } from './common.duck';

export default combineReducers({catalogoReducer, commonReducer});