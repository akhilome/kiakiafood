import fetchReducer from '../../reducers/fetchReducer';

const initialState = Object.freeze({ fetching: null, errorMessage: '' });

const startFetchingAction = { type: 'START_FETCHING' };
const stopFetchingActionWithSuccess = { type: 'STOP_FETCHING', payload: { error: false } };
const stopFetchingActionWithFailure = {
  type: 'STOP_FETCHING',
  payload: { error: true, message: 'The government is not working' },
};

describe('fetch reducer', () => {
  it('should return correct fetching state', () => {
    const state = fetchReducer(initialState, startFetchingAction);

    expect(state).toBeInstanceOf(Object);
    expect(state.fetching).toEqual(true);
    expect(state.errorMessage).toBeFalsy();
  });

  it('should return correct fetching error state', () => {
    const state = fetchReducer(initialState, stopFetchingActionWithFailure);

    expect(state.fetching).toEqual(false);
    expect(state.errorMessage).toEqual('The government is not working');
  });

  it('should return correct fetching success state', () => {
    const state = fetchReducer(initialState, stopFetchingActionWithSuccess);

    expect(state.fetching).toEqual(false);
    expect(state.errorMessage).toBeFalsy();
  });
});
