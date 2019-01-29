import { getUserOrderHistory, cancelOrder } from '../../actions';
import jwt from '../../utils/jwt';
import axios from '../../services/axios';

afterAll(() => jest.restoreAllMocks());

describe('getUserOrderHistory', () => {
  jest.spyOn(jwt, 'decode').mockImplementation(() => ({ userId: 1 }));
  const dispatch = jest.fn();
  const response = { data: { orders: [] } };

  afterEach(() => jest.resetAllMocks());

  it('should dispatch correct action for getUserOrderHistory success', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
    await getUserOrderHistory()(dispatch);

    expect(jwt.decode).toHaveBeenCalled();
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'GET_ORDER_HISTORY',
      payload: { orders: [] },
    });
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should dispatch correct action for getUserOrderHistory failure', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(response));
    await getUserOrderHistory()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'STOP_FETCHING',
      payload: {
        error: true,
        message: 'something went wrong',
      },
    });
  });
});

describe('cancelOrder()', () => {
  const dispatch = jest.fn();
  const errResponse = { response: { data: { message: 'failed to cancel order' } } };
  afterEach(() => jest.resetAllMocks());

  it('should dispatch correct action to cancel an order', async () => {
    jest.spyOn(axios, 'delete').mockImplementation(() => Promise.resolve());
    await cancelOrder(7)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'CANCEL_ORDER',
      payload: { orderId: 7 },
    });
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'STOP_FETCHING',
      payload: { error: false, message: '' },
    });
  });

  it('should dispatch correct action for order cancellation failure', async () => {
    jest.spyOn(axios, 'delete').mockImplementation(() => Promise.reject(errResponse));
    await cancelOrder(2)(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'CANCEL_ORDER_FAIL' });
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'STOP_FETCHING',
      payload: {
        error: true,
        message: 'failed to cancel order',
      },
    });
  });
});
