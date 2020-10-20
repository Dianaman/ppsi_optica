import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const HomeComprador = () => {

    const categorias = [
        {
            id: 1,
            descripcion: 'Anteojos',
            foto: 'https://image.freepik.com/foto-gratis/hombre-guapo-hipster-gafas-sol-moda-chaqueta-jeans_149155-2150.jpg'
        },
        {
            id: 2,
            descripcion: 'Lentes de sol',
            foto: 'https://image.freepik.com/foto-gratis/hombre-guapo-hipster-gafas-sol-moda-chaqueta-jeans_149155-2150.jpg'
        },
        {
            id: 3,
            descripcion: 'Otros lentes',
            foto: 'https://image.freepik.com/foto-gratis/hombre-guapo-hipster-gafas-sol-moda-chaqueta-jeans_149155-2150.jpg'
        },
        {
            id: 4,
            descripcion: 'Otros',
            foto: 'https://image.freepik.com/foto-gratis/hombre-guapo-hipster-gafas-sol-moda-chaqueta-jeans_149155-2150.jpg'
        }
    ];
    
    return (
        <div className="flex spaced">
            {categorias.map((categoria) => {
                return (
                    <Card key={categoria.id} className="spaced imagen-horizontal">
                        <Link to={"categoria/" + categoria.id}>
                        <Card.Img src={categoria.foto} alt={categoria.descripcion} style={{'width': '600px', 'height': '400px'}} className="image-text image" />
                        <Card.ImgOverlay>
                            <Card.Title className="image-text text">{categoria.descripcion}</Card.Title>
                        </Card.ImgOverlay>
                        </Link>
                    </Card>
                );
            })}                    
        </div>
    );
};