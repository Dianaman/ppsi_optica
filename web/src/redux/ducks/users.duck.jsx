import { fetchApi, setModalOpen } from './common.duck';

// State
const initial_state = {
    usuarios: [],
    usuarioMostrado: null,
    usuarioActual: null
}

// Types
export const GET_USERS = 'usuarios/GET_USERS';
export const GET_USER = 'usuarios/GET_USER';
export const SET_USER = 'usuarios/SET_USER';

// Reducer
export function usuariosReducer(state = initial_state, action) { 
    switch (action.type) {
        case GET_USERS:
            const {usuarios} = action.payload;

            return {
                ...state,
                usuarios: usuarios
            }
        case GET_USER:
            const {usuarioMostrado} = action.payload;

            return {
                ...state,
                usuarioMostrado
            } 
        case SET_USER:
            const { usuarioActual } = action.payload;

            return {
              ...state,
              usuarioActual
            }
        default:
            return state;
    }
}

// Actions

export function fetchGetUsers() {
    return (dispatch, getState) => {
        dispatch(fetchApi(
            process.env.REACT_APP_API_URL + '/users', 
            {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }
            },
            (json, url) => dispatch(fetchFinishGetUsers(json, url))
        ));
    }
}

export function fetchFinishGetUsers(json, url) {
  return {
    type: GET_USERS,
    payload: {
      usuarios: json
    }
  }
}


export function fetchGetUser(id) {
  return (dispatch, getState) => {
      dispatch(fetchApi(
          process.env.REACT_APP_API_URL + '/users/'+ id, 
          {
              method: 'GET',
              headers:{
                'Content-Type': 'application/json'
              }
          },
          (json, url) => dispatch(fetchFinishGetUser(json, url))
      ));
  }
}

export function fetchFinishGetUser(json, url) {
  return {
      type: GET_USER,
      payload: {
        usuarioMostrado: json
      }
  }
}

export function fetchAddUser(user, estado) {
  return (dispatch, getState) => {
      console.log('user', user);

      const data = {
        user,
        estado
      }

    dispatch(fetchApi(
      process.env.REACT_APP_API_URL + '/users/add', 
      {
          method: 'POST',
          body: JSON.stringify(data),
          headers:{
            'Content-Type': 'application/json'
          }
      },
      (json, url) => {
        dispatch(setModalOpen(false))
        dispatch(fetchFinishAddUser(json, url))
      }
    ));
  }
}

export function fetchFinishAddUser(json, url) {
  return (dispatch, getState) => {
    dispatch(fetchGetUsers());
  }
}

export function setActualUser(user) {
  return {
    type: SET_USER,
    payload: {
      usuarioActual: user
    }
  }
}
