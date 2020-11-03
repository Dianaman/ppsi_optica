import React, {useState, useEffect} from 'react';
import { useLocation } from "wouter";
import './Login.css';
import useUser from '../../hooks/useUser'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [, navigate] = useLocation()
    const {login, isLogged} = useUser()

    useEffect(() => {
        if (isLogged) navigate('/')
    }, [isLogged, navigate])

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        //alert(`${username}, ${password}`)
    };

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder='Usuario' onChange={(e) => setUsername(e.target.value)} value={username}/>
                    <input type="password" placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} value={password}/>
                <button>Iniciar</button>
                <p className="message">Nuevo usuario? <a href="/registrar">Crear cuenta</a></p>
                </form>
            </div>
        </div>
    );    
};

