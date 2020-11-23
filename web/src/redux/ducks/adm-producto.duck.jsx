import { fetchApi } from './common.duck';

// State
const initial_state = {
    productos: [],
    productoParaVer: {},
    addProduct: false,
    modificandoPrecio: false
}

// Types
export const ADD_PRODUCT = 'adm_producto/ADD_PRODUCT';
export const ADDED_PRODUCT = 'adm_producto/ADDED_PRODUCT';
export const EDIT_PRODUCT = 'adm_producto/EDIT_PRODUCT';
export const REMOVE_PRODUCT = 'adm_producto/REMOVE_PRODUCT';
export const SEE_ADM_PRODUCT = 'adm_producto/SEE_PRODUCT';
export const EDIT_PRICE_PRODUCT = 'adm_producto/EDIT_PRICE_PRODUCT';
export const EDITING_PRICE_PRODUCT = 'adm_producto/EDITING_PRICE_PRODUCT';
export const SHOW_ADD_PRODUCT = 'adm_producto/SHOW_ADD_PRODUCT';

// Reducer
export function admProductoReducer(state = initial_state, action) { 
    switch (action.type) {
        case ADD_PRODUCT:
            const {productToAdd} = action.payload;

            fetchAddProduct(productToAdd);

            return {
                ...state
            };
        case ADDED_PRODUCT:
            const {productAdded} = action.payload;
            const storedProducts = state.productos;

            storedProducts.push(productAdded);

            return {
                ...state,
                productos: storedProducts
            };
        case EDIT_PRODUCT:
            const {editId, editedProduct} = action.payload;
            const productsToEdit = state.productos;

            const editIndex = storedProducts.findIndex(product => product.id === editId);
            if (editIndex > -1) {
                productsToEdit[editIndex] = editedProduct;
            } 

            return {
                ...state,
                productos: productsToEdit
            };
            
        case REMOVE_PRODUCT:
            const {removeId} = action.payload;
            const productsToRemove = state.productos;

            const removeIndex = productsToRemove.findIndex(product => product.id === removeId);
            if (removeIndex > -1) {
                productsToRemove.remove(removeIndex);
            } 

            return {
                ...state,
                productos: productsToRemove
            };
        case SEE_ADM_PRODUCT:
            const {productToSee} = action.payload;

            return {
                ...state,
                productoParaVer: productToSee
            }
        case EDITING_PRICE_PRODUCT:
            const {editingPrice} = action.payload;

            return {
                ...state,
                modificandoPrecio: editingPrice
            }
        case EDIT_PRICE_PRODUCT:
            const {priceProdId, newPrice} = action.payload;
            const productsToEditPrice = state.productos;

            const priceProdIndex = productsToEditPrice.findIndex(product => product.id === priceProdId);
            if (priceProdIndex > -1) {
                productsToEditPrice[priceProdIndex].precio = newPrice;
            }   

            return {
                ...state,
                productos: productsToEditPrice
            }
        default:
            return state;
    }
}

// Actions
export function addProduct(productToAdd) {
    return {
        type: ADD_PRODUCT,
        payload: {
            productToAdd
        }
    };
}

export function editProduct(editId, editedProduct) {
    return {
        type: EDIT_PRODUCT,
        payload: {
            editId,
            editedProduct
        }
    };
}

export function removeProduct(removeId) {
    return {
        type: REMOVE_PRODUCT,
        payload: {
            removeId
        }
    };
}

export function seeAdmProduct(productToSee) {
    return {
        type: SEE_ADM_PRODUCT,
        payload: {
            productToSee: productToSee
        }
    }
}

export function switchEditingPrice(modificando) {
    return {
        type: EDITING_PRICE_PRODUCT,
        payload: {
            editingPrice: modificando
        }
    }
}

export function modificarPrecio(priceProdId, newPrice) {
    return {
        type: EDIT_PRICE_PRODUCT,
        payload: {
            priceProdId,
            newPrice
        }
    }
}

export function showAddProduct(show) {
    return {
        type: SHOW_ADD_PRODUCT,
        payload: {
            addProduct: show
        }
    }
}

export function fetchAddProduct(product) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/products', 
            {
                method: 'POST',
                body: JSON.stringify({producto: product}),
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => fetchedAddProduct(json, url)
        ));
    }
}

export function fetchedAddProduct(json, url) {

}