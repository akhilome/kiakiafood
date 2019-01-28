import types from '../actions/types';

const intialState = {
  history: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.GET_ORDER_HISTORY:
      return { ...intialState, history: action.payload.orders };
    case types.GET_ORDER_HISTORY_FAIL:
    default:
      return state;
  }
};
