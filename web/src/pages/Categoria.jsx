import React from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { ProductoDetalle } from '../components/organisms';
import { useDispatch } from 'react-redux';
import { verProducto } from '../redux/ducks/catalogo.duck';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function Categoria () {
    const { id } = useParams();
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch();

    /*
        TODO:
        Traer data del servicio
        Fetch con redux
    */

    const results =  [
        {
            id: 1,
            titulo:  'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4299, x: 13, y: 34, width: 200, height: 200
        }, 
        {
            id: 2,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4355, x: 13, y: 34, width: 200, height: 200
        }, 
        {
            id: 3,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4355, x: 13, y: 34, width: 200, height: 200
        }, 
        {
            id: 4,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4355, x: 13, y: 34, width: 200, height: 200
        }
    ];


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
                            results.map(res => {


                                return (
                                    <Card style={{ width: '18rem' }} onClick={() => mostrarProducto(res) } key={res.id}>
                                        <Card.Img variant="top" src={res.foto} />
                                        <Card.Body>
                                            <Card.Title>{res.titulo}</Card.Title>
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
