import { checkAuthStatus } from '../../actions';
import jwt from '../../utils/jwt';

describe("check user's current auth status", () => {
  afterEach(() => jest.resetAllMocks());

  it('checkAuthStatus() for logged in user state', () => {
    jest.spyOn(jwt, 'decode').mockImplementation(() => ({ userName: 'kay', userStatus: 'admin' }));
    const action = checkAuthStatus();
    expect(action).toEqual({ type: 'CHECK_AUTH_STATUS', payload: { name: 'kay', role: 'admin' } });
  });

  it('checkAuthStatus() for logged out state', () => {
    const action = checkAuthStatus();
    expect(action.type).toEqual('CHECK_AUTH_STATUS_FAIL');
  });
});
