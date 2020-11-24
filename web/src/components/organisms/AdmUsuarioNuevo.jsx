import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Control, Form, Errors } from 'react-redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddUser } from '../../redux/ducks/users.duck';

export function AdmUsuarioNuevo(props) {
    const app = useSelector(state => state);
    
    const dispatch = useDispatch();

    const tipos = [
        'cliente',
        'vendedor',
        'admin'
    ];

    function handleSubmit() {
        const user = app.user;
        dispatch(fetchAddUser(user, 'activo'));

    }

    function required(val) {
        return !val;
    }

    return (
        <>
            { <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <h1>Nuevo usuario</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form
                    model="form.user"
                    onSubmit={() => handleSubmit()}
                    >
                        <label htmlFor="form.user.firstName">Nombre:</label>
                        <Control.text model="form.user.firstName" id="form.user.firstName"  
                        errors={{ required: required }}/>
                        <Errors
                            model="form.user.firstName"
                            messages={{
                                required: 'El nombre es requerido'
                            }}
                        /><br />

                        <label htmlFor="form.user.lastName">Apellido:</label>
                        <Control.text model="form.user.lastName" id="form.user.lastName"   
                        errors={{ required: required }}/>
                        <Errors
                            model="form.user.lastName"
                            messages={{
                                required: 'El apellido es requerido'
                            }}
                        /><br />

                        <label htmlFor="form.user.userName">Usuario:</label>
                        <Control.text model="form.user.userName" id="form.user.userName"   
                        errors={{ required: required }}/>
                        <Errors
                            model="form.user.userName"
                            messages={{
                                required: 'El usuario es requerido'
                            }}
                        /><br />

                        <label htmlFor="form.user.email">Mail:</label>
                        <Control.text model="form.user.email" id="form.user.email"   
                        errors={{ required: required }}/>
                        <Errors
                            model="form.user.email"
                            messages={{
                                required: 'El mail es requerido'
                            }}
                        /><br />

                        <label htmlFor="form.user.password">Contraseña:</label>
                        <Control.password model="form.user.password" id="form.user.password"   
                        errors={{ required: required }}/>
                        <Errors
                            model="form.user.password"
                            messages={{
                                required: 'Debe ingresar el nombre del artículo.'
                            }}
                        /><br />

                        <label htmlFor="form.producto.idCategoria">Tipo</label>
                        <Control.select model="form.producto.idCategoria" id="form.producto.idCategoria">
                            {tipos.map((tipo, index) => {
                                return (
                                    <option value={tipo} key={tipo}>
                                        {tipo}
                                    </option>
                                );
                            }) }
                        </Control.select>


                        <Button type="submit" variant="info">
                            Crear usuario
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>}
        </>
    );
}