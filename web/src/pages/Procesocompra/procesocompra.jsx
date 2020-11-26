import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Menucompra } from './Menucompra';
import { Compra } from './Compra';
import { Envio } from './Envio';
import { Pago } from './Pago';
import { Confirmarcompra } from './Confirmarcompra';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import If from 'react-bootstrap';


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

    const handleSubmit = (event, item) => {
        event.preventDefault();
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        let productos = [];
        let ind = 0;

        carrito && carrito.map((item) => {
            return (

                <div className="col-descripcion">
                    {productos.push(item.producto.idProducto)}
                    {ind++}

                </div>)


        })
        function darProductos() {
            productos && productos.map((item) => {
                return (
                    <div className="col-descripcion">
                        { console.log(item)
                        }
                    </div>)
            })
        }



        fetch(process.env.REACT_APP_API_URL + '/compra/add',
            {
                method: 'POST',
                body: JSON.stringify({ idusuario: loggedInUser["id"], idproductos: productos }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
    }
    var total = 0;
    var subtotal = 0;
    let history = useHistory();
    function Cancelar() {
        history.push("/")
     }
     //let [confir, setConfir] = useState(false);
    
     function Confirmar(){
         return{

            __html: '<div class="alert alert-danger mt-3" role="alert">¡Compra exitosa!</div>'

//        <div class="alert alert-warning alert-dismissable">
  //      <button type="button" class="close" data-dismiss="alert">&times;</button>
    //    <strong>¡Compra exitosa!</strong> Podrás ver el detalle en el listado de pedidos.  </div>
    }
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

                                                    <label style={{ margin: '10px' }} class="text-dark">Elegir sucursal más cercana:</label>
                                                    <select class="form-control" >
                                                        <option>Sucursal 1</option>
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
                                                            <Form.Check type="radio" inline label="Efectivo" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" />
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


                                        <h3 className="col-descripcion" style={{ margin: '10px'}}>
                                             TOTAL                                $ {total}
                                        </h3>



                                        <Form.Row style={{ margin: '15px' }}>
                                            <Form.Group as={Col} >
                                                <Button variant="info"  onClick={Cancelar}>Cancelar</Button>
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Button variant="info" type="submit"  onClick={Confirmar} >Confirmar</Button>
                                              {/*
                                                {confir && <div class="alert alert-warning alert-dismissable">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>¡Compra exitosa!</strong> Podrás ver el detalle en el listado de pedidos.
                                              </div>}*/}
                                                
                                            </Form.Group>
                                        </Form.Row>

                                    </Form>

                                   
                                    

                                </ul>

                            </div>





                        </Form>
                    </ul>
                </div>




    )


  {/*        

                <div>

                    <nav className="nav nav-tabs nav-justified"  >
                   
                        <Button variant="info" onClick={mostrar1}>Datos Facturación</Button>
                        <Button variant="info" onClick={mostrar2} >Elegir envío</Button>
                        <Button variant="info" onClick={mostrar3}>Realizar Pago</Button>
                        <Button variant="info" onClick={mostrar4}>Confirmar Compra</Button>

                    </nav>              

                </div>
             

                <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>
                   { console.log(flag)}
                {flag === 1 &&  <div>{<Compra></Compra>}</div> }
                {flag === 2 &&  <div>{<Envio></Envio>}</div> }
                {flag === 3 &&  <div>{<Pago></Pago>}</div> }
                {flag === 4 &&  <div>{<Confirmarcompra></Confirmarcompra>}</div> }
             
                </div>
*/}




            </div>

        </div>

    )



}