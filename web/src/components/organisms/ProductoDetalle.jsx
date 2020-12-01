import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { addToCart } from '../../redux/ducks/carrito.duck';
import { ImageUploader } from './images/ImageUploader';
import { Control, Form } from 'react-redux-form';
import { clearImages } from '../../redux/ducks/files.duck';
import { Form as Fr } from 'react-bootstrap';
import { setModalOpen } from '../../redux/ducks/common.duck';

export function ProductoDetalle(props) {
  let carrito, prodEnCarrito, cantidad = 1;

  const app = useSelector(state => state);
  const productoMostrado = app.categoriaReducer.productoMostrado;

  carrito = props.carrito;

  prodEnCarrito = carrito?.find(item => item.id === productoMostrado?.idProducto);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(clearImages());
    cantidad = 1;
  }, []);


  const files = app.filesReducer.files;

  const agregarAlCarrito = (event) => {
    let productoAgregar = {};

    if (productoMostrado.categoria !== 3) {
      if (files.length) {
        productoAgregar.filePath = files[0].url;
      }
      if (app.item.extras.indexOf('multifocales') > -1) {
        productoAgregar.multifocales = true;
      }
      if (app.item.extras.indexOf('antireflex') > -1) {
        productoAgregar.antireflex = true;
      }
      if (app.item.extras.indexOf('blueblock') > -1) {
        productoAgregar.blueblock = true;
      }
    }

    dispatch(addToCart(productoMostrado.idProducto, cantidad, productoMostrado, productoAgregar));
    dispatch(setModalOpen(false));
  }

  function changeCantidad(event) {
    cantidad = Number.parseInt(event.target.value, 10);
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
            Marca: {productoMostrado.marca}
          </p>
          <p>
            Modelo: {productoMostrado.modelo}
          </p>
          <p>
            $ {productoMostrado.precio}
          </p>
        </Modal.Body>
        <Modal.Footer>

          <Form style={{'width':'100%'}}
            model="form.item"
            onSubmit={() => agregarAlCarrito()}
            >

               {productoMostrado.idCategoria !== 3 &&
                  <>
                    <Row>
                      <Col md="4" className="spaced">
                        <Control.select multiple={true} model="form.item.extras" id="form.item.extras">
                          <option value="multifocales">Multifocales</option>
                          <option value="antireflex">Anti-reflex</option>
                          <option value="blueblock">Blue-block</option>
                        </Control.select>
                      </Col>

                      <Col md="4">
                        <ImageUploader></ImageUploader>
                      </Col>

                    </Row>
                    <hr />
                  </>
                }


              <Row className="flex-row justify-end">
                <Col md="2">
                {
                  productoMostrado.idCategoria === 3 &&
                    <Fr.Control type="number" defaultValue={cantidad} onChange={changeCantidad} style={{'width':'50px'}}/>
                  
                }
                </Col>
                <Col md="2">
                  <Button variant="info" type="submit">Agregar</Button>
                </Col>                
              </Row>

            </Form>
        </Modal.Footer>
      </Modal>
      }
    </>
  );
}