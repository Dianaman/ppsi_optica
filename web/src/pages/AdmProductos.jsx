import React from 'react';
import { useDispatch } from 'react-redux';
import { verProducto } from '../redux/ducks/catalogo.duck';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export function AdmProductos () {

    const productos = [
        {
            id: 1344,
            descripcion: 'Lentes RayBan X455',
            precio: 4633,
            cantidadStock: 2,
            estado: 'activo'
        }, {
            id: 1346,
            descripcion: 'Lentes RayBan X455',
            precio: 4633,
            cantidadStock: 2,
            estado: 'activo'
        }, 
    ]

    return (
        <Container>
            <div className="seccion">
                <div>Productos</div>
            </div>

            <div className="seccion">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Artículo</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos && productos.map(producto => {
                            return (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.descripcion}</td>
                                    <td>{producto.precio}</td>
                                    <td>{producto.cantidadStock}</td>
                                    <td>{producto.estado}</td>
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