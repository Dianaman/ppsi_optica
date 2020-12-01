import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import carritoIcon from '../assets/icons/shopping_cart.svg';
import { addToCart, removeFromCart } from '../redux/ducks/carrito.duck';
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
    
        dispatch(addToCart(item.id, nuevaCantidad, item.producto, item.extras));
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
                                <h3>#{item.id} - {item.producto.nombre}</h3>
                                <h3>$ {item.producto.precio}</h3>
                            </div>
                            <div className="flex-row justify-between">
                                <div className="col-descripcion flex-column">
                                    {item.extras?.multifocales && <span>Multifocales</span>}
                                    {item.extras?.antireflex && <span>Anti-reflex</span>}
                                    {item.extras?.blueblock && <span>Blue-block</span>}
                                </div>
                                <div>
                                    {item.extras?.filePath && <p><a href={item.extras.filePath} target="_blank">Receta</a></p>}
                                    {item.producto.idCategoria === 3 && <Form onSubmit={preventSubmit}>
                                        <Form.Row>
                                        <Form.Group as={Col} md="4">
                                            <Form.Control type="number" min="0" value={item.quantity} onChange={(event) => handleChange(event, item)}/>
                                        </Form.Group>
                                        </Form.Row>
                                    </Form>}
                                </div>
                                <div>
                                    <Button variant="link" onClick={() => dispatch(removeFromCart(item.id))}>Quitar</Button>&nbsp;
                                {false && <Button variant="link">Guardar para después</Button>}
                                </div>
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