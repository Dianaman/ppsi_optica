import { fetchApi, setModalOpen } from './common.duck';

// State
const initial_state = {
    ventas: [],
    ventaMostrada: null,
    detalles: []
}

// Types
export const GET_SALES = 'venta/GET_SALES';
export const SHOW_SALE = 'venta/SHOW_SALE';
export const GET_DETAILS = 'venta/GET_DETAILS';

// Reducer
export function ventaReducer(state = initial_state, action) { 
    switch (action.type) {
        case GET_SALES:
            const {ventas} = action.payload;

            return {
                ...state,
                ventas
            }
        case SHOW_SALE:
            const {ventaMostrada} = action.payload;

            return {
                ...state,
                ventaMostrada
            }
        case GET_DETAILS:
            const {detalles} = action.payload;

            return {
                ...state,
                detalles
            }
        default:
            return state;
    }
}

// Actions

export function fetchGetSales() {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/sales', 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetSales(json, url))
        ));
    }
}

export function fetchFinishGetSales(json, url) {
    return {
        type: GET_SALES,
        payload: {
            ventas: json
        }
    }
}

export function changeStateSale(id, state) {
    return (dispatch, getState) => {
        const estado = {estado: state};
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/sales/' + id, 
            {
                method: 'PUT',
                body: JSON.stringify(estado),
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => {
                dispatch(setModalOpen(false))
                dispatch(fetchGetSales(json, url))
            }
        ));
    }
}

export function showSale(sale) {
    return {
        type: SHOW_SALE,
        payload: {
            ventaMostrada: sale
        }
    }
}

export function fetchGetDetails(sale) {
    return (dispatch, getState) => {
        dispatch(showSale(sale))
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/sales/' + sale.idPedido, 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetDetails(json, url))
        ));
    }
}

export function fetchFinishGetDetails(json, url) {
    return {
        type: GET_DETAILS,
        payload: {
            detalles: json
        }
    }
}
