import { fetchApi } from './common.duck';

// State
const initialState = {
    files: []
};

// Types
export const UPLOAD_IMAGE = 'files/UPLOAD_IMAGE';
export const REMOVE_IMAGE = 'files/REMOVE_IMAGE';
export const CLEAR_IMAGES = 'files/CLEAR_IMAGES';

// Reducer
export function filesReducer(state = initialState, action) {
    switch (action.type) {
        case UPLOAD_IMAGE:
            const { files } = action.payload;
            return {
                ...state,
                files
            }
        case REMOVE_IMAGE:
            const { idToRemove } = action.payload;

            const filteredFiles = state.files.filter(image => image.public_id !== idToRemove);

            return {
                ...state,
                files: filteredFiles
            }
        case CLEAR_IMAGES:
            return {
                ...state,
                files: []
            }
        default: 
            return state;
    }
} 

// Actions
export function uploadImage(formData) {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/files/image-upload', 
            {
                method: 'POST',
                body: formData
            },
            (json, url) => dispatch(finishUploadImage(json, url))
        ));
    }
}

export function finishUploadImage(json, url) {
    return {
        type: UPLOAD_IMAGE,
        payload: {
            files: json
        }
    }
}

export function removeFile(id) {
    return {
        type: REMOVE_IMAGE,
        payload: {
            idToRemove: id
        }
    }
}

export function clearImages() {
    return {
        type: CLEAR_IMAGES
    }
}