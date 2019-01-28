import { combineReducers } from 'redux';
import auth from './authReducer';
import fetch from './fetchReducer';
import menu from './menuReducer';
import cart from './cartReducer';
import orders from './ordersReducer';

export default combineReducers({
  user: auth,
  fetching: fetch,
  menu,
  cart,
  orders,
});
