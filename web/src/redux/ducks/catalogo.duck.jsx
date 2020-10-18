import { showError, showLoading } from './common.duck';

// State
const initialState = {
    previous: '',
    next: '',
    results: [],
    error: null,
    isLoading: true,
    url: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=15',
    limit: 15,
    offset: 0,
    id: null,
    detalle: null,
    habilidades: []
};

// Types
export const GET_CATALOGUE = 'catalogo/GET';
export const FETCHED_CATALOGUE = 'catalogo/GET_DONE';

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
                url,
                limit,
                offset
            };
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
