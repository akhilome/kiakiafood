import MockAdapter from 'axios-mock-adapter';
import axios from '../../services/axios';
import { logInUser } from '../../actions';
import jwt from '../../utils/jwt';

const axiosMock = new MockAdapter(axios);

describe('logInUser()', () => {
  afterEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });

  afterAll(() => axiosMock.restore);

  const dispatch = jest.fn();
  const response = { status: 'success', user: { token: 'something' } };
  jest
    .spyOn(jwt, 'decode')
    .mockImplementation(() => ({ userName: 'jamjum', userStatus: 'customer' }));

  it('should login user successfully', async () => {
    axiosMock.onPost().replyOnce(200, response);
    await logInUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(4);
    expect(dispatch.mock.calls[1][0]).toEqual({
      payload: { name: 'jamjum', role: 'customer' },
      type: 'LOG_IN',
    });
  });

  it('should fail to login user if errors exist', async () => {
    axiosMock.onPost().replyOnce(400, { message: 'nope, not working' });

    await logInUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { error: true, message: 'nope, not working' },
      type: 'STOP_FETCHING',
    });
  });
});
