import cartReducer from '../../reducers/cartReducer';

const initialState = Object.freeze({
  2: {
    foodName: 'Middle Child',
    foodPrice: 50,
  },
});

const getCartAction = {
  type: 'GET_CART',
  payload: {
    23: {
      foodName: 'Chainsmokers',
      foodPrice: 180,
    },
    12: {
      foodName: 'Halsey',
      foodPrice: 90,
    },
  },
};

const addToCartAction = {
  type: 'ADD_TO_CART',
  payload: { 1: { foodName: 'Cardi B', foodPrice: 129 } },
};

const addToCartFailureAction = { type: 'ADD_TO_CART_FAIL' };

const removeFromCartAction = { type: 'REMOVE_FROM_CART', payload: { foodId: 2 } };

const checkoutAction = { type: 'CHECKOUT' };

const checkoutFailAction = { type: 'CHECKOUT_FAIL' };

describe('cart reducer', () => {
  it('should return correct state for getting cart', () => {
    const state = cartReducer(undefined, getCartAction);

    expect(state).toBeInstanceOf(Object);
    expect(Object.keys(state)).toHaveLength(2);
  });

  it('should return state for successfully adding to cart', () => {
    const state = cartReducer(initialState, addToCartAction);

    expect(Object.keys(state)).toHaveLength(2);
    expect(state['1']).toBeInstanceOf(Object);
    expect(state['1']).toEqual({ foodName: 'Cardi B', foodPrice: 129 });
  });

  it('should return correct state for failing to add to cart', () => {
    const state = cartReducer(initialState, addToCartFailureAction);
    expect(Object.keys(state)).toHaveLength(1);
  });

  it('should return state for removing from cart successfully', () => {
    const state = cartReducer(initialState, removeFromCartAction);
    expect(Object.keys(state)).toHaveLength(0);
  });

  it('should return correct state for successful checkout', () => {
    const state = cartReducer(initialState, checkoutAction);
    expect(state).toEqual({});
  });

  it('should return correct state for checkout failure', () => {
    const state = cartReducer(initialState, checkoutFailAction);
    expect(Object.keys(state)).toHaveLength(1);
    expect({ ...state }).toEqual({ ...initialState });
  });
});
