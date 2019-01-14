import actionsTypes from '../actions/types';

const initialState = {
  isLoggedIn: null,
  name: '',
  role: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.SIGN_UP:
    case actionsTypes.CHECK_AUTH_STATUS:
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name,
        role: action.payload.role,
      };
    case actionsTypes.CHECK_AUTH_STATUS_FAIL:
    default:
      return state;
  }
};
