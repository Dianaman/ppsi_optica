import { fetchApi, setModalOpen } from './common.duck';

// State
const initial_state = {
    productos: [],
    productoParaVer: {},
    addProduct: false,
    modificandoPrecio: false,
    modificandoStock: false
}

// Types

export const GET_PRODUCTS = 'adm_producto/GET_PRODUCTS';
export const FINISH_GET_PRODUCTS = 'adm_producto/FINISH_GET_PRODUCTS';
export const ADD_PRODUCT = 'adm_producto/ADD_PRODUCT';
export const EDIT_PRODUCT = 'adm_producto/EDIT_PRODUCT';
export const REMOVE_PRODUCT = 'adm_producto/REMOVE_PRODUCT';
export const SEE_ADM_PRODUCT = 'adm_producto/SEE_PRODUCT';
export const EDITING_PRICE_PRODUCT = 'adm_producto/EDITING_PRICE_PRODUCT';
export const SHOW_ADD_PRODUCT = 'adm_producto/SHOW_ADD_PRODUCT';
export const EDITING_STOCK_PRODUCT = 'adm_producto/EDITING_STOCK_PRODUCT';

// Reducer
export function admProductoReducer(state = initial_state, action) { 
    switch (action.type) {
        case GET_PRODUCTS:
            const productos = action.payload.productos;

            return {
                ...state,
                productos
            }

        case ADD_PRODUCT:
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
        case EDITING_STOCK_PRODUCT:
            const {editingStock} = action.payload;

            return {
                ...state,
                modificandoStock: editingStock
            }
        default:
            return state;
    }
}

// Actions

export function fetchGetProducts() {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/products', 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetProducts(json, url))
        ));
    }
}

export function fetchFinishGetProducts(json, url) {
    return {
        type: GET_PRODUCTS,
        payload: {
            productos: json
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

export function editPrice(priceProdId, newPrice) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/products/change-price', 
            {
                method: 'POST',
                body: JSON.stringify({price: newPrice, id: priceProdId}),
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => {
                dispatch(setModalOpen(false))
                dispatch(fetchGetProducts())
            }
        ));
    }
}

export function switchEditingStock(modificando) {
    return {
        type: EDITING_STOCK_PRODUCT,
        payload: {
            editingStock: modificando
        }
    }
}

export function restock(stockProdId, newStock) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/products/change-stock', 
            {
                method: 'PUT',
                body: JSON.stringify({stock: newStock, id: stockProdId}),
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => {
                dispatch(setModalOpen(false))
                dispatch(fetchGetProducts())
            }
        ));
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

export function fetchAddProduct(product, imageUrl) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/products', 
            {
                method: 'POST',
                body: JSON.stringify({producto: product, imageUrl}),
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => {         
                dispatch(setModalOpen(false))
                dispatch(fetchFinishAddProduct(json, url))
            }
        ));
    }
}

export function fetchFinishAddProduct(json, url) {
    return {
        type: ADD_PRODUCT,
        payload: {
            productAdded: json
        }
    }
}