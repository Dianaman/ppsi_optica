import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { addToCart } from '../../redux/ducks/carrito.duck';

export function ProductoDetalle(props) {
  const app = useSelector(state => state);
  const { producto } = app.catalogoReducer;
  const { carrito } = app.carritoReducer;

  const prodEnCarrito = carrito.find(item => item.id === producto.id);
  let cantidad = prodEnCarrito ? prodEnCarrito.quantity : 0;

  const dispatch = useDispatch();


  const handleChange = (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    cantidad = nuevaCantidad;

    dispatch(addToCart(producto.id, nuevaCantidad, {}));
  }

  const preventSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <>
      {producto && <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Image src={producto.foto} alt={producto.titulo} fluid/>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={preventSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Control type="number" min="0" value={cantidad} onChange={handleChange}/>
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Footer>
      </Modal>
      }
    </>
  );
}