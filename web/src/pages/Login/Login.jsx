import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import './Login.css';
import { setActualUser } from '../../redux/ducks/users.duck';
import { clearCart } from '../../redux/ducks/carrito.duck';
import { showError, showLoading } from '../../redux/ducks/common.duck';

export default function Login() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const app = useSelector(state => state);
    const usuarioActual = app.usuariosReducer.usuarioActual;

    const handleSubmit = (e) => {
        dispatch(showLoading(true));
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + '/users/byUsername/' + username + '/' + password)
        .then(res => res.json())
        .then(userBack => {
            console.log(userBack);
            if(userBack !== false && userBack.estado === 'activo'){
                dispatch(setActualUser(userBack));
                localStorage.setItem('user', JSON.stringify(userBack));
                dispatch(showLoading(false));
                history.push("/");
            } else if(userBack !== false && userBack.estado === 'bloqueado') {
                localStorage.setItem('user', false);
                dispatch(showLoading(false));
                dispatch(showError('El usuario se encuentra bloqueado por el administrador.'));
            } else{
                localStorage.setItem('user', false);
                dispatch(showLoading(false));
                dispatch(showError('Usuario y/o contraseña invalidos!'));
            }

        })
    };

    const handleLogout = () => {
        setUsername("");
        setPassword("");
        dispatch(setActualUser(null));
        dispatch(clearCart());
        localStorage.clear();
        history.push("/");
    };

    if (usuarioActual) {
        return(
            <div className="login-page">
                <div className="form">
                    <div>{usuarioActual.nombre}, seguro que deseas salir?</div>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </div>            
        );
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input required="required" type="text" placeholder='Usuario' onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <input required="required" type="password" placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button>Iniciar</button>
                <p className="message">Nuevo usuario? <a href="/registrar">Crear cuenta</a></p>
                </form>
            </div>
        </div>
    );    
};

