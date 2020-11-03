import React from 'react';
import { useDispatch } from 'react-redux';
import { verProducto } from '../redux/ducks/catalogo.duck';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export function AdmVentas () {

    const ventas = [
        {
            id: 1344,
            email: 'lalala@comprador.com',
            monto: 4633,
            ultimaActualizacion: '16/03/20',
            estado: 'pendiente'
        }, {
            id: 1345,
            email: 'lalala@comprador.com',
            monto: 4633,
            ultimaActualizacion: '16/03/20',
            estado: 'pendiente'
        }, 
    ]

    return (
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
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas && ventas.map(venta => {
                            return (
                                <tr key={venta.id}>
                                    <td>{venta.id}</td>
                                    <td>{venta.email}</td>
                                    <td>{venta.monto}</td>
                                    <td>{venta.ultimaActualizacion}</td>
                                    <td>{venta.estado}</td>
                                    <td>Ver</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            
        </Container>
    );
}