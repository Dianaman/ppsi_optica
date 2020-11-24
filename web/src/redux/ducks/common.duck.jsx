// State
const initialState = {
    showLoading: false,
    error: null
};

// Types
export const SHOW_LOADING = 'common/SHOW_LOADING';
export const SHOW_ERROR = 'common/SHOW_ERROR';

// Reducer
export function commonReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADING:
            const { show } = action.payload;
            return {
                ...state,
                showLoading: show,
                error: null
            }
            case SHOW_ERROR:
                const { error } = action.payload;

                return {
                    ...state,
                    showLoading: false,
                    error
                }
        default: 
            return state;
    }
} 

// Actions
export function showLoading(show){
    console.log('show loading', show);
    return {
        type: SHOW_LOADING,
        payload: {
            show
        }        
    }
}

export function showError(error){
    return {
        type: SHOW_ERROR,
        payload: {
            error
        }        
    }
}


export function fetchApi(url, options, callback) {
    return (dispatch, getState) => {
        return dispatch(fetchApiInner(url, options, callback))
    }
}

export function fetchApiInner(url, options, callback) {
    return (dispatch, getState) => {
        dispatch(showLoading(true));
        return fetch(url, {
            method: options.method || 'GET',
            body: options.body,
            headers: options.headers
        })
        .then(response => response.json())
        .then(json => {
            dispatch(showLoading(false))
            callback(json, url)
        })
        .catch(error => dispatch(showError(error)))
    }
}

