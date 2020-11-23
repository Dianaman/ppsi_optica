import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Form as FormBs} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { modificarPrecio, switchEditingPrice } from '../../redux/ducks/adm-producto.duck';
import { Field, Form, Control, actions } from 'react-redux-form';


export function AdmProductoDetalle(props) {
    const app = useSelector(state => state);
    const { productoParaVer, modificandoPrecio } = app.admProductoReducer;

    
    const dispatch = useDispatch();


    function verEdicionPrecio(ver) {
        dispatch(switchEditingPrice(ver));
    }

    function Precio() {
        return (
            <div className="flex-row align-items-center">
                <div>Precio: <b>$ {productoParaVer.precio}</b></div>
                <Button className="margin-x-10px" onClick={() => verEdicionPrecio(true) }>Modificar precio</Button>
            </div>
        );
    }

    const changePrecio = () => {
        const nuevPrecio = parseInt(app.prod.precio, 10);

        dispatch(modificarPrecio(productoParaVer.id, nuevPrecio));
        verEdicionPrecio(false);
        
    }

    return (
        <>
            { productoParaVer && <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Image src={productoParaVer.foto} alt={productoParaVer.nombre} fluid/>
                </Modal.Header>
                <Modal.Body>
                    <h4>{productoParaVer.nombre}</h4>
                    <p>
                        {productoParaVer.descripcion}
                    </p>

                    <hr />

                    <div className="flex-row align-items-center">
                        <div>Cantidad en stock: &nbsp;
                            <b className={productoParaVer.puntoDeReposicion >= productoParaVer.stock  ? 'danger' : ''}>
                                {productoParaVer.stock}
                            </b>
                        </div>
                        {productoParaVer.puntoDeReposicion >= productoParaVer.stock  &&
                            <Button className="margin-x-10px">Reponer stock</Button>
                        }
                    </div>
                    {
                        modificandoPrecio 
                        ? 
                        <div className="flex-row align-items-center">
                            <Form model="form.prod" onSubmit={() => changePrecio()}>
                                <label htmlFor="form.producto.articulo">Precio: $</label>
                                <Control.text model="form.prod.precio" id="form.prod.precio" />


                                <Button className="margin-x-10px" type="submit">v</Button>
                            </Form>
                        </div>
                        :
                        <Precio />
                    }
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        }
        </>
    );
}