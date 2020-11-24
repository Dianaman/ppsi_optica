import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetCategories } from '../redux/ducks/categoria.duck';

export const HomeComprador = () => {

    const app = useSelector(state => state);
    const { categorias } = app.categoriaReducer;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetCategories());
    }, [dispatch]);

    return (
        <div className="flex spaced">
            {categorias.map((categoria) => {
                return (
                    <Card key={categoria.idCategoria} className="spaced imagen-horizontal">
                        <Link to={"categoria/" + categoria.idCategoria}>
                        <Card.Img src={categoria.pathImagen} alt={categoria.descripcion} style={{'width': '600px', 'height': '400px'}} className="image-text image" />
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