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

    // function getCard(){
    //     var card;
    //     detalles.forEach(detalle => {
    //         card = detalle.numero;
    //     });

    //     if(card != null)
    //         card = card.substr(-4);

    //     return card;
    // }

    function mostrarMontoEnvio() {
        let montoSinEnvio = 0;

        detalles.forEach(detalle => {
            montoSinEnvio += detalle.precioUnitario * detalle.cantidad;
        });

        const montoEnvio = miPedidoMostrado.monto - montoSinEnvio;

        return (
            <span>&nbsp;(${montoEnvio})</span>
        )
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
                        <div>Estado del pedido: {miPedidoMostrado.estadoPedido}</div>
                        {
                             miPedidoMostrado.numTarjeta == null && <div>Tipo de pago: {miPedidoMostrado.tipoPago}</div>
                        }
                        {
                             miPedidoMostrado.numTarjeta != null && <div>Tipo de pago: {miPedidoMostrado.tipoPago}: ********-{miPedidoMostrado.numTarjeta.substr(-4)}</div>
                        }
                        <div>Estado de pago: {miPedidoMostrado.estadoFactura}</div>
                        <div>Monto Total: ${miPedidoMostrado.monto}</div>
                    </p>

                    <hr />
                        <div>Tipo de envío: {miPedidoMostrado.tipoEnvio}
                        {
                            miPedidoMostrado.tipoEnvio === 'Envio a domicilio' && mostrarMontoEnvio()
                        }
                        </div>

                        {
                           miPedidoMostrado.idSucursal &&
                            <div>
                                { miPedidoMostrado.nombreSucursal } - {miPedidoMostrado.direccionSucursal}
                            </div>
                        }

                        {
                            miPedidoMostrado.idDomicilio &&
                            <div>
                                Dirección: {miPedidoMostrado.calleAltura}, {miPedidoMostrado.ciudad}, {miPedidoMostrado.provincia}
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
                                        <img src={detalle.pathImagen} alt={detalle.nombre} style={
                                            {'width': '30px', 'height': '30px'}
                                        }/>
                                    </div>

                                    {/* <div>{detalle.idProducto}</div> */}
                                    <div>{detalle.nombre}</div>
                                    <div>$ {detalle.precioUnitario || 0}</div>
                                    <div> {detalle.cantidad}</div>
                                    <div>$ {(detalle.precioUnitario * detalle.cantidad) || 0}</div>
                                </div>
                            );
                        })
                    }                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {
                        renderBotones(miPedidoMostrado.estadoPedido)
                    }
                </Modal.Footer>
            </Modal>
        }
        </>
    );
}