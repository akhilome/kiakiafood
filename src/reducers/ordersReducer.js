import types from '../actions/types';

const intialState = {
  history: [],
};

export default (state = intialState, action) => {
  switch (action.type) {
    case types.GET_ORDER_HISTORY:
      return { ...intialState, history: action.payload.orders };
    case types.CANCEL_ORDER:
      return {
        ...state,
        history: state.history.filter(order => order.id !== action.payload.orderId),
      };
    case types.GET_ORDER_HISTORY_FAIL:
    case types.CANCEL_ORDER_FAIL:
    default:
      return state;
  }
};
