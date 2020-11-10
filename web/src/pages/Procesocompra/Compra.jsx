import React from 'react'
import { Link } from "react-router-dom";
import { Menucompra } from './Menucompra';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const preventSubmit = (event) => {
    event.preventDefault();
}

const handleChange = (event, item) => {
    //const nuevaCantidad = parseInt(event.target.value, 10);
  //  item.quantity = nuevaCantidad;

    // dispatch(addToCart(item.id, nuevaCantidad, {}));
}

export const Compra = () => {



    return (

        <div class="row" style={{ margin: '10px' }}>



            <div class="container" style={{ backgroundColor: '#fff4' }}>
                <div className="seccion">
                    <div>Compra</div>
                </div>
                <div><Menucompra></Menucompra></div>

                <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>


                    <div class="col">
                        <ul className="list-group" >

                            <Form onSubmit={preventSubmit}>
                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Nombre  y apellido" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="DNI" />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Form.Control type="email" placeholder="Correo Electrónico" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="number" placeholder="Celular" />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Código postal" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Ciudad" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Provincia" />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Button variant="info" type="submit">Volver</Button>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Button variant="info" type="submit">Continuar</Button>
                                    </Form.Group>
                                </Form.Row>

                            </Form>
                        </ul>
                    </div>

                </div>


                <div class="container" style={{ backgroundColor: '#fff', width: 'auto', margin: '4px' }}>


                    <div class="col" >

                        <div class="card horizontal">
                            <div class="card-image">

                                <div class="card-stacked">
                                    <div class="card-content">
                                        <h3>Lentes de sol Rayban</h3>
                                        <p>Código KDIGR334 </p>
                                        <p> $4000 </p>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>


                </div>

            </div>

        </div>

    )



}