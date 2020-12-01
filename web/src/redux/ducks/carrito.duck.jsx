

// State
const initial_state = {
    carrito: []
}

// Types
export const ADD_CART = 'carrito/ADD_CART';
export const REMOVE_CART = 'carrito/REMOVE_CART';
export const CLEAR_CART = 'carrito/CLEAR_CART';
export const SET_CART = 'carrito/SET_CART';

// Reducer
export function carritoReducer(state = initial_state, action) { 
    switch (action.type) {
        case ADD_CART:
            const {addId, newQuantity, producto, extras} = action.payload;
            const carritoToAdd = state.carrito;

            const itemEnCarrito = carritoToAdd.find(carritoItem => carritoItem.id === addId);
            if (itemEnCarrito) {
                itemEnCarrito.quantity = newQuantity;
                itemEnCarrito.extras = extras;
            } else {
                const item = {
                    id: addId,
                    quantity: newQuantity,
                    producto,
                    extras
                };

                carritoToAdd.push(item);
            }

            localStorage.setItem('carrito', JSON.stringify(carritoToAdd));

            return {
                ...state,
                carrito: carritoToAdd
            };

        case REMOVE_CART:
            const {removeId} = action.payload;
            const carritoToRemove = state.carrito;

            const index = carritoToRemove.findIndex(carritoItem => carritoItem.id === removeId);
            if (index > -1) {
                carritoToRemove.splice(index, 1);
            }

            localStorage.setItem('carrito', JSON.stringify(carritoToRemove));
            return {
                ...state,
                carrito: carritoToRemove
            };
            
        case CLEAR_CART:
            localStorage.setItem('carrito', '');
            return {
                ...state,
                carrito: []
            };
        case SET_CART:
            const { carritoDefault } = action.payload;

            return {
                ...state,
                carrito: carritoDefault
            }
        default:
            return state;
    }
}

// Actions
export function addToCart(id, quantity, producto, extras) {
    return {
        type: ADD_CART,
        payload: {
            addId: id,
            newQuantity: quantity,
            producto,
            extras
        }
    };
}

export function removeFromCart(id) {
    return {
        type: REMOVE_CART,
        payload: {
            removeId: id
        }
    };
}

export function clearCart() {
    return {
        type: CLEAR_CART
    };
}

export function setCart(carrito) {
    return {
        type: SET_CART,
        payload: {
            carritoDefault: carrito
        }
    }
}