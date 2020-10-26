import React from 'react';
import { useSelector } from 'react-redux';
import { IconNumber } from '../atoms';
import icono from '../../assets/icons/shopping_cart.svg';

export function CarritoIcono() {
    const app = useSelector(state => state);
    const {carrito} = app.carritoReducer;
    
    return (
        <IconNumber icon={icono} number={carrito.length}/>
    );
}