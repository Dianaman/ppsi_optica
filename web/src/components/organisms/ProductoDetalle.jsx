import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { addToCart } from '../../redux/ducks/carrito.duck';

export function ProductoDetalle(props) {
  console.log(props);
  const app = useSelector(state => state);
  let productoMostrado, carrito, cantidad, prodEnCarrito;

  productoMostrado = props.productoMostrado;
  carrito = props.carrito;

  prodEnCarrito = carrito?.find(item => item.id === productoMostrado.idProducto);
  cantidad = prodEnCarrito ? prodEnCarrito.quantity : 0;


  const dispatch = useDispatch();


  const handleChange = (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    cantidad = nuevaCantidad;

    dispatch(addToCart(productoMostrado.idProducto, nuevaCantidad, {}));
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
          <Image src={productoMostrado.foto} alt={productoMostrado.nombre} fluid/>
        </Modal.Header>
        <Modal.Body>
          <h4>{productoMostrado.nombre}</h4>
          <p>
            {productoMostrado.descripcion}
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