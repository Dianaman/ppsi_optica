import { showError, showLoading } from './common.duck';

// State
const initialState = {
    previous: '',
    next: '',
    results: [],
    error: null,
    isLoading: true,
    producto: null
};

// Types
export const GET_CATALOGUE = 'catalogo/GET';
export const FETCHED_CATALOGUE = 'catalogo/GET_DONE';
export const SEE_PRODUCT = 'catalogo/SEE_PRODUCT';

// Reducer
export function catalogoReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CATALOGUE:
            
            const { url, limit, offset, response } = action.payload;
            const { 
                next,
                previous,
                results
            } = response;


            return {
                ...state,
                isLoading: false,
                next,
                previous,
                results,
            };
        case SEE_PRODUCT:
            const {producto} = action.payload;

            return {
                ...state,
                producto
            }
        default:
            return state;
    }
}


// Actions
export function fetchList(url) {
    return (dispatch, getState) => {
        return dispatch(fetchListInner(url))
    }
}

export function fetchListInner(url) {
    return dispatch => {
        dispatch(showLoading());
        return fetch(url)
          .then(response => response.json())
          .then(json => dispatch(fetched(json)))
          .catch(error => dispatch(showError(error)))
      }
}

export function fetched(response){
    return {
        type: FETCHED_CATALOGUE,
        payload: {
            response
        }        
    }
};

export function verProducto(producto){
    return {
        type: SEE_PRODUCT,
        payload: {
            producto
        }
    }
};
