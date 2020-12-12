import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changeStateSale } from '../../redux/ducks/venta.duck';


export function AdmVentaDetalle(props) {
    const app = useSelector(state => state);
    const { ventaMostrada, detalles } = app.ventaReducer;
    
    const dispatch = useDispatch();

    const cambiarEstado = (nuevoEstado) => {
        const id = ventaMostrada.idPedido;

        dispatch(changeStateSale(id, nuevoEstado));
    }

    const user = JSON.parse(localStorage.getItem('user'));

    function renderBotones(venta) {

        switch(venta.estado) {
            case 'pendiente':
                return (
                    <>
                        <Button variant="success" onClick={()=>cambiarEstado('aprobado')}>Aprobar</Button>
                        <Button variant="warning" onClick={()=>cambiarEstado('revisando')}>Poner en revisión</Button>
                    </>
                );
            case 'revisando':
                return (
                    <>
                        <Button variant="success" onClick={()=>cambiarEstado('aprobado')}>Aprobar</Button>
                        <Button variant="danger" onClick={()=>cambiarEstado('rechazado')}>Rechazar</Button>
                    </>
                );
            case 'aprobado':
                return (
                    <>
                        {venta.tipoEnvio === 'Envio a domicilio' && <Button variant="success" onClick={()=>cambiarEstado('enviando')}>Enviar</Button>}
                        {venta.tipoEnvio === 'Retiro en sucursal' && <Button variant="success" onClick={()=>cambiarEstado('en sucursal')}>En sucursal</Button>}
                    </>
                );
            case 'en sucursal':
                return (
                    <>
                        <Button variant="success" onClick={()=>cambiarEstado('entregado')}>Entregado</Button>
                    </>
                );
            case 'enviando':
                return (
                    <>
                        <Button variant="success" onClick={()=>cambiarEstado('enviado')}>Finalizar envío</Button>
                    </>
                );
            case 'enviado':
            case 'entregado':
                return (
                    <>
                    {
                        (user.tipo === 'admin' || user.tipo === 'superadmin') && <Button variant="success" onClick={()=>cambiarEstado('cerrado')}>Finalizar venta</Button>
                    }
                    </>
                );
            default:
                return (
                    <></>
                );
        }
    }

    return (
        <>
            { ventaMostrada && <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h4>Pedido #{ventaMostrada.idPedido} - {ventaMostrada.apellido}, {ventaMostrada.nombre}</h4>
                    <p>
                        <div>Fecha de compra: {new Date(ventaMostrada.fechaCreacion).toLocaleDateString()}</div>
                        <div>Email: {ventaMostrada.email} </div>
                        <div>Estado: {ventaMostrada.estado}</div>
                        <div>Última actualización: {new Date(ventaMostrada.fechaUltimaActualizacion).toLocaleDateString()}</div>
                        <div>Estado de pago: {ventaMostrada.estadoFactura} </div>
                        <div>Tipo de pago: {ventaMostrada.tipoPago}</div>
                    </p>

                    <hr />
                        <div>Tipo de envío: {ventaMostrada.tipoEnvio}</div>

                        {
                            ventaMostrada.idDomicilio &&
                            <div>
                                
                            </div>
                        }

                    <hr />

                    <div className="flex-column">
                    {
                        detalles && detalles.map(detalle => {
                            return (
                                <div className="flex-row justify-between align-items-center"
                                    key={detalle.idDetallePedido}>
                                    <div className="img">
                                        <img src={detalle.pathImagen} style={
                                            {'width': '30px', 'height': '30px'}
                                        }/>
                                    </div>

                                    <div>{detalle.idProducto}</div>
                                    <div>{detalle.nombre}</div>
                                    <div>$ {detalle.precioUnitario || 0}</div>
                                    <div> {detalle.cantidad}</div>
                                    <div>$ {detalle.precioTotal || 0}</div>
                                </div>
                            );
                        })
                    }                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        renderBotones(ventaMostrada)
                    }
                </Modal.Footer>
            </Modal>
        }
        </>
    );
}