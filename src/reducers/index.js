import { combineReducers } from 'redux';
import auth from './authReducer';
import fetch from './fetchReducer';
import menu from './menuReducer';
import cart from './cartReducer';

export default combineReducers({
  user: auth,
  fetching: fetch,
  menu,
  cart,
});
