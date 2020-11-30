import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { changeStateMyOrder } from '../../redux/ducks/my-orders.duck';

export function MiPedidoDetalle(props) {
    const app = useSelector(state => state);
    const { miPedidoMostrado, detalles } = app.misPedidosReducer;
    
    const dispatch = useDispatch();

    const cambiarEstado = (nuevoEstado) => {
        const id = miPedidoMostrado.idPedido;

        dispatch(changeStateMyOrder(id, nuevoEstado));
    }

    const user = JSON.parse(localStorage.getItem('user'));

    function renderBotones(estado) {

        switch(estado) {
            case 'pendiente':
                return (
                    <>
                        <Button variant="danger" onClick={()=>cambiarEstado('cancelado')}>Cancelar pedido</Button>
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
            { miPedidoMostrado && <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h4>Pedido #{miPedidoMostrado.idPedido}</h4>
                    <p>
                        <div>Fecha de compra: {new Date(miPedidoMostrado.fechaCreacion).toLocaleDateString()}</div>
                        <div>Estado: {miPedidoMostrado.estado}</div>
                        <div>Última actualización: {new Date(miPedidoMostrado.fechaUltimaActualizacion).toLocaleDateString()}</div>
                        <div>Estado de pago: {miPedidoMostrado.estadoFactura} </div>
                        <div>Tipo de pago: {miPedidoMostrado.tipoPago}</div>
                    </p>

                    <hr />
                        <div>Tipo de envío: {miPedidoMostrado.tipoEnvio}</div>

                        {
                            miPedidoMostrado.idDomicilio &&
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
                        renderBotones(miPedidoMostrado.estado)
                    }
                </Modal.Footer>
            </Modal>
        }
        </>
    );
}