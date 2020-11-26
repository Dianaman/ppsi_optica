import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import carritoIcon from '../assets/icons/shopping_cart.svg';
import { addToCart } from '../redux/ducks/carrito.duck';
import {useHistory } from "react-router-dom";


export function Carrito() {
    const dispatch = useDispatch();
    
    
    let history = useHistory();
    function handleClick() {
        history.push("/Procesocompra")
     }

    let subtotal = 0;


    const app = useSelector(state => state);
    const {carrito} = app.carritoReducer;

    const handleChange = (event, item) => {
        const nuevaCantidad = parseInt(event.target.value, 10);
        item.quantity = nuevaCantidad;
    
        dispatch(addToCart(item.id, nuevaCantidad, {}));
    }
    
    const preventSubmit = (event) => {
      event.preventDefault();
    }

    return (
        <div className="container">
            <div className="seccion">
                <div>Carrito</div>
                <img src={carritoIcon} />
            </div>

            <div className="flex-column">

                {carrito && carrito.map((item) => {
                    return (
                    <div className="app-card" key={item.id}>
                        <div className="img">
                            <img src={item.producto.pathImagen} style={
                                {'width': '130px', 'height': '130px', 'margin': '10px'}
                                }/>
                        </div>

                        <div className="text">
                            <div className="flex-row justify-between">
                                <h3>{item.producto.nombre}</h3>
                                <h3>$ {item.producto.precio}</h3>
                            </div>
                            <div className="flex-row justify-between">
                                <div className="col-descripcion">
                                    Código {item.id}
                                </div>
                                <div>
                                    <Form onSubmit={preventSubmit}>
                                        <Form.Row>
                                        <Form.Group as={Col} md="4">
                                            <Form.Control type="number" min="0" value={item.quantity} onChange={handleChange.bind(item)}/>
                                        </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </div>
                            </div>
                            <div>
                                <Button variant="link">Quitar</Button>&nbsp;
                                <Button variant="link">Guardar para después</Button>
                            </div>


                        </div>
                    </div>
                    );
                })
                }
                
            </div>

            <hr />

            <div className="flex-row justify-end margin-x-10px">
                <b className="margin-x-10px">Subtotal</b>
                <b>${subtotal}</b>
            </div>

            <br />
            
            <div className="flex-row justify-between">
                <Button variant="info">Ver más productos</Button>
                <Button variant="info"   onClick={handleClick}>Comprar</Button>
            </div>
        </div>
    );
}