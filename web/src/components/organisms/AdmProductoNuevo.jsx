import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Control, Form, Field, Errors, isRequired } from 'react-redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddProduct } from '../../redux/ducks/adm-producto.duck';

export function AdmProductoNuevo(props) {
    const app = useSelector(state => state);
    
    const dispatch = useDispatch();

    const handleSubmit = () => {
        console.log('producto', app.producto);
        const producto = app.producto;

        dispatch(fetchAddProduct(producto));
    }

    const required = (val) => {
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
                    <h1>Nuevo producto</h1>
                </Modal.Header>
                <Modal.Body>
                    <Form className="flex-column"
                        model="form.producto"
                        onSubmit={() => handleSubmit()}
                    >
                        <label htmlFor="form.producto.articulo">Artículo</label>
                        <Control.text model="form.producto.articulo" id="form.producto.articulo" 
                        errors={{ required: required }}/>
                        <Errors
                            model="form.producto.articulo"
                            messages={{
                                required: 'Debe ingresar el nombre del artículo.'
                            }}
                        /><br />

                        <label htmlFor="form.producto.descripcion">Descripción</label>
                        <Control.text model="form.producto.descripcion" id="form.producto.descripcion" 
                        errors={{ required: required }}/>
                        <Errors
                            model="form.producto.descripcion"
                            messages={{
                                required: 'Debe ingresar una descripción.'
                            }}
                        /><br />

                        <label htmlFor="form.producto.marca">Marca</label>
                        <Control.text model="form.producto.marca" id="form.producto.marca" 
                        errors={{ required: required }}/>
                        <Errors
                            model="form.producto.marca"
                            messages={{
                                required: 'Debe ingresar la marca del artículo.'
                            }}
                        /><br />

                        <label htmlFor="form.producto.modelo">Modelo</label>
                        <Control.text model="form.producto.modelo" id="form.producto.modelo" 
                        errors={{ required: required }}/>
                        <Errors
                            model="form.producto.modelo"
                            messages={{
                                required: 'Debe ingresar el modelo del artículo.'
                            }}
                        /><br />

                        <label htmlFor="form.producto.imagen">Imagen</label>
                        <Control.file model="form.producto.imagen" id="form.producto.imagen" /><br />

                        <Button type="submit" className="margin-y-10px" variant="info">
                        Registrarme
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>}
        </>
    );
}