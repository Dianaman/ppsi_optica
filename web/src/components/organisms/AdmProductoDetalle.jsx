import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { editPrice, switchEditingPrice, restock, switchEditingStock } from '../../redux/ducks/adm-producto.duck';
import { Form, Control } from 'react-redux-form';


export function AdmProductoDetalle(props) {
    const app = useSelector(state => state);
    const { productoParaVer, modificandoPrecio, modificandoStock } = app.admProductoReducer;

    
    const dispatch = useDispatch();


    function verEdicionPrecio(ver) {
        dispatch(switchEditingPrice(ver));
    }

    function Precio() {
        return (
            <div className="flex-row align-items-center">
                <div>Precio: <b>$ {productoParaVer.precio}</b></div>
                <Button className="margin-x-10px" onClick={() => verEdicionPrecio(true) }>Modificar precio</Button>
            </div>
        );
    }

    const changePrecio = () => {
        const nuevoPrecio = parseInt(app.prod.precio, 10);

        dispatch(editPrice(productoParaVer.idProducto, nuevoPrecio));
        verEdicionPrecio(false);
    }

    function Stock() {
        return (
            <div className="flex-row align-items-center">
                <div>Cantidad en stock: &nbsp;
                    <b className={productoParaVer.puntoDeReposicion >= productoParaVer.stock  ? 'danger' : ''}>
                        {productoParaVer.stock}
                    </b>
                </div>
                
                <Button className="margin-x-10px" onClick={() => verReponerStock(true)}>Cambiar stock</Button>
            </div>
        );
    }

    function verReponerStock(ver) {
        dispatch(switchEditingStock(ver));
    }

    const reponerStock = () => {
        const id = productoParaVer.idProducto;
        const nuevoStock = parseInt(app.prod.stock, 10);

        dispatch(restock(id, nuevoStock));
        verReponerStock(false);
    }

    return (
        <>
            { productoParaVer && <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                <Image src={productoParaVer.pathImagen} alt={productoParaVer.nombre} fluid/>
                </Modal.Header>
                <Modal.Body>
                    <h4>{productoParaVer.nombre}</h4>
                    <p>
                        {productoParaVer.descripcion}
                    </p>

                    <hr />

                    {
                        modificandoStock
                        ?
                        <div>
                            <Form model="form.prod" onSubmit={() => reponerStock()}>
                                <label htmlFor="form.prod.stock">Stock ({productoParaVer.stock} en stock, recomendado {productoParaVer.stockMaximo}):&nbsp;</label>
                                <Control.text model="form.prod.stock" id="form.prod.stock" />


                                <Button variant="success" className="margin-x-10px" type="submit">Cambiar</Button>
                                <Button variant="danger" className="margin-x-10px" onClick={()=> verReponerStock(false)}>Cancelar</Button>
                            </Form>
                        </div>
                        :
                        <Stock />
                    }
                    {
                        modificandoPrecio 
                        ? 
                        <div className="flex-row align-items-center">
                            <Form model="form.prod" onSubmit={() => changePrecio()}>
                                <label htmlFor="form.prod.precio">Precio (${productoParaVer.precio} actualmente): $&nbsp;</label>
                                <Control.text model="form.prod.precio" id="form.prod.precio" />


                                <Button variant="success" className="margin-x-10px" type="submit">Cambiar</Button>
                                <Button variant="danger" className="margin-x-10px" onClick={()=> verEdicionPrecio(false)}>Cancelar</Button>
                            </Form>
                        </div>
                        :
                        <Precio />
                    }
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        }
        </>
    );
}