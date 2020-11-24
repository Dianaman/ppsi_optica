import { createStore } from 'redux';
import { combineForms } from 'react-redux-form';

const initialUser = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
  password: '',
  tipo: 'cliente',
  estado: 'pendiente'
};

const Store = createStore(combineForms({
  user: initialUser,
}));

export default Store;
      