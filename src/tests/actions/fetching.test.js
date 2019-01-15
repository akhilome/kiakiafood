import { startFetching, stopFetching } from '../../actions';

describe('Fetching Actions', () => {
  it('startFetching()', () => {
    const action = startFetching();
    expect(action).toEqual({ type: 'START_FETCHING' });
  });

  it('stopFetching() with success', () => {
    const action = stopFetching();
    expect(action).toEqual({ type: 'STOP_FETCHING', payload: { error: false, message: '' } });
  });

  it('stopFetching() with error', () => {
    const action = stopFetching(false, 'something went wrong');
    expect(action).toEqual({
      type: 'STOP_FETCHING',
      payload: { error: true, message: 'something went wrong' },
    });
  });
});
