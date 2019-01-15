import { combineReducers } from 'redux';
import auth from './authReducer';
import fetch from './fetchReducer';

export default combineReducers({
  user: auth,
  fetching: fetch,
});
