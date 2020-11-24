import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { fetchGetUsers, fetchGetUser } from '../redux/ducks/users.duck';
import { useSelector, useDispatch } from 'react-redux';
import { AdmUsuarioNuevo } from '../components/organisms';
import { setModalOpen } from '../redux/ducks/common.duck';

export function AdmUsuarios () {

    const [modalAddShow, setModalAddShow] = React.useState(false);

    const app = useSelector(state => state);
    const { usuarios } = app.usuariosReducer;
    const { modalOpen } = app.commonReducer;

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchGetUsers());

        if(!modalOpen) {
            setModalAddShow(false);
        }
    }, [dispatch, modalOpen]);


    function nuevoUsuario() {
        dispatch(setModalOpen(true));
        setModalAddShow(true);
    }

    return (
        <>
            <Container className="mw-900">
                <div className="seccion">
                    <div>Usuarios</div>
                    <Button variant="info" onClick={() => nuevoUsuario()}>+</Button>
                </div>

                <div className="seccion">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Rol</th>
                                <th>Registro</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios && usuarios.map(usuario => {
                                return (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.tipo}</td>
                                        <td>{
                                            new Date(usuario.fechaRegistro).toLocaleDateString()
                                        }</td>
                                        <td>{usuario.estado}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            </Container>

            <AdmUsuarioNuevo
                show={modalAddShow}
                onHide={() => setModalAddShow(false)}
            />
        </>
    );
}