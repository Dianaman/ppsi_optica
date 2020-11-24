import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { ProductoDetalle } from '../components/organisms';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetProductsCategory, showProduct } from '../redux/ducks/categoria.duck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function Categoria () {
    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch();


    const app = useSelector(state => state);
    const { productosEnCategoria, productoMostrado } = app.categoriaReducer;
    const { carrito } = app.carritoReducer;


    useEffect(() => {
        dispatch(fetchGetProductsCategory(id));
    }, [dispatch]);


    function mostrarProducto(producto) {
        dispatch(showProduct(producto));
        setModalShow(true);
    }


    return (
        <>
            <Container className="spaced">
                <Row className="margin-y-10px">
                    <Col>
                        <CardDeck>
                        {
                            productosEnCategoria && productosEnCategoria.map(prod => {


                                return (
                                    <Card style={{ width: '18rem' }} onClick={() => mostrarProducto(prod) } key={prod.idProducto}>
                                        <Card.Img variant="top" src={prod.pathImagen} />
                                        <Card.Body>
                                            <Card.Title>{prod.nombre}</Card.Title>
                                            <Card.Text>{prod.descripcion}</Card.Text>
                                            <Card.Title>$ {prod.precio}</Card.Title>
                                        </Card.Body>
                                    </Card>                        
                                );
                            })
                        }

                        </CardDeck>
                    </Col>
                </Row>
            </Container>
            

            <ProductoDetalle
                show={modalShow}
                onHide={() => setModalShow(false)}
                productoMostrado={productoMostrado}
                carrito={carrito}
            />
        </>
    );
}
