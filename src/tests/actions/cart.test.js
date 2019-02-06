import MockAdapter from 'axios-mock-adapter';
import axios from '../../services/axios';
import {
  addToCart, getCart, removeFromCart, checkout,
} from '../../actions';

const axiosMock = new MockAdapter(axios);

describe('addToCart()', () => {
  const foodDetails = { foodId: 1, foodName: 'Kiwi', foodPrice: 320 };
  it('should dispatch action for adding to cart success', () => {
    const action = addToCart(foodDetails);
    expect(action.type).toEqual('ADD_TO_CART');
    expect(action.payload).toEqual({
      1: {
        foodName: 'Kiwi',
        foodPrice: 320,
      },
    });
  });

  it('should dispatch action for adding to cart failure', () => {
    const action = addToCart(foodDetails);
    expect(action.type).toEqual('ADD_TO_CART_FAIL');
  });
});

describe('getCart()', () => {
  it('should return action for getting cart items', () => {
    const action = getCart();
    expect(action.type).toEqual('GET_CART');
  });
});

describe('removeFromCart()', () => {
  const action = removeFromCart(1);
  expect(action.type).toEqual('REMOVE_FROM_CART');
  expect(action.payload).toEqual({ foodId: 1 });
});

describe('checkout()', () => {
  afterEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });

  afterAll(() => axiosMock.restore);

  const dispatch = jest.fn();

  it('should place order successfully', async () => {
    axiosMock.onPost().replyOnce(201);
    await checkout([1, 2])(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'CHECKOUT' });
  });

  it('should fail to place order', async () => {
    axiosMock.onPost().replyOnce(400, { message: 'unable to place order' });
    await checkout([1, 2])(dispatch);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'STOP_FETCHING',
      payload: { error: true, message: 'unable to place order' },
    });
  });
});
