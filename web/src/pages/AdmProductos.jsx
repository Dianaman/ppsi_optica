import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { seeAdmProduct, showAddProduct, fetchGetProducts } from '../redux/ducks/adm-producto.duck';
import { fetchGetCategories } from '../redux/ducks/categoria.duck';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { AdmProductoDetalle, AdmProductoNuevo } from '../components/organisms'; 
import { useEffect } from 'react';
import { setModalOpen } from '../redux/ducks/common.duck';

export function AdmProductos () {

    const app = useSelector(state => state);
    const { productos } = app.admProductoReducer;
    const { modalOpen } = app.commonReducer;

    const [modalAddShow, setModalAddShow] = React.useState(false);
    const [modalEditShow, setModalEditShow] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetCategories());
        dispatch(fetchGetProducts());

        if(!modalOpen) {
            setModalEditShow(false);
            setModalAddShow(false);
        }
    }, [dispatch, modalOpen]);


    function mostrarProducto(producto) {
        dispatch(seeAdmProduct(producto));
        dispatch(setModalOpen(true));
        setModalEditShow(true);
    }

    function agregarProducto() {
        dispatch(showAddProduct());
        dispatch(setModalOpen(true));
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
                                    <tr key={producto.idProducto}>
                                        <td>{producto.idProducto}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.precio}</td>
                                        <td className={
                                            producto.puntoDeReposicion >= producto.stock ? 'danger' : ''
                                        }>
                                            {producto.stock}
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