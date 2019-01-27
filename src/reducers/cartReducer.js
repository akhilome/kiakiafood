import omit from 'lodash.omit';
import types from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case types.GET_CART:
      return { ...state, ...action.payload };
    case types.ADD_TO_CART:
      return { ...state, ...action.payload };
    case types.REMOVE_FROM_CART:
      return omit(state, action.payload.foodId);
    case types.CHECKOUT:
      return {};
    case types.ADD_TO_CART_FAIL:
    case types.CHECKOUT_FAIL:
    default:
      return state;
  }
};
