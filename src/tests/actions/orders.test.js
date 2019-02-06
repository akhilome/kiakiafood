import MockAdapter from 'axios-mock-adapter';
import { getUserOrderHistory, cancelOrder } from '../../actions';
import jwt from '../../utils/jwt';
import axios from '../../services/axios';

const axiosMock = new MockAdapter(axios);

afterAll(() => jest.restoreAllMocks());

describe('getUserOrderHistory', () => {
  jest.spyOn(jwt, 'decode').mockImplementation(() => ({ userId: 1 }));
  const dispatch = jest.fn();
  const response = { orders: [] };

  afterEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });

  afterAll(() => axiosMock.restore);

  it('should dispatch correct action for getUserOrderHistory success', async () => {
    axiosMock.onGet().replyOnce(200, response);
    await getUserOrderHistory()(dispatch);

    expect(jwt.decode).toHaveBeenCalled();
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'GET_ORDER_HISTORY',
      payload: { orders: [] },
    });
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should dispatch correct action for getUserOrderHistory failure', async () => {
    axiosMock.onGet().replyOnce(400);
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
  const errResponse = { message: 'failed to cancel order' };

  afterEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });

  afterAll(() => axiosMock.restore);

  it('should dispatch correct action to cancel an order', async () => {
    axiosMock.onDelete().replyOnce(204);
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
    axiosMock.onDelete().replyOnce(400, errResponse);
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
