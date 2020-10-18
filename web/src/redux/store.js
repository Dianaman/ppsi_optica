import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './ducks';
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

