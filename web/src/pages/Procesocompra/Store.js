import { createStore } from 'redux';
import { combineForms } from 'react-redux-form';

const initialPedido = {
  idusuario: '',
  iddetallepedido: '',
  estado: '',

};

const Store = createStore(combineForms({
  pedido: initialPedido,
}));

export default Store;
      