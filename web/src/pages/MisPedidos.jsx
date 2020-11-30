import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { setModalOpen } from '../redux/ducks/common.duck';
import { fetchGetMyOrders, fetchGetDetails } from '../redux/ducks/my-orders.duck';
import { MiPedidoDetalle } from '../components/organisms';

export function MisPedidos() {


    const [modalShow, setModalShow] = React.useState(false);

    const app = useSelector(state => state);
    const { misPedidos } = app.misPedidosReducer;
    const { modalOpen } = app.commonReducer;

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchGetMyOrders());
    }, [dispatch]);

    React.useEffect(() => {
        if(!modalOpen) {
            setModalShow(false);
        }
    }, [modalOpen]);

    function mostrarPedido(venta) {
        dispatch(fetchGetDetails(venta));
        dispatch(setModalOpen(true));
        setModalShow(true);
    }

    return (
        <>
            <Container>
                <div className="seccion">
                    <div>Mis Pedidos</div>
                </div>


                <div className="seccion">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha de compra</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {misPedidos && misPedidos.map(pedido => {
                                return (
                                    <tr key={pedido.idPedido}>
                                        <td>{pedido.idPedido}</td>
                                        <td>{new Date(pedido.fechaCreacion).toLocaleDateString()}</td>
                                        <td>$ {pedido.monto}</td>
                                        <td>{pedido.estado}</td>
                                        <td><Button variant="info" onClick={() => mostrarPedido(pedido)}>Ver</Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                
            </Container>

            <MiPedidoDetalle
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}