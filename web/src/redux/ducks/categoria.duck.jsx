import { fetchApi } from './common.duck';

// State
const initial_state = {
    categorias: [],
    productosEnCategoria: [],
    productoMostrado: null
}

// Types
export const GET_CATEGORIES = 'categoria/GET_CATEGORIES';
export const GET_PRODUCTS_CATEGORY = 'categoria/GET_PRODUCTS_CATEGORY';
export const GET_PRODUCT = 'categoria/GET_PRODUCT';

// Reducer
export function categoriaReducer(state = initial_state, action) { 
    switch (action.type) {
        case GET_CATEGORIES:
            const {categorias} = action.payload;

            return {
                ...state,
                categorias: categorias
            }
        case GET_PRODUCTS_CATEGORY:
            const {productosEnCategoria} = action.payload;

            return {
                ...state,
                productosEnCategoria
            }  
        case GET_PRODUCT:
            const {productoMostrado} = action.payload;

            return {
                ...state,
                productoMostrado
            }  
        default:
            return state;
    }
}

// Actions

export function fetchGetCategories() {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/categories', 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetCategories(json, url))
        ));
    }
}

export function fetchFinishGetCategories(json, url) {
    return {
        type: GET_CATEGORIES,
        payload: {
            categorias: json
        }
    }
}


export function fetchGetProductsCategory(id) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/categories/'+ id, 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetProductsCategory(json, url))
        ));
    }
}

export function fetchFinishGetProductsCategory(json, url) {
    return {
        type: GET_PRODUCTS_CATEGORY,
        payload: {
            productosEnCategoria: json
        }
    }
}

export function fetchGetProduct(id) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/products/'+ id, 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetProduct(json, url))
        ));
    }
}

export function fetchFinishGetProduct(json, url) {
    return {
        type: GET_PRODUCT,
        payload: {
            productoMostrado: json && json.length ? json[0] : json
        }
    }
}