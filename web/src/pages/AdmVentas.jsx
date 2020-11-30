import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import { fetchGetSales, fetchGetDetails } from '../redux/ducks/venta.duck';
import { AdmVentaDetalle } from '../components/organisms';
import Button from 'react-bootstrap/Button';
import { setModalOpen } from '../redux/ducks/common.duck';

export function AdmVentas () {


    const [modalShow, setModalShow] = React.useState(false);

    const app = useSelector(state => state);
    const { ventas } = app.ventaReducer;
    const { modalOpen } = app.commonReducer;

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchGetSales());
    }, [dispatch]);

    React.useEffect(() => {
        if(!modalOpen) {
            setModalShow(false);
        }
    }, [modalOpen]);

    function mostrarVenta(venta) {
        dispatch(fetchGetDetails(venta));
        dispatch(setModalOpen(true));
        setModalShow(true);
    }

    return (
        <>
            <Container>
                <div className="seccion">
                    <div>Ventas</div>
                </div>


                <div className="seccion">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Monto</th>
                                <th>Ult. Mov.</th>
                                <th>Creación</th>
                                <th>Estado</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventas && ventas.map(venta => {
                                return (
                                    <tr key={venta.idPedido}>
                                        <td>{venta.idPedido}</td>
                                        <td>{venta.idUsuario}</td>
                                        <td>{venta.monto}</td>
                                        <td>{new Date(venta.fechaUltimaActualizacion).toLocaleDateString()}</td>
                                        <td>{new Date(venta.fechaCreacion).toLocaleDateString()}</td>
                                        <td>{venta.estado}</td>
                                        <td><Button variant="info" onClick={() => mostrarVenta(venta)}>Ver</Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>

                
            </Container>


            <AdmVentaDetalle
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}