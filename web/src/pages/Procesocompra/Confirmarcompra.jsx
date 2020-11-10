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

export const Confirmarcompra = () => {



    return (

        <div class="row" style={{ margin: '5px' }}>

            <div class="container" style={{ backgroundColor: '#fff4' }} >
                <div className="seccion"><div>Confirmar Compra</div> </div>
                <div><Menucompra></Menucompra></div>

                <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>
                    <div class="col">
                        <ul className="list-group" >

                            <Form onSubmit={preventSubmit}>
                            
                                    <label class="font-weight-bold" style={{ margin: '10px' }}>Datos Personales:</label>
                                    <div class="card horizontal">


                                        <Form.Row style={{ margin: '5px' }}>

                                            <Form.Group as={Col} >
                                                <label class="text-dark" >Erika Díaz</label>
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <label class="text-dark" >DNI 35.756.068</label>
                                            </Form.Group>

                                        </Form.Row>
                                    </div>

                                    <label class="font-weight-bold" style={{ margin: '5px' }}>Datos de Envío:</label>
                                    <div class="card horizontal">

                                        <Form.Row style={{ margin: '5px' }}>

                                            <Form.Group as={Col} >
                                                <label class="text-dark" >Guanahani 3454</label>
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <label class="text-dark" >Barracas, CABA</label>
                                            </Form.Group>

                                        </Form.Row>
                                    </div>

                                    <label class="font-weight-bold" style={{ margin: '10px' }}>Datos de Facturación:</label>
                                    <div class="card horizontal">

                                        <Form.Row style={{ margin: '5px' }}>

                                            <Form.Group as={Col} >
                                                <label class="text-dark" >Guanahani 3454</label>

                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <label class="text-dark" s>Barracas, CABA</label>
                                            </Form.Group>

                                        </Form.Row>
                                    </div>
                            


                            </Form>

                            <label class="font-weight-bold" style={{ margin: '10px' }}></label>



                        </ul>
                    </div>

                    
                <div class="container" style={{ backgroundColor: '#fff', width: 'auto', margin: '4px' }}>


<div class="col" >

    <div class="card horizontal">
        <div class="card-image">

            <div class="card-stacked">
                <div class="card-content">
                    <h3>Lentes de sol Rayban</h3>
                    <p>Código KDIGR334 </p>
                    <p> SubTotal $4000 </p>
                    <p>    Envío  $300 </p>
                    <p>Impuestos  $300 </p>
                    <p>    Total $4300 </p>
                </div>
            </div>
        </div>



    </div>


</div>

    


</div>

<Form.Row style={{ margin: '15px' }}>
                                    <Form.Group as={Col} >
                                        <Button variant="info" type="submit">CANCELAR</Button>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Button variant="info" type="submit">CONFIRMAR</Button>
                                    </Form.Group>
                                </Form.Row>                 
                </div>

            </div>

        </div>

    )



}