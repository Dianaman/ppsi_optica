import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { ImageText } from '../components/atoms';
import { Link } from 'react-router-dom';

export const HomeComprador = () => {

    const categorias = [
        {
            id: 1,
            descripcion: 'Anteojos',
            foto: 'lentes.jpg'
        },
        {
            id: 2,
            descripcion: 'Lentes de sol',
            foto: 'lentes.jpg'
        },
        {
            id: 3,
            descripcion: 'Otros lentes',
            foto: 'lentes.jpg'
        },
        {
            id: 4,
            descripcion: 'Otros',
            foto: 'lentes.jpg'
        }
    ]
    
    return (
        <Container>
            <Row>
                <Col>
                    <ListGroup horizontal="xl" className="my-2">
                        {categorias.map((categoria) => {
                            return (
                                <ListGroup.Item key={categoria.id}>
                                    <Link to={"categoria/" + categoria.id}>
                                        <ImageText image={categoria.foto} text={categoria.descripcion}></ImageText>
                                    </Link>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};