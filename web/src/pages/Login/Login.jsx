import React, { useState, useEffect } from 'react';
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
    const [user, setUser] = useState();
    const [invalidUser, setInvalidUser] = useState(false);

    const dispatch = useDispatch();

    const app = useSelector(state => state);
    const usuarioActual = app.usuariosReducer.usuarioActual;

    useEffect(() => {
        if (usuarioActual) {
            console.log('1');
            setUser(usuarioActual);
        }
    }, []);

    /*function mensajeEnviado() {

        if (invalidUser === true){
            return {
                __html: '<div class="alert alert-danger mt-3" role="alert">Usuario y/o contraseña invalidos!</div>'
            };
        }
    };*/

    const handleSubmit = (e) => {
        dispatch(showLoading(true));
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + '/users/byUsername/' + username + '/' + password)
        .then(res => res.json())
        .then(userBack => {
            console.log(userBack);
            if(userBack !== false && userBack.estado === 'activo'){
                setUser(userBack);
                dispatch(setActualUser(userBack));
                setInvalidUser(false);
                localStorage.setItem('user', JSON.stringify(userBack));
                dispatch(showLoading(false));
            } else if(userBack !== false && userBack.estado === 'bloqueado') {
                localStorage.setItem('user', false);
                setInvalidUser(true);
                dispatch(showLoading(false));
                dispatch(showError('El usuario se encuentra bloqueado por el administrador.'));
            } else{
                localStorage.setItem('user', false);
                setInvalidUser(true);
                dispatch(showLoading(false));
                dispatch(showError('Usuario y/o contraseña invalidos!'));
            }

        })
    };

    const handleLogout = () => {
        setUser({});
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
                    <div> Bienvenido/a {usuarioActual.nombre} !</div>
                    <button onClick={handleLogout}>logout</button>
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

