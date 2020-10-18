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
            return {
                ...state,
                isLoading: true,
                error: null
            }
            case SHOW_ERROR:
                const { error } = action.payload;

                return {
                    ...state,
                    isLoading: false,
                    error
                }
        default: 
            return state;
    }
} 

// Actions
export function showLoading(){
    return {
        type: SHOW_LOADING,
        payload: {
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
