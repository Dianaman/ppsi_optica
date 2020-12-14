import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const preventSubmit = (event) => {
    event.preventDefault();
}

export const Pago = () => {

    return (

        <div class="row" style={{ margin: '10px' }}>

            <div class="container" style={{ backgroundColor: '#fff4' }} >

                <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>
                    <div class="col">
                        <ul className="list-group" >


                            <Form onSubmit={preventSubmit}>
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

                            </Form>


                        </ul>
                    </div>
                </div>
            </div>

        </div>

    )
}