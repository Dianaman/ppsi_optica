import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { addToCart, setExtra } from '../../redux/ducks/carrito.duck';
import { ImageUploader } from './images/ImageUploader';
import { clearImages } from '../../redux/ducks/files.duck';
import { setModalOpen } from '../../redux/ducks/common.duck';
import { Multiselect } from 'multiselect-react-dropdown';

export function ProductoDetalle(props) {
  let carrito, prodEnCarrito, cantidad = 1;

  const app = useSelector(state => state);
  const productoMostrado = app.categoriaReducer.productoMostrado;
  const extras = app.carritoReducer.extras;

  carrito = props.carrito;

  prodEnCarrito = carrito?.find(item => item.id === productoMostrado?.idProducto);

  let data = [
    { value: 'multifocales', desc: 'Multifocales' },
    { value: 'antireflex', desc: 'Anti-reflex' },
    { value: 'blueblock', desc: 'Blue-block' }
  ]
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(clearImages());
    dispatch(setExtra([]));

    cantidad = 1;
  }, []);


  const files = app.filesReducer.files;

  const agregarAlCarrito = (event) => {
    let productoAgregar = {};

    if (productoMostrado.categoria !== 3) {
      if (files.length) {
        productoAgregar.filePath = files[0].url;
      }

      if (extras?.find((obj) => obj.value === 'multifocales')) {
        productoAgregar.multifocales = true;
      }
      if (extras?.find((obj) => obj.value === 'antireflex')) {
        productoAgregar.antireflex = true;
      }
      if (extras?.find((obj) => obj.value === 'blueblock')) {
        productoAgregar.blueblock = true;
      }
    }

    dispatch(addToCart(productoMostrado.idProducto, cantidad, productoMostrado, productoAgregar));
    dispatch(setModalOpen(false));

  }

  function changeCantidad(event) {
    cantidad = Number.parseInt(event.target.value, 10);
  }

  function selectChange(selectedList, modifiedItem) {
    dispatch(setExtra(selectedList));
  }

  function mostrarBotonAgregar() {
    if (productoMostrado.stock > 0) {
      return (
        <Form.Group as={Col} md="2">
          <Button variant="info" onClick={() => agregarAlCarrito()}>Agregar</Button>
        </Form.Group>                
      );
    } else {
      return (
        <Form.Group as={Col} md="3">
          <div className="spaced">Producto sin stock</div>
        </Form.Group>
      );
    }
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

          <Form style={{'width':'100%'}}>

               {productoMostrado.idCategoria !== 3 &&
                  <>
                    <Row>
                      <Form.Group as={Col} md="4">
                        <label>Extras</label>
                        <Multiselect multiple 
                        options={data} 
                        onSelect={selectChange} 
                        onRemove={selectChange} 
                        displayValue="desc"/>
                        
                      </Form.Group>

                      <Form.Group as={Col} md="4">
                        <label>Receta</label>
                        <ImageUploader></ImageUploader>
                      </Form.Group>

                    </Row>
                    <hr />
                  </>
                }


              <Row className="flex-row justify-end">
                <Form.Group as={Col} md="4">
                {
                  productoMostrado.idCategoria === 3 &&
                    <div className="flex-row">
                      <Form.Control type="number" defaultValue={cantidad} max={productoMostrado.stock} onChange={changeCantidad} style={{'width':'50px'}}/>
                      <div className="spaced">{productoMostrado.stock} disponibles</div>
                    </div>
                }
                </Form.Group>
                {mostrarBotonAgregar()}   
              </Row>

            </Form>
        </Modal.Footer>
      </Modal>
      }
    </>
  );
}