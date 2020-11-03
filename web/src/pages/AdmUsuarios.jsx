import React from 'react';
import { useDispatch } from 'react-redux';
import { verProducto } from '../redux/ducks/catalogo.duck';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

export function AdmUsuarios () {

    const usuarios = [
        {
            id: 1344,
            email: 'lalala@comprador.com',
            nombre: 'Ricardo',
            apellido: 'Ruben',
            rol: 'Comprador',
            fechaRegistro: '16/03/20',
            estado: 'pendiente'
        }, {
            id: 1344,
            email: 'lalala@comprador.com',
            nombre: 'Tito',
            apellido: 'Salva',
            rol: 'Vendedor',
            fechaRegistro: '16/03/20',
            estado: 'pendiente'
        }, 
    ]

    return (
        <Container>
            <div className="seccion">
                <div>Usuarios</div>
            </div>

            <div className="seccion">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Rol</th>
                            <th>Registro</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios && usuarios.map(usuario => {
                            return (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.nombre}</td>
                                    <td>{usuario.apellido}</td>
                                    <td>{usuario.rol}</td>
                                    <td>{usuario.fechaRegistro}</td>
                                    <td>{usuario.estado}</td>
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