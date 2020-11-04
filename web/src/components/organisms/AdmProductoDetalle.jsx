import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { modificarPrecio } from '../../redux/ducks/adm-producto.duck';

export function AdmProductoDetalle(props) {
    const app = useSelector(state => state);
    const { productoParaVer } = app.admProductoReducer;
    
    const dispatch = useDispatch();

    const preventSubmit = (event) => {
        event.preventDefault();
    }



    let modificandoPrecio = false;
    let precio = productoParaVer.precio;


    function Precio() {
        return (
            <div className="flex-row align-items-center">
                <div>Precio: <b>$ {precio}</b></div>
                <Button className="margin-x-10px" onClick={() => verEdicionPrecio() }>Modificar precio</Button>
                
            </div>
        );
    }

    function verEdicionPrecio() {
        modificandoPrecio = true;
    }

    function EdicionPrecio() {
        return (
            <div className="flex-row align-items-center">
                <div>Precio: $</div> 
                <Form onSubmit={preventSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="4">
                        <Form.Control type="number" min="0" value={precio} onChange={changePrecio}/>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>

        );
    }

  const changePrecio = (event) => {
    const nuevPrecio = parseInt(event.target.value, 10);
    precio = nuevPrecio;

    dispatch(modificarPrecio(productoParaVer.id, nuevPrecio));
    modificandoPrecio = false;
  }

  return (
    <>
        { productoParaVer && <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
          <Image src={productoParaVer.foto} alt={productoParaVer.titulo} fluid/>
        </Modal.Header>
        <Modal.Body>
            <h4>{productoParaVer.titulo}</h4>
            <p>
                {productoParaVer.detalle}
            </p>

            <hr />

            <div className="flex-row align-items-center">
                <div>Cantidad en stock: &nbsp;
                    <b className={productoParaVer.puntoReposicion <= productoParaVer.cantidadStock  ? 'danger' : ''}>
                        {productoParaVer.cantidadStock}
                    </b>
                </div>
                {productoParaVer.puntoReposicion <= productoParaVer.cantidadStock  &&
                    <Button className="margin-x-10px">Reponer stock</Button>
                }
            </div>
            {modificandoPrecio ? <EdicionPrecio /> : <Precio /> }
        
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
      }
    </>
  );
}