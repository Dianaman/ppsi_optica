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

}


export const Pago = () => {



    return (

        <div class="row" style={{ margin: '10px' }}>

            <div class="container" style={{ backgroundColor: '#fff4' }} >
                <div className="seccion">
                    <div>Medios de Pago</div>
                </div>
                <div><Menucompra></Menucompra></div>
                <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>
                    <div class="col">
                        <ul className="list-group" >

                            <label class="font-weight-bold" style={{ margin: '10px' }}>Elegir Método de pago:</label>
                            <div class="card horizontal">
                                <Form onSubmit={preventSubmit}>
                                    <Form.Row style={{ margin: '15px' }}>
                                    {['radio'].map((type) => (
                                        <div  class="custom-control custom-radio custom-control-inline">
                                            <Form.Check type="radio" inline label="Efectivo"  id="customRadioInline1" name="customRadioInline1" class="custom-control-input" />
                                            <Form.Check type="radio" inline label="Tarjeta de Crédito"  id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                                            <Form.Check type="radio" inline label="Tarjeta de débito"  id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                                            <Form.Check type="radio" inline label="Mercado Pago"  id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                                        </div>
                                    ))}
                                    </Form.Row>
                                </Form>
                            </div>
                            <label class="font-weight-bold" style={{ margin: '10px' }}></label>


                         
                            <Form onSubmit={preventSubmit}>
                            <div class="card horizontal">
                            <label class="text-dark" style={{ margin: '10px' }}>Datos de tarjeta:</label>

                                <Form.Row style={{ margin: '10px' }}>                               
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Número" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Titular" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row style={{ margin: '10px' }}>
                                    <Form.Group as={Col} >                                  
                                        <Form.Control type="text" placeholder="Fec vto" />
                                    </Form.Group>

                                    <Form.Group as={Col} >                                 
                                        <Form.Control type="text" placeholder="Código" />
                                    </Form.Group>
                                </Form.Row>



                                <label class="text-dark" style={{ margin: '10px' }}>Datos de facturación:</label>
                                <Form.Row style={{ margin: '10px' }}>
                                
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Calle" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Altura" />
                                    </Form.Group>

                                    
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Piso/Depto" />
                                    </Form.Group>

                                </Form.Row>

                                <Form.Row style={{ margin: '10px' }}>
                                
                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Localidad" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Código postal" />
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control type="text" placeholder="Provincia" />
                                    </Form.Group>
                                </Form.Row>
                                </div>
                                <Form.Row style={{ margin: '10px' }}>
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

        </div>

    )



}