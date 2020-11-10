import React from 'react'
import { Link } from "react-router-dom";
import { Menucompra } from './Menucompra';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export const Envio = () => {


    const preventSubmit = (event) => {
        event.preventDefault();
    }

 
    const handleChange = (event, item) => {
        // const nuevaCantidad = parseInt(event.target.value, 10);
        // item.quantity = nuevaCantidad;

        // dispatch(addToCart(item.id, nuevaCantidad, {}));
    }
    return (

        <div class="row" style={{ margin: '10px' }}>

            <div class="container" style={{ backgroundColor: '#fff4' }}>
                <div className="seccion">
                    <div>Elegir Envío</div>
                </div>
                <div><Menucompra></Menucompra></div>
           
                <div className="container" style={{ width: '30rem', backgroundColor: '#eceef0', width: 'auto' }}>
                    <ul className="list-group" >
                        <label class="font-weight-bold" style={{ margin: '10px' }}>Envío a domicilio:</label>
                        <div class="card horizontal">
                            <Form onSubmit={preventSubmit}>
                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Calle" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Altura" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Código Postal" />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Localidad" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Provincia" />
                                    </Form.Group>
                                </Form.Row>
                            </Form>

                        </div>

                        <label class="font-weight-bold" style={{ margin: '10px' }}>Retirar por sucursal:</label>
                        

                            <Form onSubmit={preventSubmit}>
                            <div class="card horizontal">
                                <Form.Row style={{ margin: '15px' }}>
                                   <Form.Group as={Col} >

                                     <label  style={{ margin: '10px' }} class="text-dark">Elegir sucursal más cercana:</label>
                                        <select class="form-control" >
                                            <option>Sucursal 1</option>
                                            <option>Sucursal 2</option>
                                            <option>Sucursal 3</option>
                                        </select>

                                        
                                    </Form.Group>


                                </Form.Row>

                                <Form.Row style={{ margin: '15px' }}>
                                <label  style={{ margin: '10px' }} class="text-dark">Elegir sucursal del mapa:</label>

                                    <Form.Group as={Col} >
                                      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3284.1316028454944!2d-58.54251486611325!3d-34.60083354592867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1604874798531!5m2!1ses!2sar" ></iframe>
                                   </Form.Group>
                                    {/*
                                    estilos de google maps:style={{width="200" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"}}
                                    <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 20px">
                                        <iframe src="https://maps.google.com" frameborder="0"
                                            style="border:0" allowfullscreen></iframe>
                                    </div>*/}

                                </Form.Row>
                                </div>
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




        </div>

    )



}