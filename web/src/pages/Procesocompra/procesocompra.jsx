import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { showError, showLoading, showSuccess } from '../../redux/ducks/common.duck';
import { clearCart } from '../../redux/ducks/carrito.duck';

const preventSubmit = (event) => {
    event.preventDefault();
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
    let direccion = {};
    direccion.calle = calle;
    direccion.altura = altura;
    direccion.CP = CP;
    direccion.localidad = localidad;
    direccion.provincia = provincia;

    React.useEffect(() => {
        setDni(loggedInUser["dni"] || '');
        setCelular(loggedInUser["celular"] || '');

        valForm();
    }, []);

    let [ver2, setVer2] = useState({});
    var total = 0;
    var subtotal = 0;
    let history = useHistory();
    const [validated, setValidated] = useState(false);

    function valForm() {
        validate(() => valCelular(celular), 'celular');
        validate(() => valDni(dni), 'dni');
        if(dirNueva){
        validate(() => valDireccion(calle), 'calle');
        validate(() => valDireccion(localidad), 'localidad');
        validate(() => valDireccion(provincia), 'provincia');
        validate(() => valDireccion(CP), 'cp');}
        if(tarNueva){
        validate(() => valTarjetaNro(nroTarjeta), 'nrotarjeta');
        validate(() => valTarjetaTitular(titular), 'titulartarjeta');
        validate(() => valTarjetaVto(fechaVto), 'vtotarjeta');
        validate(() => valTarjetaCod(codTar), 'codtarjeta');   }         
    }

    function isNumber(val) {
        return val.match('^[0-9]+$');
    }

    let [errors, setErrors] = useState([]);
    function validate(cb, field) {
        if (field) {
            if(cb()) {
                if (errors.indexOf(field) === -1) {
                    errors.push(field);
                }
            } else {
                if(errors.indexOf(field) > -1) {
                    errors.splice(errors.indexOf(field), 1);
                }
            }            
        }

    }

    function hasError(field){
        return errors.indexOf(field) > -1;
    }

    function valCelular(val) {
        console.log(val);
        return(!val || val.length !== 10 || !isNumber(val));
    }

    function valDni(val) {
        return (!val || val.length !== 8 || !isNumber(val));
    }

    function valDireccion(val) {
        return (!noEnvio && !val);
    }

    function valTarjetaNro(val) {
        return ((tarjDeb || tarjCred) && (!val || val.length !== 16 || !isNumber(val)));
    }

    function valTarjetaTitular(val) {
        return ((tarjDeb || tarjCred) && !val);
    }

    function valTarjetaVto(val) {
        return ((tarjDeb || tarjCred) && (!val || val.length !== 5 || !val.match('^((0[1-9])|(1[0-2]))\/(([2-3])([0-9]))$')));
    }

    function valTarjetaCod(val) {
        return ((tarjDeb || tarjCred) && (!val || val.length !== 3 || !isNumber(val)));
    }

    //handleSubmit. Realiza el alta de la compra en la BD
    const handleSubmit = (event, item) => {
        valForm();
        if (errors.length > 0) {
            event.preventDefault();
            event.stopPropagation();
            dispatch(showError('Faltan datos o hay datos incorrectos'));
            return;
        }

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            dispatch(showError('Faltan datos o hay datos incorrectos'));
            return;
        }
        setValidated(true);

        event.preventDefault();


        let productos = [];
        let cantidad = [];
        let precUnit = [];


        let ind = 0;
        let tipoEnv = "";
        let tipoPago = "";
        let tipoTarj = "";

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
        if (tarjDeb) { tipoPago = "Tarjeta de débito"; tipoTarj  = "TD" }
        if (tarjCred) { tipoPago = "Tarjeta de crédito"; tipoTarj = "TC" }
        if (mercadoPago) { tipoPago = "Mercado Pago" }
        tarjeta.tipo = tipoTarj;
        console.log('datos tarjetas', tarjeta);
        if(!tarNueva){

        }
        console.log('idDire:', idDire)



        dispatch(showLoading(true))
        fetch(process.env.REACT_APP_API_URL + '/compra/add',
            {
                method: 'POST',
                body: JSON.stringify({ idusuario: loggedInUser["id"], idproductos: productos, precioUnitario: precUnit, cantprod: cantidad, tipoEnvio: tipoEnv, monto: total, TipoPago: tipoPago, dir: direccion, idDireccion: idDire, idTarj: idTarjeta, Tarjeta: tarjeta }),
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
      //  event.preventDefault();
        fetch(process.env.REACT_APP_API_URL + '/compra/' + CP,
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
              
            })
    }
    //trae direcciones por usuario
    const traerDirUsu = () => {
        fetch(process.env.REACT_APP_API_URL + '/direcciones/' + loggedInUser["id"],

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
               
            })
    }



    //traer tarjetas debito por usuario
    const traerTarjDeb = () => {
        fetch(process.env.REACT_APP_API_URL + '/tarjetas/debito/' + `${loggedInUser["id"]}`,
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
               
            })
    }

        //traer tarjetas credito por usuario
        const traerTarjCred = () => {
            fetch(process.env.REACT_APP_API_URL + '/tarjetas/credito/' + `${loggedInUser["id"]}`,
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
                    
                })
        }
    


    //**** DATOS ENVIO *******/

    //para manejar la vista al seleccionar envio o retiro 
    const [dirNueva, setDirNueva] = useState(true);
    const [noEnvio, setNoEnvio] = useState(true);
    const [noRetiro, setNoRetiro] = useState(false);
    let [accionBtnEnvio, setaccionBtnEnvio] = useState("Seleccionar de mis direcciones");
    let [idDire, setIdDire] = useState(0);
    let [direSelec, setDireSelec] = useState([0]);

    const handleNoEnvio = () => {
        setNoEnvio(false);
        setNoRetiro(true);
        setIdDire(999999999);
        traerCpes();
        traerDirUsu();
    }

    const handleNoRetiro = () => {
        setNoEnvio(true);
        setNoRetiro(false);
        setcostoenvio(0);
        setIdDire(0);
    }
    let codpost = 0;
    const buscarDirecciones = () => {
        if (dirNueva) { 
            setDirNueva(false); 
            setaccionBtnEnvio("Cargar una dirección nueva");
            //console.log('idDire', JSON.parse(idDire));
            
            //setIdDire(JSON.parse(direSelec).id);
            //codpost = JSON.parse(direSelec).codPostal;
            //console.log('CodPost:', codpost);
            //console.log('id dir selec:', JSON.parse(direSelec).id);
            //setCP(codpost) ; 

        }
        else {
            setDirNueva(true);
            setaccionBtnEnvio("Ver mis direcciones");
            setIdDire(999999999);
            
         

             //codpost = JSON.parse(direSelec).codPostal;
             //setCP(codpost) ;
            //console.log('CodPost:', codpost);
     
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
    let [codTar, setCodTar] = useState("");
    let [tipoTar, setTipoTar] = useState("");
    const [tarNueva, setTarNueva] = useState(true);

    let tarjeta = {};
    tarjeta.nroTarjeta = nroTarjeta;
    tarjeta.titular = titular;
    tarjeta.fechaVto = fechaVto;
    tarjeta.tipo = tipoTar;

    const handleTD = () => {
        //setIdTarjeta(0);
        setTarjDeb(true);
        setTarjCreb(false);
        setMercadoPago(false);
        traerTarjDeb();
        setTarNueva(true);
        setIdTarjeta(999999999);

    }

    const handleTC = () => {
        //    setIdTarjeta(0);
        setTarjDeb(false);
        setTarjCreb(true);
        setMercadoPago(false);
        traerTarjCred();
        setTarNueva(true);
        setIdTarjeta(999999999);

    }
    const handleMC = () => {
        setTarjDeb(false);
        setTarjCreb(false);
        setMercadoPago(true);
        setTarNueva(true);
        setIdTarjeta(0);
        
    }

    const buscarTarjetas = () => {
        if (tarNueva) {
            setTarNueva(false);
            setBtnTarjetas("Cargar una tarjeta nueva");

        }
        else {
            setTarNueva(true);
            setBtnTarjetas("Ver mis tarjetas");
            setIdTarjeta(999999999);
        }

    }

    function calcTotal() {
        total = 0;
        carrito.forEach(item => {
            total += item.quantity * item.producto.precio;
        });
        total += (costoenvio || 0); 
    
        return (
            <>
                {
                    total
                }
            </>
        )
    }

    //**** CIERRE DE COMPRA *******/

    //boton cancelar transaccion. Vuelve al inicio
    function Cancelar() {
        history.push("/")
    }


    function SelecDireFun(a) {
        setDireSelec(a);
        console.log("id sale?:", JSON.parse(direSelec));

        setIdDire(JSON.parse(direSelec).id);
        console.log("id dire?:", idDire);

        setcostoenvio(JSON.parse(direSelec).Precio);
        console.log("costo envio:", costoenvio);

        setCP(JSON.parse(direSelec).codPostal);
        console.log("cod postal:", CP);
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
                        <Form model="pedido" noValidate validated={validated} onSubmit={handleSubmit} onChange={valForm}>
                            <Form.Row style={{ margin: '15px' }}>
                                <Form.Group as={Col} controlId="validationCustom02" >
                                    <Form.Control disabled={true} type="text" model="pedido.idusuario" placeholder="Nombre y Apellido" value={nomyape} />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control required minLength="8" maxLength="8" type="text" placeholder="DNI" 
                                    className={hasError("dni")
                                    ? "form-control is-invalid"
                                    : "form-control"}
                                    onChange={(e) =>{  setDni(e.target.value)}}
                                    value={dni}/>
                                </Form.Group>

                            </Form.Row>

                            <Form.Row style={{ margin: '15px' }}>
                                <Form.Group as={Col} >
                                    <Form.Control disabled={true} type="email" placeholder="Correo Electrónico" value={email}/>
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control required type="text" minLength="10" maxLength="10" placeholder="Celular"
                                    className={hasError("celular")
                                    ? "form-control is-invalid"
                                    : "form-control"}
                                    onChange={(e) =>{  setCelular(e.target.value)}}
                                    value={celular} />
                                </Form.Group>

                            </Form.Row>

                            <div className="container" style={{ width: '30rem', backgroundColor: '#eceef0', width: 'auto' }}>

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
                                <ul className="list-group" >

                                    {!noEnvio && <div class="card horizontal">
                                        <label class="font-weight-bold" style={{ margin: '10px' }}>Envío a domicilio:</label>

                                        <Form.Row style={{ margin: '10px' }}><Button variant="info" onClick={buscarDirecciones} >{accionBtnEnvio}</Button>  </Form.Row>
                                        <Form.Row style={{ margin: '10px' }}>
                                            {!dirNueva && <Form.Group as={Col}>

                                            <select required onClick={(e) => SelecDireFun(e.target.value)} onChange={(e) => SelecDireFun(e.target.value)} value={direSelec} class="form-control" >

                                                    <option value=""  >Direcciones guardadas</option>
                                                    {verDir && verDir.map((item) => {

                                                        return (
                                                            <option eventkey={item.id} value={JSON.stringify(item)}>{item.calleAltura}, {item.ciudad}</option>
                                                        )
                                                    })
                                                    }

                                                </select>
                                            </Form.Group>}

                                        </Form.Row>
                                        {dirNueva && <Form.Row style={{ margin: '2px' }}>


                                            <Form.Group as={Col}  >
                                                <Form.Control className={hasError("calle")
                                                    ? "form-control is-invalid"
                                                    : "form-control"}
                                                    onChange={(e) =>{  setCalle(e.target.value)}}
                                                    disabled={noEnvio} type="text" placeholder="Calle y altura" value={calle} />
                                            </Form.Group>

                                            <Form.Group as={Col} >

                                                <Form.Control disabled={noEnvio} type="text" placeholder="Piso/Depto" onChange={(e) => setAltura(e.target.value)} value={altura} />
                                            </Form.Group>


                                            <Form.Group as={Col}>

                                                <select required onChange={(e) => setCP(e.target.value)} value={CP} 
                                                className={hasError("cp")
                                                    ? "form-control is-invalid"
                                                    : "form-control"}>

                                                    <option selected value="" >Código Postal</option>
                                                    {ver && ver.map((item) => {

                                                        return (
                                                            <option value={item.codigoPostal}>{item.codigoPostal}</option>
                                                        )
                                                    })
                                                    }

                                                </select>
                                            </Form.Group>


                                        </Form.Row>}

                                        {dirNueva && <Form.Row style={{ margin: '2px' }}>
                                            <Form.Group as={Col} >
                                                <Form.Control className={hasError("localidad")
                                                    ? "form-control is-invalid"
                                                    : "form-control"}
                                                    onChange={(e) =>{  setLocalidad(e.target.value)}}
                                                    value={localidad}
                                                    disabled={noEnvio} type="text" placeholder="Localidad" />
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Form.Control  className={hasError("provincia")
                                                    ? "form-control is-invalid"
                                                    : "form-control"}
                                                    onChange={(e) =>{  setProvincia(e.target.value)}}
                                                     disabled={noEnvio} type="text" placeholder="Provincia" value={provincia} />
                                            </Form.Group>
                                        </Form.Row>}

                                        <Form.Row style={{ margin: '2px' }}>
                                            <Form.Group as={Col} >
                                                <Button disabled={noEnvio} variant="info" onClick={calcularEnvio} >Calcular Envio</Button>
                                                <label show={noEnvio} class="font-weight-bold" style={{ margin: '10px' }}>Costo de envío: $  {costoenvio}</label>

                                            </Form.Group>
                                        </Form.Row>

                                    </div>}


                                        {!noRetiro && <div className="card horizontal">
                                            <label className="font-weight-bold" style={{ margin: '10px' }}>Retirar por sucursal:</label>

                                            <Form.Row style={{ margin: '15px' }}>
                                                <Form.Group as={Col}  >

                                                    <label style={{ margin: '10px' }} className="text-dark">Elegir sucursal más cercana:</label>
                                                    <select disabled={noRetiro} placeholder="Sucursales" className="form-control" >
                                                        <option >Sucursal 1</option>
                                                        <option >Sucursal 2</option>
                                                        <option>Sucursal 3</option>
                                                    </select>
                                                </Form.Group>


                                            </Form.Row>
                                            <Form.Row style={{ margin: '15px' }}>
                                                {/*<label  style={{ margin: '10px' }} className="text-dark">Elegir sucursal del mapa:</label>*/}
                                                {/*
                                                <Form.Group disabled={noRetiro} as={Col} >
                                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3284.1316028454944!2d-58.54251486611325!3d-34.60083354592867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1604874798531!5m2!1ses!2sar" ></iframe>
                                                </Form.Group>
                                               
                                    estilos de google maps:style={{width="200" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"}}
                                    <div id="map-container-google-1" className="z-depth-1-half map-container" style="height: 20px">
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
                                                            <Form.Check type="radio" inline label="Tarjeta de Débito" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={tarjDeb} onChange={handleTD} />
                                                            <Form.Check type="radio" inline label="Tarjeta de Crédito" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={tarjCred} onChange={handleTC} />
                                                            <Form.Check type="radio" inline label="Mercado Pago" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" checked={mercadoPago} onChange={handleMC} />
                                                        </div>
                                                    ))}

                                                    {(tarjDeb || tarjCred) && <div className="container" style={{ backgroundColor: '#eceef0', width: 'auto' }}>
                                                        <Form.Row style={{ margin: '15px' }}><Button variant="info" onClick={buscarTarjetas} >{btnTarjetas}</Button>  </Form.Row>
                                                        {!tarNueva && <Form.Group as={Col}>
                                                            <select required onChange={(e) => setIdTarjeta(e.target.value)} value={idTarjeta} className="form-control" >
                                                                <option value="" >Tarjetas guardadas</option>
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
                                                                    <Form.Control type="text" placeholder="Número" maxLength={16} value={nroTarjeta}
                                                                    className={hasError("nrotarjeta")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}
                                                                    onChange={(e) =>{  setNroTarjeta(e.target.value)}} />
                                                                </Form.Group>

                                                                <Form.Group as={Col} >
                                                                    <Form.Control type="text" placeholder="Titular" 
                                                                    className={hasError("titulartarjeta")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}
                                                                    onChange={(e) =>{  setTitular(e.target.value)}}
                                                                     value={titular} />
                                                                </Form.Group>
                                                            </Form.Row>}
                                                        {tarNueva &&
                                                            <Form.Row style={{ margin: '10px' }}>
                                                                <Form.Group as={Col} >
                                                                    <Form.Control type="text" placeholder="Fec vto" maxLength={5} 
                                                                    className={hasError("vtotarjeta")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}
                                                                    onChange={(e) =>{  setFechaVto(e.target.value)}}
                                                                     value={fechaVto} />
                                                                </Form.Group>

                                                                <Form.Group as={Col} >
                                                                    <Form.Control type="text" placeholder="Código" maxLength={3} value={codTar} onChange={e => setCodTar(e.target.value)}
                                                                    className={hasError("codtarjeta")
                                                                    ? "form-control is-invalid"
                                                                    : "form-control"}/>
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
                                                        <img src={item.producto.pathImagen} alt={item.producto.nombre} style={
                                                            { 'width': '130px', 'height': '130px', 'margin': '10px' }
                                                        } />
                                                    </div>

                                                    <div className="text">
                                                        <div className="flex-row justify-between">
                                                            <h3>{item.producto.nombre}</h3>
                                                            <h3>$ {item.producto.precio}</h3>

                                                           
                                                        </div>
                                                        <div className="flex-row justify-between">
                                                            <div className="col-descripcion">
                                                                Código {item.id}
                                                            </div>
                                                            <div>
                                                                <Form onSubmit={preventSubmit}>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} md="4">
                                                                            <Form.Control type="number" min="0" value={item.quantity} readOnly />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Form>
                                                            </div>
                                                        </div>

                                                        <div className="col-descripcion">
                                                            SUBTOTAL        ${item.producto.precio * item.quantity}
                                                        </div>


                                                    </div>
                                                </div>
                                            );
                                        })
                                        }


                                        <h3 className="col-descripcion" style={{ margin: '10px' }}>

                                            TOTAL                                $ {calcTotal()}
                                        </h3>



                                        <Form.Row style={{ margin: '15px' }}>
                                            <Form.Group as={Col} >
                                                <Button variant="info" onClick={Cancelar}>Cancelar</Button>
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Button variant="info" type="submit" disabled={errors.length > 1 || !carrito.length}>Confirmar</Button>
                                            </Form.Group>
                                        </Form.Row>


                                </ul>

                            </div>

                        </Form>
                    </ul>
                </div>


            </div>
        </div>

    )



}