import { fetchApi, setModalOpen } from './common.duck';

// State
const initial_state = {
    misPedidos: [],
    miPedidoMostrado: null,
    detalles: []
}

// Types
export const GET_MY_ORDERS = 'miPedido/GET_MY_ORDERS';
export const SHOW_MY_ORDER = 'miPedido/SHOW_MY_ORDER';
export const GET_DETAILS = 'miPedido/GET_DETAILS';

// Reducer
export function misPedidosReducer(state = initial_state, action) { 
    switch (action.type) {
        case GET_MY_ORDERS:
            const {misPedidos} = action.payload;

            return {
                ...state,
                misPedidos
            }
        case SHOW_MY_ORDER:
            const {miPedidoMostrado} = action.payload;

            return {
                ...state,
                miPedidoMostrado
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

export function fetchGetMyOrders() {
    return (dispatch, getState) => {
        const user = JSON.parse(localStorage.getItem('user'));

        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/my-orders/'+ user.id, 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetMyOrders(json, url))
        ));
    }
}

export function fetchFinishGetMyOrders(json, url) {
    return {
        type: GET_MY_ORDERS,
        payload: {
            misPedidos: json
        }
    }
}

export function showMyOrder(sale) {
    return {
        type: SHOW_MY_ORDER,
        payload: {
            miPedidoMostrado: sale
        }
    }
}

export function fetchGetDetails(order) {
    return (dispatch, getState) => {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(showMyOrder(order))
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/my-orders/' + user.id + '/' + order.idPedido, 
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


export function changeStateMyOrder(id, state) {
    return (dispatch, getState) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const estado = {estado: state};
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/my-orders/' + user.id + '/' + id, 
            {
                method: 'PUT',
                body: JSON.stringify(estado),
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => {
                dispatch(setModalOpen(false))
                dispatch(fetchGetMyOrders(json, url))
            }
        ));
    }
}