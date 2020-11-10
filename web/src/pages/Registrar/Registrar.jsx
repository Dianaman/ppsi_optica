import React from 'react';
import { Control, Form, actions } from 'react-redux-form';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Registrar.css';

class Registrar extends React.Component {
    constructor(props) {

        super(props);
 
        // Defino los estados locales 
        this.state = {
            campo: {},
            error: {},
            enviado: false 
        }
    }

    validarForm() {
        let campo = this.state.campo;
        let error = {};
        let formularioValido = true;
     
        // Nombre
        if (!campo["user.firstName"]) {
            formularioValido = false;
            error["user.firstName"] = "Por favor, ingresar Nombre";
        }

        // Apellido
        if (!campo["user.lastName"]) {
            formularioValido = false;
            error["user.lastName"] = "Por favor, ingresar Apellido";
        }  
        
        // Usuario
        if (!campo["user.userName"]) {
            formularioValido = false;
            error["user.userName"] = "Por favor, ingresar Usuario";
        }
        
        // Mail
        if (!campo["user.email"]) {
            formularioValido = false;
            error["user.email"] = "Por favor, ingresar Email";
        }        
     
        // Password
        if (!campo["user.password"]) {
            formularioValido = false;
            error["user.password"] = "Por favor, ingresar Password";
        }
     
        // Seteo el estado de error 
        this.setState({
            error: error
        });
     
        return formularioValido;
    };


    mensajeEnviado() {
        const enviado = this.state.enviado;

        if (enviado === true) {
 
            return {
                __html: '<div class="alert alert-success mt-3" role="alert">Usuario Registrado Correctamente!</div>'
            };
        }
    };


    detectarCambio(field, e) {
 
        let campo = this.state.campo;
        campo[field] = e.target.value;
    
        this.setState({
            campo
        });
        
    }    

  handleSubmit(user) {
      console.log(user);

      if(this.validarForm()){
        fetch(process.env.REACT_APP_API_URL + '/users/add',
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers:{
              'Content-Type': 'application/json'
            }
        }
        )
        .then(res => res.json())

        // Cambio el estado de 'enviado' a 'true'
        this.setState({
            enviado: true
        });  
        
        return this.mensajeEnviado();
      }
  }
  render() {
    return (
        <div className="registrar-page">
            <div className="container">
                <div className="form">
                    <Form
                        model="user"
                        onSubmit={(user) => this.handleSubmit(user)}
                    >
                        <label htmlFor="user.firstName">Nombre:</label>
                        <Control.text model="user.firstName" id="user.firstName" onChange={this.detectarCambio.bind(this, "user.firstName")} />
                        <span style={{color: "red"}}>{this.state.error["user.firstName"]}</span>
                        <div></div>

                        <label htmlFor="user.lastName">Apellido:</label>
                        <Control.text model="user.lastName" id="user.lastName" onChange={this.detectarCambio.bind(this, "user.lastName")} />
                        <span style={{color: "red"}}>{this.state.error["user.lastName"]}</span>
                        <div></div>

                        <label htmlFor="user.userName">Usuario:</label>
                        <Control.text model="user.userName" id="user.userName" onChange={this.detectarCambio.bind(this, "user.userName")} />
                        <span style={{color: "red"}}>{this.state.error["user.userName"]}</span>
                        <div></div>

                        <label htmlFor="user.email">Mail:</label>
                        <Control.text model="user.email" id="user.email" onChange={this.detectarCambio.bind(this, "user.email")} />
                        <span style={{color: "red"}}>{this.state.error["user.email"]}</span>
                        <div></div>

                        <label htmlFor="user.password">Contraseña:</label>
                        <Control.password model="user.password" id="user.password" onChange={this.detectarCambio.bind(this, "user.password")} />
                        <span style={{color: "red"}}>{this.state.error["user.password"]}</span>
                        <div></div>

                        <div className="msgok" dangerouslySetInnerHTML={this.mensajeEnviado()} /> 

                        <button type="submit">
                        Registrarme
                        </button>
                    </Form>
                </div>
            </div>
        </div>
    );
  }
}

export default Registrar;