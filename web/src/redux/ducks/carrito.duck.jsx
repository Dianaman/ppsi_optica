

// State
const initial_state = {
    carrito: []
}

// Types
export const ADD_CART = 'carrito/ADD_CART';
export const REMOVE_CART = 'carrito/REMOVE_CART';
export const CLEAR_CART = 'carrito/CLEAR_CART';

// Reducer
export function carritoReducer(state = initial_state, action) { 
    switch (action.type) {
        case ADD_CART:
            const {addId, newQuantity, extras} = action.payload;
            const carritoToAdd = state.carrito;

            const itemEnCarrito = carritoToAdd.find(carritoItem => carritoItem.id === addId);
            if (itemEnCarrito) {
                itemEnCarrito.quantity = newQuantity;
                itemEnCarrito.extras = extras;
            } else {
                const item = {
                    id: addId,
                    quantity: newQuantity,
                    extras
                };

                carritoToAdd.push(item);
            }

            return {
                ...state,
                carrito: carritoToAdd
            };

        case REMOVE_CART:
            const {removeId} = action.payload;
            const carritoToRemove = state.carrito;

            const index = carritoToRemove.findIndex(carritoItem => carritoItem.id === removeId);
            if (index > -1) {
                carritoToRemove.remove(index);
            }

            return {
                ...state,
                carrito: carritoToRemove
            };
            
        case CLEAR_CART:
            return {
                ...state,
                carrito: []
            };

        default:
            return state;
    }
}

// Actions
export function addToCart(id, quantity, extras) {
    return {
        type: ADD_CART,
        payload: {
            addId: id,
            newQuantity: quantity,
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