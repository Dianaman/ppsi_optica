import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import carritoIcon from '../assets/icons/shopping_cart.svg';
import { addToCart } from '../redux/ducks/carrito.duck';

export function Carrito() {
    const dispatch = useDispatch();


    let subtotal = 0;

    const productos =  [
        {
            id: 1,
            titulo:  'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4299
        }, 
        {
            id: 2,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4355
        }, 
        {
            id: 3,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4355
        }, 
        {
            id: 4,
            titulo: 'Rayban C494',
            descripcion: 'Antojos Rayban redondos metálicos',
            foto: 'https://d26lpennugtm8s.cloudfront.net/stores/113/564/products/anteojos-de-madera-con-lentes-de-sol-polarizadas-numag-harrison-black-two-tone-roble-foto-perspectiva1-6c63b5d67d91be702715425038276453-1024-1024.jpg',
            precio: 4355
        }
    ];

    const app = useSelector(state => state);
    const {carrito} = app.carritoReducer;

    const handleChange = (event, item) => {
        const nuevaCantidad = parseInt(event.target.value, 10);
        item.quantity = nuevaCantidad;
    
        dispatch(addToCart(item.id, nuevaCantidad, {}));
    }
    
    const preventSubmit = (event) => {
      event.preventDefault();
    }

    return (
        <div className="container">
            <div className="seccion">
                <div>Carrito</div>
                <img src={carritoIcon} />
            </div>

            <div className="flex-column">

                {carrito && carrito.map((item) => {
                    return (
                    <div className="app-card" key={item.id}>
                        <div className="img"><img src ="" /></div>

                        <div className="text">
                            <div className="flex-row justify-between">
                                <h3>Lentes de sol Rayban</h3>
                                <h3>$4000</h3>
                            </div>
                            <div className="flex-row justify-between">
                                <div className="col-descripcion">
                                    Código KDIGR334
                                </div>
                                <div>
                                    <Form onSubmit={preventSubmit}>
                                        <Form.Row>
                                        <Form.Group as={Col} md="4">
                                            <Form.Control type="number" min="0" value={item.quantity} onChange={handleChange.bind(item)}/>
                                        </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </div>
                            </div>
                            <div>
                                <Button variant="link">Quitar</Button>&nbsp;
                                <Button variant="link">Guardar para después</Button>
                            </div>


                        </div>
                    </div>
                    );
                })
                }
                
            </div>

            <hr />

            <div className="flex-row justify-end margin-x-10px">
                <b className="margin-x-10px">Subtotal</b>
                <b>${subtotal}</b>
            </div>

            <br />
            
            <div className="flex-row justify-between">
                <Button variant="info">Ver más productos</Button>
                <Button variant="info">Comprar</Button>
            </div>
        </div>
    );
}