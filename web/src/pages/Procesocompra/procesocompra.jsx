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
import { showLoading, showSuccess } from '../../redux/ducks/common.duck';
import { clearCart } from '../../redux/ducks/carrito.duck';
import { Control } from 'react-redux-form';

const preventSubmit = (event) => {
    event.preventDefault();
}

const handleChange = (event) => {
    //const nuevaCantidad = parseInt(event.target.value, 10);
    //  item.quantity = nuevaCantidad;

    // dispatch(addToCart(item.id, nuevaCantidad, {}));
}

let ver = [];
let verDir = [];
let verTarjetas = [];

export const Procesocompra = () => {

    // definicion de variables
    const dispatch = useDispatch();
    const app = useSelector(state => state);
    const { carrito } = app.carritoReducer;
    const [costoenvio, setcostoenvio] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const nomyape = loggedInUser["nombre"] + ' ' + loggedInUser["apellido"];
    const email = loggedInUser["email"];
    let [dni, setDni] = useState('');
    let [celular, setCelular] = useState('');
    let [calle, setCalle] = useState('');
    let [altura, setAltura] = useState('');
    let [CP, setCP] = useState('');
    let [localidad, setLocalidad] = useState("");
    let [provincia, setProvincia] = useState("");
    let direccion = new Object();
    direccion.calle = calle;
    direccion.altura = altura;
    direccion.CP = CP;
    direccion.localidad = localidad;
    direccion.provincia = provincia;



    let [ver2, setVer2] = useState({});
    var total = 0;
    var subtotal = 0;
    let history = useHistory();
    const [validated, setValidated] = useState(false);


    //handleSubmit. Realiza el alta de la compra en la BD
    const handleSubmit = (event, item) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        event.preventDefault();
        let productos = [];
        let cantidad = [];
        let precUnit = [];


        let ind = 0;
        let tipoEnv = "";
        let tipoPago = "";

        //**en este parrafo me traigo los datos por producto seleccionado
        carrito && carrito.map((item) => {
            return (
                <div className="col-descripcion">
                    {productos.push(item.producto.idProducto)}
                    {cantidad.push(item.quantity)}
                    {precUnit.push(item.producto.precio)}
                    {ind++}
                </div>)
        })
        //**tomo el tipo de envio/retiro y el tipo de pago seleccionado
        if (!noEnvio) { tipoEnv = "Envio a domicilio" }
        if (!noRetiro) { tipoEnv = "Retiro en sucursal" }
        if (tarjDeb) { tipoPago = "Tarjeta de débito" }
        if (tarjCred) { tipoPago = "Tarjeta de crédito" }
        if (mercadoPago) { tipoPago = "Mercado Pago" }
        console.log('datos tarjetas', tarjeta)
        console.log('idDire:', idDire)



        dispatch(showLoading(true))
        fetch(process.env.REACT_APP_API_URL + '/compra/add',
            {
                method: 'POST',
                body: JSON.stringify({ idusuario: loggedInUser["id"], idproductos: productos, precioUnitario: precUnit, cantprod: cantidad, tipoEnvio: tipoEnv, monto: total, TipoPago: tipoPago, dir: direccion, idDireccion: idDire, idTarj: idTarjeta, Tarjeta: tarjeta}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(() => {
                dispatch(showSuccess('Pedido realizado con éxito'));
                dispatch(clearCart());
                history.push("/mis-pedidos");
            })
    }

    //trae el precio del envio por CP
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

    //trae todos los CPs
    const traerCpes = () => {
        fetch(process.env.REACT_APP_API_URL + '/compra/envio',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(listacps => {
                ver = listacps;
                setVer2(ver);
                console.log('ver', ver[0]);
                console.log('ver2', ver2);
                console.log(listacps[0].codigoPostal);
            })
    }
    //trae direcciones por usuario
    const traerDirUsu = () => {
        fetch(process.env.REACT_APP_API_URL + '/direcciones/' + `${loggedInUser["id"]}`,

            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(listaDir => {
                verDir = listaDir;
                console.log('verDir', verDir);
            })
    }



    //traer tarjetas por usuario
    const traerTarjUsu = () => {
        fetch(process.env.REACT_APP_API_URL + '/tarjetas/' + `${loggedInUser["id"]}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(res => res.json())
            .then(listaTarjetas => {
                verTarjetas = listaTarjetas;
                console.log('verTarjetas: ', verTarjetas)
            })
    }


    //**** DATOS ENVIO *******/

    //para manejar la vista al seleccionar envio o retiro 
    const [dirNueva, setDirNueva] = useState(true);
    const [noEnvio, setNoEnvio] = useState(true);
    const [noRetiro, setNoRetiro] = useState(false);
    let [accionBtnEnvio, setaccionBtnEnvio] = useState("Seleccionar de mis direcciones");
    let [idDire, setIdDire] = useState(0);

    const handleNoEnvio = () => {
        setNoEnvio(false);
        setNoRetiro(true);
      //  setIdDire(0);
        traerCpes();
        traerDirUsu();
    }

    const handleNoRetiro = () => {
        setNoEnvio(true);
        setNoRetiro(false);
        setcostoenvio(0);
        setIdDire(0);
    }

    const buscarDirecciones = () => {
        if (dirNueva) {
            console.log('id dire', idDire)
            setDirNueva(false);
            setaccionBtnEnvio("Cargar una dirección nueva");

        }
        else {
            setDirNueva(true);
            setaccionBtnEnvio("Ver mis direcciones");
            setIdDire(999999999);
            console.log('id dire no ', idDire)
        }

    }

    //**** MEDIO DE PAGO *******/

    //para definir el tipo de pago seleccionado
    const [tarjDeb, setTarjDeb] = useState(false);
    const [tarjCred, setTarjCreb] = useState(false);
    const [mercadoPago, setMercadoPago] = useState(true);

    let [btnTarjetas, setBtnTarjetas] = useState("Seleccionar de mis tarjetas");
    let [nroTarjeta, setNroTarjeta] = useState("");
    let [titular, setTitular] = useState("");
    let [fechaVto, setFechaVto] = useState("");
    let [idTarjeta, setIdTarjeta] = useState(0);
    const [tarNueva, setTarNueva] = useState(true);

    let tarjeta = new Object();
    tarjeta.nroTarjeta = nroTarjeta;
    tarjeta.titular = titular;
    tarjeta.fechaVto = fechaVto;

    const handleTD = () => {
        //setIdTarjeta(0);
        setTarjDeb(true);
        setTarjCreb(false);
        setMercadoPago(false);
        traerTarjUsu();


    }

    const handleTC = () => {
    //    setIdTarjeta(0);
        setTarjDeb(false);
        setTarjCreb(true);
        setMercadoPago(false);
        traerTarjUsu();
      
    }
    const handleMC = () => {
        setTarjDeb(false);
        setTarjCreb(false);
        setMercadoPago(true);
        setIdTarjeta(0);
    }

    const buscarTarjetas = () => {
        if (tarNueva) {
           // console.log('id dire', idDire)
           setTarNueva(false);
            setBtnTarjetas("Cargar una tarjeta nueva");

        }
        else {
            setTarNueva(true);
            setBtnTarjetas("Ver mis tarjetas");
            setIdTarjeta(999999999);
          //  console.log('id dire no ', idDire)
        }

    }

    //**** CIERRE DE COMPRA *******/

    //boton cancelar transaccion. Vuelve al inicio
    function Cancelar() {
        history.push("/")
    }

    //para manejar el mensaje de compra exitosa 
    const [show, setShow] = useState(false);
    const handleShow = () => {
        if (validated)
            setShow(true);
    }
    const handleClose = () => {
        setShow(false);
        Cancelar();
    }


    //**** FRONT DE PROCESO DE COMPRA *******/
    return (

        <div className="row" style={{ margin: '10px' }}>
            <div className="container" style={{ backgroundColor: '#fff4' }}>
                <div className="seccion">
                    <div>Compra</div>
                </div>

                <div className="comprar-page">
                    <ul className="list-group" >
                        <Form model="pedido" noValidate validated={validated} onSubmit={handleSubmit} >
                            <Form.Row style={{ margin: '15px' }}>
                                <Form.Group as={Col} controlId="validationCustom02" >

                                    <Form.Control disabled="true" type="text" model="pedido.idusuario" placeholder="Nombre y Apellido" value={nomyape} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control required minLength="8" maxLength="8" type="text" placeholder="DNI" onChange={(e) => setDni(e.target.value)} value={dni} />
                                </Form.Group>

                            </Form.Row>

                            <Form.Row style={{ margin: '15px' }}>
                                <Form.Group as={Col} >
                                    <Form.Control disabled="true" type="email" placeholder="Correo Electrónico" value={email} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control required type="text" minLength="10" maxLength="10" placeholder="Celular" onChange={(e) => setCelular(e.target.value)} value={celular} />
                                </Form.Group>

                            </Form.Row>


                            <label class="font-weight-bold" style={{ margin: '10px' }}>Elegir forma de envío:</label>
                            <div class="card horizontal">
                                <Form onSubmit={preventSubmit}>
                                    <Form.Row style={{ margin: '15px' }}>
                                        {['radio'].map((type) => (
                                            <div class="custom-control custom-radio custom-control-inline">
                                                <Form.Check type="radio" inline label="Envio a Domicilio" id="customRadioInline0" name="customRadioInline1" class="custom-control-input" checked={noRetiro} onChange={handleNoEnvio} />
                                                <Form.Check type="radio" inline label="Retirar en Sucursal" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" checked={noEnvio} onChange={handleNoRetiro} />
                                            </div>
                                        ))}
                                    </Form.Row>
                                </Form>
                            </div>
                            <div className="container" style={{ width: '30rem', backgroundColor: '#eceef0', width: 'auto' }}>
                                <ul className="list-group" >

                                    {!noEnvio && <div class="card horizontal">
                                        <label class="font-weight-bold" style={{ margin: '10px' }}>Envío a domicilio:</label>

                                        <Form.Row style={{ margin: '15px' }}><Button variant="info" onClick={buscarDirecciones} >{accionBtnEnvio}</Button>  </Form.Row>
                                        <Form.Row style={{ margin: '15px' }}>
                                            {!dirNueva && <Form.Group as={Col}>

                                                <select disabled={noEnvio} onChange={(e) => setIdDire(e.target.value)} value={idDire} class="form-control" >

                                                    <option >Direcciones guardadas</option>
                                                    {verDir && verDir.map((item) => {

                                                        return (

                                                            <option value={item.id}>{item.calleAltura}, {item.ciudad}</option>
                                                        )
                                                    })
                                                    }

                                                </select>
                                            </Form.Group>}

                                        </Form.Row>
                                        {dirNueva && <Form.Row style={{ margin: '15px' }}>


                                            <Form.Group as={Col}  >
                                                <Form.Control required disabled={noEnvio} type="text" placeholder="Calle y altura" onChange={(e) => setCalle(e.target.value)} value={calle} />
                                            </Form.Group>

                                            <Form.Group as={Col} >

                                                <Form.Control required disabled={noEnvio} type="text" placeholder="Piso/Depto" onChange={(e) => setAltura(e.target.value)} value={altura} />
                                            </Form.Group>


                                            <Form.Group as={Col}>

                                                <select disabled={noEnvio} onChange={(e) => setCP(e.target.value)} value={CP} class="form-control" >

                                                    <option disabled={true}>Seleccione un Código Postal...</option>
                                                    {ver && ver.map((item) => {

                                                        return (
                                                            <option value={item.codigoPostal}>{item.codigoPostal}</option>
                                                        )
                                                    })
                                                    }

                                                </select>
                                            </Form.Group>


                                        </Form.Row>}

                                        {dirNueva && <Form.Row style={{ margin: '15px' }}>
                                            <Form.Group as={Col} >
                                                <Form.Control required disabled={noEnvio} type="text" placeholder="Localidad" onChange={(e) => setLocalidad(e.target.value)} value={localidad} />
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Form.Control required disabled={noEnvio} type="text" placeholder="Provincia" onChange={(e) => setProvincia(e.target.value)} value={provincia} />
                                            </Form.Group>
                                        </Form.Row>}

                                        <Form.Row style={{ margin: '15px' }}>
                                            <Form.Group as={Col} >
                                                <Button disabled={noEnvio} variant="info" onClick={calcularEnvio} >Calcular Envio</Button>
                                                <label show={noEnvio} class="font-weight-bold" style={{ margin: '10px' }}>Costo de envío: $  {costoenvio}</label>

                                            </Form.Group>
                                        </Form.Row>

                                    </div>}



                                    <Form onSubmit={preventSubmit} >
                                        {!noRetiro && <div class="card horizontal">
                                            <label class="font-weight-bold" style={{ margin: '10px' }}>Retirar por sucursal:</label>

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
                                                {/*
                                                <Form.Group disabled={noRetiro} as={Col} >
                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3284.1316028454944!2d-58.54251486611325!3d-34.60083354592867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1604874798531!5m2!1ses!2sar" ></iframe>
                                                </Form.Group>
                                               
                                    estilos de google maps:style={{width="200" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"}}
                                    <div id="map-container-google-1" class="z-depth-1-half map-container" style="height: 20px">
                                        <iframe src="https://maps.google.com" frameborder="0"
                                            style="border:0" allowfullscreen></iframe>
                                    </div>*/}

                                            </Form.Row>
                                        </div>}

                                        <label class="font-weight-bold" style={{ margin: '10px' }}>Elegir Método de pago:</label>
                                        <div class="card horizontal">
                                            <Form onSubmit={preventSubmit}>
                                                <Form.Row style={{ margin: '15px' }}>
                                                    {['radio'].map((type) => (
                                                        <div class="custom-control custom-radio custom-control-inline">
                                                            <Form.Check type="radio" inline label="Tarjeta de Crédito" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={tarjDeb} onChange={handleTD} />
                                                            <Form.Check type="radio" inline label="Tarjeta de débito" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={tarjCred} onChange={handleTC} />
                                                            <Form.Check type="radio" inline label="Mercado Pago" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={mercadoPago} onChange={handleMC} />
                                                        </div>
                                                    ))}

                                                    {(tarjDeb || tarjCred) && <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>
                                                    <Form.Row style={{ margin: '15px' }}><Button variant="info" onClick={buscarTarjetas} >{btnTarjetas}</Button>  </Form.Row>
                                                        {!tarNueva && <Form.Group as={Col}>
                                                            <select onChange={(e) => setIdTarjeta(e.target.value)} value={idTarjeta} class="form-control" >
                                                                <option >Tarjetas guardadas</option>
                                                                {verTarjetas && verTarjetas.map((item) => {

                                                                    return (

                                                                        <option value={item.idTarjeta}>{(item.numero)}</option>
                                                                    )
                                                                })
                                                                }

                                                            </select>
                                                        </Form.Group>}

                                                        {tarNueva &&
                                                        <Form.Row style={{ margin: '10px' }}>
                                                            <Form.Group as={Col} >
                                                                <Form.Control type="text" placeholder="Número" onChange={(e) => setNroTarjeta(e.target.value)} value={nroTarjeta} />
                                                            </Form.Group>

                                                            <Form.Group as={Col} >
                                                                <Form.Control type="text" placeholder="Titular" onChange={(e) => setTitular(e.target.value)} value={titular} />
                                                            </Form.Group>
                                                        </Form.Row>}
                                                        {tarNueva &&
                                                        <Form.Row style={{ margin: '10px' }}>
                                                            <Form.Group as={Col} >
                                                                <Form.Control type="text" placeholder="Fec vto" onChange={(e) => setFechaVto(e.target.value)} value={fechaVto} />
                                                            </Form.Group>

                                                            <Form.Group as={Col} >
                                                                <Form.Control type="text" placeholder="Código" />
                                                            </Form.Group>
                                                        </Form.Row>}

                                                    </div>}
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