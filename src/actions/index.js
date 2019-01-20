import axios from '../services/axios';
import actionTypes from './types';
import { saveToken, getToken } from '../utils/localStorage';
import jwt from '../utils/jwt';

export const startFetching = () => ({ type: actionTypes.START_FETCHING });
export const stopFetching = (fetchSuccess = true, message = '') => ({
  type: actionTypes.STOP_FETCHING,
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
      type: actionTypes.SIGN_UP,
      payload: {
        name,
        role,
      },
    });
    return dispatch(stopFetching());
  } catch (error) {
    return dispatch(
      stopFetching(false, error.response ? error.response.data.message : 'something went wrong'),
    );
  }
};

export const checkAuthStatus = () => {
  try {
    const { userName: name, userStatus: role } = jwt.decode(getToken());
    return {
      type: actionTypes.CHECK_AUTH_STATUS,
      payload: { name, role },
    };
  } catch (error) {
    return { type: actionTypes.CHECK_AUTH_STATUS_FAIL };
  }
};

export const getMenu = () => async (dispatch) => {
  dispatch(startFetching());
  try {
    const { menu } = (await axios.get('/menu')).data;
    dispatch({
      type: actionTypes.GET_MENU,
      payload: { menu },
    });
    return dispatch(stopFetching());
  } catch (error) {
    return dispatch(
      stopFetching(false, error.response ? error.response.data.message : 'something went wrong'),
    );
  }
};
