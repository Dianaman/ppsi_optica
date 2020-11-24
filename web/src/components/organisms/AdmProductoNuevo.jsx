import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Control, Form, Errors } from 'react-redux-form';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAddProduct } from '../../redux/ducks/adm-producto.duck';
import { ImageUploader } from './images/ImageUploader';

export function AdmProductoNuevo(props) {
    const app = useSelector(state => state);
    const { categorias } = app.categoriaReducer;
    
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const producto = app.producto;
        const {files} = app.filesReducer;

        if (files && files.length) {
            dispatch(fetchAddProduct(producto, files[0].url));
        }

    }

    const required = (val) => {
        return !val;
    }

    const quantityFormat = (val) => {
        return !val || val < 0 || !val.match('^[0-9]+$')
    }

    const currencyFormat = (val) => {
        const num = Number.parseFloat(val);

        return !val || Number.isNaN(num) || num < 0;
    }

    const stockMaximoMenorMinimo = (val) => {
        const minimo = Number.parseInt(app.producto.puntoDeReposicion, 10);
        const stockMaximo = Number.parseInt(val, 10);

        return stockMaximo < minimo;

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

                        <label htmlFor="form.producto.idCategoria">Categoría</label>
                        <Control.select model="form.producto.idCategoria" id="form.producto.idCategoria">
                            {categorias && categorias.map((categoria, index) => {
                                return (
                                    <option value={categoria.idCategoria} key={categoria.idCategoria}>
                                        {categoria.descripcion}.
                                    </option>
                                );
                            }) }
                        </Control.select>

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

                        <label htmlFor="form.producto.stock">Stock</label>
                        <Control.text model="form.producto.stock" id="form.producto.stock" 
                        errors={{ quantityFormat: quantityFormat }}/>
                        <Errors
                            model="form.producto.stock"
                            messages={{
                                quantityFormat: 'Debe ingresar un valor entero mayor o igual a 0'
                            }}
                        /><br />

                        <label htmlFor="form.producto.puntoDeReposicion">Punto de reposición</label>
                        <Control.text model="form.producto.puntoDeReposicion" id="form.producto.puntoDeReposicion" 
                        errors={{ quantityFormat: quantityFormat }}/>
                        <Errors
                            model="form.producto.puntoDeReposicion"
                            messages={{
                                quantityFormat: 'Debe ingresar un valor entero mayor o igual a 0'
                            }}
                        /><br />                        

                        <label htmlFor="form.producto.stockMaximo">Stock máximo</label>
                        <Control.text model="form.producto.stockMaximo" id="form.producto.stockMaximo" 
                        errors={{ quantityFormat: quantityFormat, stockMaximoMenorMinimo: stockMaximoMenorMinimo}}/>
                        <Errors
                            model="form.producto.stockMaximo"
                            messages={{
                                quantityFormat: 'Debe ingresar un valor entero mayor o igual a 0',
                                stockMaximoMenorMinimo: 'El stock máximo debe ser mayor al punto de reposición'
                            }}
                        /><br />   

                        <label htmlFor="form.producto.precio">Precio</label>
                        <Control.text model="form.producto.precio" id="form.producto.precio" 
                        errors={{ currencyFormat: currencyFormat }}/>
                        <Errors
                            model="form.producto.precio"
                            messages={{
                                currencyFormat: 'Debe ingresar un valor entero mayor o igual a 0'
                            }}
                        /><br />   
                        
                        <ImageUploader></ImageUploader>     

                        <Button type="submit" className="margin-y-10px" variant="info">
                        Añadir producto
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>}
        </>
    );
}