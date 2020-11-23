import React from 'react';
import { useDispatch } from 'react-redux';
import { seeAdmProduct, showAddProduct } from '../redux/ducks/adm-producto.duck';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { AdmProductoDetalle, AdmProductoNuevo } from '../components/organisms'; 

export function AdmProductos () {

    const productos = [
        {
            id: 1344,
            titulo: 'Lentes RayBan X455',
            detalle: 'Lentes con armazón metálicos y cristal orgánico RayBan',
            precio: 4633,
            cantidadStock: 2,
            puntoReposicion: 3,
            estado: 'activo'
        }, {
            id: 1346,
            titulo: 'Lentes RayBan X455',
            detalle: 'Lentes con armazón metálicos y cristal orgánico RayBan',
            precio: 4633,
            cantidadStock: 2,
            puntoReposicion: 1,
            estado: 'activo'
        }, 
    ];


    const [modalAddShow, setModalAddShow] = React.useState(false);
    const [modalEditShow, setModalEditShow] = React.useState(false);
    const dispatch = useDispatch();

    function mostrarProducto(producto) {
        dispatch(seeAdmProduct(producto));
        setModalEditShow(true);
    }

    function agregarProducto() {
        dispatch(showAddProduct());
        setModalAddShow(true);
    }

    return (
        <>
            <Container>
                <div className="seccion">
                    <div>Productos</div>
                    <Button variant="info" onClick={() => agregarProducto()}>+</Button>
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
                                        <td className={
                                            producto.puntoReposicion <= producto.cantidadStock ? 'danger' : ''
                                        }>
                                            {producto.cantidadStock}
                                        </td>
                                        <td>{producto.estado}</td>
                                        <td><Button  onClick={() => mostrarProducto(producto) }>Ver</Button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <AdmProductoDetalle
                show={modalEditShow}
                onHide={() => setModalEditShow(false)}
            />

            <AdmProductoNuevo
                show={modalAddShow}
                onHide={() => setModalAddShow(false)}
            />
        </>
    );
}