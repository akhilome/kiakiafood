import types from '../actions/types';

const initialState = {
  isLoggedIn: null,
  name: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP:
    case types.LOG_IN:
    case types.CHECK_AUTH_STATUS:
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
        role: action.payload.role,
      };
    case types.LOGOUT:
      return initialState;
    case types.CHECK_AUTH_STATUS_FAIL:
    default:
      return state;
  }
};
