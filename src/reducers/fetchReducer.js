import actionTypes from '../actions/types';

const initialState = { fetching: null, errorMessage: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FETCHING:
      return { ...state, fetching: true, errorMessage: '' };
    case actionTypes.STOP_FETCHING:
      return {
        ...state,
        fetching: false,
        errorMessage: action.payload.error ? action.payload.message : '',
      };
    default:
      return state;
  }
};
