import React from 'react';
import { Control, Form, actions } from 'react-redux-form';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Registrar.css';

class Registrar extends React.Component {
  handleSubmit(user) {
      console.log(user);
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
                        <Control.text model="user.firstName" id="user.firstName" />

                        <label htmlFor="user.lastName">Apellido:</label>
                        <Control.text model="user.lastName" id="user.lastName" />

                        <label htmlFor="user.userName">Usuario:</label>
                        <Control.text model="user.userName" id="user.userName" />

                        <label htmlFor="user.email">Mail:</label>
                        <Control.text model="user.email" id="user.email" />

                        <label htmlFor="user.password">Contraseña:</label>
                        <Control.password model="user.password" id="user.password" />

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