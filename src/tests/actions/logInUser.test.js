import axios from '../../services/axios';
import { logInUser } from '../../actions';
import jwt from '../../utils/jwt';

describe('logInUser()', () => {
  afterEach(() => jest.resetAllMocks());

  const dispatch = jest.fn();
  const response = { data: { status: 'success', user: { token: 'something' } } };
  jest
    .spyOn(jwt, 'decode')
    .mockImplementation(() => ({ userName: 'jamjum', userStatus: 'customer' }));

  it('should login user successfully', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(response));
    await logInUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: { name: 'jamjum', role: 'customer' },
      type: 'LOG_IN',
    });
  });

  it('should fail to login user if errors exist', async () => {
    jest
      .spyOn(axios, 'post')
      .mockImplementation(() => Promise.reject(new Error('something went wrong')));

    await logInUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { error: true, message: 'something went wrong' },
      type: 'STOP_FETCHING',
    });
  });
});
