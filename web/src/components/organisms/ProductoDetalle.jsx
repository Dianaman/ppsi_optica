import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { addToCart } from '../../redux/ducks/carrito.duck';

export function ProductoDetalle(props) {
  let productoMostrado, carrito, cantidad, prodEnCarrito;

  carrito = props.carrito;
  productoMostrado = props.productoMostrado;

  prodEnCarrito = carrito?.find(item => item.id === productoMostrado.idProducto);
  cantidad = prodEnCarrito ? prodEnCarrito.quantity : 0;


  const dispatch = useDispatch();


  const handleChange = (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    cantidad = nuevaCantidad;

    dispatch(addToCart(productoMostrado.idProducto, nuevaCantidad, productoMostrado, {}));
  }

  const preventSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      {productoMostrado && <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Image src={productoMostrado.pathImagen} alt={productoMostrado.nombre} fluid/>
        </Modal.Header>
        <Modal.Body>
          <h4>{productoMostrado.nombre}</h4>
          <p>
            {productoMostrado.descripcion}
          </p>
          <p>
            $ {productoMostrado.precio}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={preventSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Control type="number" min="0" defaultValue={cantidad} onChange={handleChange}/>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Footer>
      </Modal>
      }
    </>
  );
}