import React from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { ProductoDetalle } from '../components/organisms';

export function Categoria () {
    const { id } = useParams();

    /*
        TODO:
        Traer data del servicio
        Fetch con redux
        Ajustar estilos
    */

    const results =  [
        {
            id: 1,
            titulo:  'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'foto.jpg',
            precio: 4299
        }, 
        {
            id: 2,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'foto.jpg',
            precio: 4355
        }, 
        {
            id: 3,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'foto.jpg',
            precio: 4355
        }, 
        {
            id: 4,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'foto.jpg',
            precio: 4355
        }
    ];

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div>
            {results && results.map((res => {
                return (
                        <Card style={{ width: '18rem' }} onClick={() => setModalShow(true)} key={res.id}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{res.titulo}</Card.Title>
                                <Card.Text>{res.descripcion}</Card.Text>
                                <Card.Title>$ {res.precio}</Card.Title>
                            </Card.Body>
                        </Card>          
                );
            }))}
            
            <ProductoDetalle
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
}
