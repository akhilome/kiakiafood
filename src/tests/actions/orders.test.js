import { getUserOrderHistory } from '../../actions';
import jwt from '../../utils/jwt';
import axios from '../../services/axios';

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
