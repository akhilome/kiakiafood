import axios from '../../services/axios';
import { signUpUser } from '../../actions';
import jwt from '../../utils/jwt';

describe('signUpUser()', () => {
  afterEach(() => jest.resetAllMocks());

  const dispatch = jest.fn();
  const response = { data: { status: 'success', user: { token: 'something' } } };
  jest.spyOn(jwt, 'decode').mockImplementation(() => ({ userName: 'kay', userStatus: 'admin' }));

  it('should sign up user successfully', async () => {
    jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve(response));
    await signUpUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should fail to sign up user if errors exist', async () => {
    jest
      .spyOn(axios, 'post')
      .mockImplementation(() => Promise.reject(new Error('something went wrong')));

    await signUpUser()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      payload: { error: true, message: 'something went wrong' },
      type: 'STOP_FETCHING',
    });
  });
});
