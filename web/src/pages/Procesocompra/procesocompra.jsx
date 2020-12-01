import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Menucompra } from './Menucompra';
import { Compra } from './Compra';
import { Envio } from './Envio';
import { Pago } from './Pago';
import { Confirmarcompra } from './Confirmarcompra';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import If from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';

const preventSubmit = (event) => {
    event.preventDefault();
}

const handleChange = (event) => {
    //const nuevaCantidad = parseInt(event.target.value, 10);
    //  item.quantity = nuevaCantidad;

    // dispatch(addToCart(item.id, nuevaCantidad, {}));
}



export const Procesocompra = () => {


    const app = useSelector(state => state);
    const { carrito } = app.carritoReducer;
    const [costoenvio, setcostoenvio] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const nomyape = loggedInUser["nombre"] + ' ' + loggedInUser["apellido"];
    const email = loggedInUser["email"] ;
 


    const handleSubmit = (event, item) => {
        event.preventDefault();
     
        let productos = [];
        let cantidad = [];
        let precUnit = [];
        let ind = 0;
        let tipoEnv = "";


        carrito && carrito.map((item) => {
            return (

                <div className="col-descripcion">
                    {productos.push(item.producto.idProducto)}
                    {cantidad.push(item.quantity)}
                    {precUnit.push(item.producto.precio)}
                    {ind++}


                </div>)


        })

        if (!noEnvio) { tipoEnv = "Envio a domicilio" }
        if (!noRetiro) { tipoEnv = "Retiro en sucursal" }




        fetch(process.env.REACT_APP_API_URL + '/compra/add',
            {
                method: 'POST',
                body: JSON.stringify({ idusuario: loggedInUser["id"], idproductos: productos, precioUnitario: precUnit, cantprod: cantidad, tipoEnvio: tipoEnv, monto: total }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
    }

    let [CP, setCP] = useState(0);
    const calcularEnvio = (event, item) => {
        event.preventDefault();



        fetch(process.env.REACT_APP_API_URL + '/compra/' + `${CP}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(costoEnvio => {
                const { Precio } = costoEnvio;
                setcostoenvio(Precio);
                console.log(Precio);

            })


    }



    var total = 0;
    var subtotal = 0;
    let history = useHistory();
    function Cancelar() {
        history.push("/")
    }


    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        Cancelar();
    }

    const [noEnvio, setNoEnvio] = useState(true);
    const [noRetiro, setNoRetiro] = useState(false);
    const handleNoEnvio = () => {
        setNoEnvio(false);
        setNoRetiro(true);
    }

    const handleNoRetiro = () => {
        setNoEnvio(true);
        setNoRetiro(false);
    }


    return (

        <div className="row" style={{ margin: '10px' }}>

            <div className="container" style={{ backgroundColor: '#fff4' }}>
                <div className="seccion">
                    <div>Compra</div>
                </div>



                <div className="comprar-page">
                    <ul className="list-group" >
                        <Form model="pedido" onSubmit={handleSubmit} >
                            <Form.Row style={{ margin: '15px' }}>
                                <Form.Group as={Col} >

                                    <Form.Control disabled="true" type="text" model="pedido.idusuario" placeholder="Nombre y Apellido" value={nomyape}/>
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control type="text" placeholder="DNI" />
                                </Form.Group>

                            </Form.Row>

                            <Form.Row style={{ margin: '15px' }}>
                                <Form.Group as={Col} >
                                    <Form.Control disabled="true" type="email" placeholder="Correo Electrónico" value={email} />
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
                            <label class="font-weight-bold" style={{ margin: '10px' }}>Elegir forma de envío:</label>
                            <div class="card horizontal">
                                <Form onSubmit={preventSubmit}>
                                    <Form.Row style={{ margin: '15px' }}>
                                        {['radio'].map((type) => (
                                            <div class="custom-control custom-radio custom-control-inline">
                                                <Form.Check type="radio" inline label="Envio a Domicilio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={noRetiro} onChange={handleNoEnvio} />
                                                <Form.Check type="radio" inline label="Retirar en Sucursal" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={noEnvio} onChange={handleNoRetiro} />
                                            </div>
                                        ))}
                                    </Form.Row>
                                </Form>
                            </div>
                            <div className="container" style={{ width: '30rem', backgroundColor: '#eceef0', width: 'auto' }}>
                                <ul className="list-group" >
                                    <label class="font-weight-bold" style={{ margin: '10px' }}>Envío a domicilio:</label>
                                    <div class="card horizontal">
                                        <Form onSubmit={preventSubmit}>
                                            <Form.Row style={{ margin: '15px' }}>
                                                <Form.Group as={Col} >
                                                    <Form.Control disabled={noEnvio} type="text" placeholder="Calle" />
                                                </Form.Group>

                                                <Form.Group as={Col} >
                                                    <Form.Control disabled={noEnvio} type="text" placeholder="Altura" />
                                                </Form.Group>

                                                <Form.Group as={Col} >
                                                    <Form.Control disabled={noEnvio} type="text" placeholder="Código Postal" onChange={(e) => setCP(e.target.value)} value={CP} />
                                                </Form.Group>

                                            </Form.Row>

                                            <Form.Row style={{ margin: '15px' }}>
                                                <Form.Group as={Col} >
                                                    <Form.Control disabled={noEnvio} type="text" placeholder="Localidad" />
                                                </Form.Group>

                                                <Form.Group as={Col} >
                                                    <Form.Control disabled={noEnvio} type="text" placeholder="Provincia" />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Row style={{ margin: '15px' }}>
                                                <Form.Group as={Col} >
                                                    <Button disabled={noEnvio} variant="info" onClick={calcularEnvio} >Calcular Envio</Button>
                                                 <label show={noEnvio} class="font-weight-bold" style={{ margin: '10px' }}>Costo de envío: $  {costoenvio}</label>
 
                                                </Form.Group>
                                            </Form.Row>
                                        </Form>

                                    </div>

                                    <label class="font-weight-bold" style={{ margin: '10px' }}>Retirar por sucursal:</label>


                                    <Form onSubmit={preventSubmit} >
                                        <div class="card horizontal">
                                            <Form.Row style={{ margin: '15px' }}>
                                                <Form.Group as={Col}  >

                                                    <label style={{ margin: '10px' }} class="text-dark">Elegir sucursal más cercana:</label>
                                                    <select disabled={noRetiro} class="form-control" >
                                                        <option >Sucursal 1</option>
                                                        <option>Sucursal 2</option>
                                                        <option>Sucursal 3</option>
                                                    </select>
                                                </Form.Group>


                                            </Form.Row>
                                            <Form.Row style={{ margin: '15px' }}>
                                                {/*<label  style={{ margin: '10px' }} class="text-dark">Elegir sucursal del mapa:</label>*/}

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

                                        <label class="font-weight-bold" style={{ margin: '10px' }}>Elegir Método de pago:</label>
                                        <div class="card horizontal">
                                            <Form onSubmit={preventSubmit}>
                                                <Form.Row style={{ margin: '15px' }}>
                                                    {['radio'].map((type) => (
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <Form.Check type="radio" inline label="Tarjeta de Crédito" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                                                            <Form.Check type="radio" inline label="Tarjeta de débito" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                                                            <Form.Check type="radio" inline label="Mercado Pago" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" />
                                                        </div>
                                                    ))}
                                                </Form.Row>
                                            </Form>
                                        </div>


                                        {carrito && carrito.map((item) => {
                                            return (
                                                <div className="app-card" key={item.id}>

                                                    <div className="img">
                                                        <img src={item.producto.pathImagen} style={
                                                            { 'width': '130px', 'height': '130px', 'margin': '10px' }
                                                        } />
                                                    </div>

                                                    <div className="text">
                                                        <div className="flex-row justify-between">
                                                            <h3>{item.producto.nombre}</h3>
                                                            <h3>$ {item.producto.precio}</h3>

                                                            {subtotal = item.producto.precio * item.quantity}
                                                            {total = total + subtotal}
                                                        </div>
                                                        <div className="flex-row justify-between">
                                                            <div className="col-descripcion">
                                                                Código {item.id}
                                                            </div>
                                                            <div>
                                                                <Form onSubmit={preventSubmit}>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} md="4">
                                                                            <Form.Control type="number" min="0" value={item.quantity} onChange={handleChange.bind(item)} />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Form>
                                                            </div>
                                                        </div>

                                                        <div className="col-descripcion">
                                                            SUBTOTAL        {subtotal}
                                                        </div>


                                                    </div>
                                                </div>
                                            );
                                        })
                                        }

                                          
                                        <h3 className="col-descripcion" style={{ margin: '10px' }}>
                                           
                                            TOTAL                                $ {total = total + costoenvio}
                                        </h3>



                                        <Form.Row style={{ margin: '15px' }}>
                                            <Form.Group as={Col} >
                                                <Button variant="info" onClick={Cancelar}>Cancelar</Button>
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Button variant="info" type="submit" onClick={handleShow} >Confirmar</Button>


                                            </Form.Group>
                                        </Form.Row>

                                        <Modal show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Estado de Compra</Modal.Title>
                                            </Modal.Header>

                                            <Modal.Body>
                                                <p>¡Compra exitosa!.</p>
                                            </Modal.Body>

                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}> Close</Button>

                                            </Modal.Footer>
                                        </Modal>

                                    </Form>

                                </ul>

                            </div>

                        </Form>
                    </ul>
                </div>

    
            </div>
        </div>

    )



}