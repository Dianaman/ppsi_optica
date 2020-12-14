import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';



export function Compra() {

    const handleSubmit= (event)=>{
        event.preventDefault();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
 
        fetch(process.env.REACT_APP_API_URL + '/compra/add',
        {
            method: 'POST',
            body: JSON.stringify({idusuario:loggedInUser["id"]}),
            headers:{
              'Content-Type': 'application/json'
            }
        }
        )
        .then(res => res.json())
    }

              return (
                <div className="comprar-page">
                        <ul className="form" >
                       
                            <Form model="pedido" onSubmit={handleSubmit} >
                                <Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                   
                                    <Form.Control type="text" model="pedido.idusuario" placeholder="Nombre" />
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
                                <Form.Row style={{ margin: '10px' }}>
                                    <Form.Group as={Col} >
                                        <Button variant="info" type="">Volver</Button>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Button variant="info" type="submit">Confirmar</Button>
                                    </Form.Group>
                                </Form.Row>

                            </Form>
                        </ul>
                    </div>


    )





}

export default Compra;