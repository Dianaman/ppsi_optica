import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { ProductoDetalle } from '../components/organisms';
import { useDispatch, useSelector } from 'react-redux';
import { verProducto } from '../redux/ducks/catalogo.duck';

import { fetchGetProductsCategory } from '../redux/ducks/categoria.duck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function Categoria () {
    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch();


    const app = useSelector(state => state);
    const { productosEnCategoria } = app.categoriaReducer;


    useEffect(() => {
        dispatch(fetchGetProductsCategory(id));
    }, [dispatch]);


    function mostrarProducto(producto) {
        dispatch(verProducto(producto));
        setModalShow(true);
    }


    return (
        <>
            <Container className="spaced">
                <Row>
                    <Col>
                        <CardDeck>
                        {
                            productosEnCategoria && productosEnCategoria.map(res => {


                                return (
                                    <Card style={{ width: '18rem' }} onClick={() => mostrarProducto(res) } key={res.id}>
                                        <Card.Img variant="top" src={res.foto} />
                                        <Card.Body>
                                            <Card.Title>{res.nombre}</Card.Title>
                                            <Card.Text>{res.descripcion}</Card.Text>
                                            <Card.Title>$ {res.precio}</Card.Title>
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
            />
        </>
    );
}
