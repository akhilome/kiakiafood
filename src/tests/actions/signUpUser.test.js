import MockAdapter from 'axios-mock-adapter';
import axios from '../../services/axios';
import { signUpUser } from '../../actions';
import jwt from '../../utils/jwt';

const axiosMock = new MockAdapter(axios);

describe('signUpUser()', () => {
  afterEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });
  afterAll(() => axiosMock.restore);

  const dispatch = jest.fn();
  const response = { status: 'success', user: { token: 'something' } };
  jest.spyOn(jwt, 'decode').mockImplementation(() => ({ userName: 'kay', userStatus: 'admin' }));

  it('should sign up user successfully', async () => {
    axiosMock.onPost().replyOnce(200, response);
    await signUpUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should fail to sign up user if errors exist', async () => {
    axiosMock.onPost().replyOnce(400, { message: 'lol my brother' });

    await signUpUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { error: true, message: 'lol my brother' },
      type: 'STOP_FETCHING',
    });
  });
});
