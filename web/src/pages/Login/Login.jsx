import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Login.css';
//import axios from 'axios';

export default function Login() {

    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    const [invalidUser, setInvalidUser] = useState(false);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        console.log("loggedInUser: ", loggedInUser);
        if (loggedInUser !== false) {
            console.log('1');
            setUser(loggedInUser);
        }
    }, []);

    function mensajeEnviado() {

        if (invalidUser === true){
            return {
                __html: '<div class="alert alert-danger mt-3" role="alert">Usuario y/o contraseña invalidos!</div>'
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + '/users/byUsername/' + username + '/' + password)
        .then(res => res.json())
        .then(userBack => {

            if(userBack !== false){
                setUser(userBack);
                setInvalidUser(false);
                localStorage.setItem('user', JSON.stringify(userBack));
            }else{
                localStorage.setItem('user', false);
                setInvalidUser(true);
            }
        })
    };

    const handleLogout = () => {
        setUser({});
        setUsername("");
        setPassword("");
        localStorage.clear();
        history.push("/");
    };

    if (user) {
        return(
            <div className="login-page">
                <div className="form">
                    <div> Bienvenido/a {user.nombre} !</div>
                    <button onClick={handleLogout}>logout</button>
                </div>
            </div>            
        );
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Usuario' onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <input type="password" placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button>Iniciar</button>
                <p className="message">Nuevo usuario? <a href="/registrar">Crear cuenta</a></p>
                </form>
                <div className="msgok" dangerouslySetInnerHTML={mensajeEnviado()} /> 
            </div>
        </div>
    );    
};

