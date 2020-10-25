import React from 'react';
import './Login.css';

export const Login = () => {

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form">
                <input type="text" placeholder="Usuario"/>
                <input type="password" placeholder="Contraseña"/>
                <button>Iniciar</button>
                <p className="message">Nuevo usuario? <a href="/registrar">Crear cuenta</a></p>
                </form>
            </div>
        </div>
    );

    // $('.message a').click(function(){
    //     $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
    //  });    
    
};

