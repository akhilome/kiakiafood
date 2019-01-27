import omit from 'lodash.omit';
import { toast } from 'react-toastify';

import axios from '../services/axios';
import types from './types';
import { saveToken, getToken } from '../utils/localStorage';
import jwt from '../utils/jwt';

export const startFetching = () => ({ type: types.START_FETCHING });
export const stopFetching = (fetchSuccess = true, message = '') => ({
  type: types.STOP_FETCHING,
  payload: {
    error: !fetchSuccess,
    message,
  },
});

export const signUpUser = userData => async (dispatch) => {
  dispatch(startFetching());
  try {
    const { status, user } = (await axios.post('/auth/signup', userData)).data;
    if (status === 'success') saveToken(user.auth_token);
    const { userName: name, userStatus: role } = jwt.decode(user.auth_token);
    dispatch({
      type: types.SIGN_UP,
      payload: {
        name,
        role,
      },
    });
    return dispatch(stopFetching());
  } catch (error) {
    toast.error(error.response ? error.response.data.message : 'something went wrong');
    return dispatch(
      stopFetching(false, error.response ? error.response.data.message : 'something went wrong'),
    );
  }
};

export const logInUser = userData => async (dispatch) => {
  dispatch(startFetching());
  try {
    const { status, user } = (await axios.post('/auth/login', userData)).data;
    if (status === 'success') saveToken(user.auth_token);
    const { userName: name, userStatus: role } = jwt.decode(user.auth_token);
    dispatch({
      type: types.LOG_IN,
      payload: {
        name,
        role,
      },
    });
    return dispatch(stopFetching());
  } catch (error) {
    toast.error(error.response ? error.response.data.message : 'something went wrong');
    return dispatch(
      stopFetching(false, error.response ? error.response.data.message : 'something went wrong'),
    );
  }
};

export const checkAuthStatus = () => {
  try {
    const { userName: name, userStatus: role } = jwt.decode(getToken());
    return {
      type: types.CHECK_AUTH_STATUS,
      payload: { name, role },
    };
  } catch (error) {
    return { type: types.CHECK_AUTH_STATUS_FAIL };
  }
};

export const getMenu = () => async (dispatch) => {
  dispatch(startFetching());
  try {
    const { menu } = (await axios.get('/menu')).data;
    dispatch({
      type: types.GET_MENU,
      payload: { menu },
    });
    return dispatch(stopFetching());
  } catch (error) {
    return dispatch(
      stopFetching(false, error.response ? error.response.data.message : 'something went wrong'),
    );
  }
};

export const addToCart = ({ foodId, foodName, foodPrice }) => {
  const foodDetails = { [foodId]: { foodName, foodPrice } };
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  if (!Object.keys(cart).includes(`${foodId}`)) {
    const updatedCart = { ...cart, ...foodDetails };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast.success(`${foodName} added to cart 🚀`);
    return { type: types.ADD_TO_CART, payload: foodDetails };
  }
  toast.error(`${foodName} already in cart 🙅🏾‍♂️`);
  return { type: types.ADD_TO_CART_FAIL };
};

export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  return { type: types.GET_CART, payload: cart };
};

export const removeFromCart = (foodId) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const updatedCart = omit(cart, foodId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return { type: types.REMOVE_FROM_CART, payload: { foodId } };
};

export const checkout = foodIds => async (dispatch) => {
  dispatch(startFetching());
  try {
    await axios.post('/orders', { foodIds });
    localStorage.removeItem('cart');
    dispatch({ type: types.CHECKOUT });
    toast.success('Order placed! 🎉');
    return dispatch(stopFetching());
  } catch (error) {
    toast.error('Error placing your order 😢 Please try again');
    return dispatch(
      stopFetching(false, error.response ? error.response.data.message : 'something went wrong'),
    );
  }
};
