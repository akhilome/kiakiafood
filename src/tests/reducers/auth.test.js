import authReducer from '../../reducers/authReducer';

const initialState = {
  isLoggedIn: null,
  name: '',
  role: '',
};

const signupAction = {
  type: 'SIGN_UP',
  payload: {
    name: 'mario',
    role: 'customer',
  },
};

const loginAction = {
  type: 'LOG_IN',
  payload: {
    name: 'Phoebe',
    role: 'customer',
  },
};

const checkAuthStatusSuccessAction = {
  type: 'CHECK_AUTH_STATUS',
  payload: {
    name: 'Aubrey',
    role: 'admin',
  },
};

const checkAuthStatusFailureAction = { type: 'CHECK_AUTH_STATUS_FAIL' };

describe('auth reducer', () => {
  it('should return correct state for signup', () => {
    const state = authReducer(initialState, signupAction);
    expect(state.isLoggedIn).toEqual(true);
    expect(state.name).toEqual('mario');
  });

  it('should return correct state for login', () => {
    const state = authReducer(initialState, loginAction);
    expect(state.isLoggedIn).toEqual(true);
    expect(state.name).toEqual('Phoebe');
  });

  it('should return correct state for checking user auth status', () => {
    const state = authReducer(initialState, checkAuthStatusSuccessAction);
    expect(state.isLoggedIn).toEqual(true);
    expect(state.name).toEqual('Aubrey');
  });

  it('should return correct state for checking user auth status failure', () => {
    const state = authReducer(initialState, checkAuthStatusFailureAction);
    expect({ ...state }).toEqual({ ...initialState });
  });
});
