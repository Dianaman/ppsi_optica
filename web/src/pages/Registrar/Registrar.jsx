import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Registrar.css';

import {Button, Form, Container, Row, Col } from 'react-bootstrap'

export default function Registrar () {

    return (
        <div className="login-page">
            <Container>
                <div className="form">
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formName">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Juan" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formSurname">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" placeholder="Perez" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formUser">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control type="text" placeholder="juanp" />
                                </Form.Group>                        
                            </Col>
                            <Col>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Mail</Form.Label>
                                    <Form.Control type="email" placeholder="ejemplo@email.com" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="contraseña" />
                                </Form.Group>                    
                            </Col>
                            <Col>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="contraseña" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formState">
                                    <Form.Label>Provincia</Form.Label>
                                    <Form.Control type="text" placeholder="Buenos Aires" />
                                </Form.Group>                    
                            </Col>
                            <Col>
                                <Form.Group controlId="formCity">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Control type="text" placeholder="Capital Federal" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control type="text" placeholder="Corrientes 1800" />
                        </Form.Group>
                        <Form.Group controlId="formFloot">
                            <Form.Label>Piso/Dpto</Form.Label>
                            <Form.Control type="text" placeholder="5A" />
                        </Form.Group>
                        <Form.Group controlId="formPostal">
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control type="text" placeholder="1832" />
                        </Form.Group>
                        <Form.Group controlId="formCel">
                            <Form.Label>Celular</Form.Label>
                            <Form.Control type="text" placeholder="1527848899" />
                        </Form.Group>
                        <Button variant="secondary" type="submit">Registrarme</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
};