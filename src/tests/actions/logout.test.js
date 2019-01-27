import { logout } from '../../actions';

describe('logout()', () => {
  const dispatch = jest.fn();
  it('should successfully log out user', () => {
    logout()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({ type: 'LOGOUT' });
  });
});
