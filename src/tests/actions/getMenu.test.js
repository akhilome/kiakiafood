import MockAdapter from 'axios-mock-adapter';
import axios from '../../services/axios';
import { getMenu } from '../../actions';

const axiosMock = new MockAdapter(axios);

describe('Get Food Menu', () => {
  afterEach(() => {
    jest.resetAllMocks();
    axiosMock.reset();
  });

  afterAll(() => axiosMock.restore);

  const dispatch = jest.fn();
  const response = { menu: [{ foodName: 'Rice?' }] };

  it('should get all food items', async () => {
    axiosMock.onGet().replyOnce(200, response);
    await getMenu()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'GET_MENU',
      payload: { menu: [{ foodName: 'Rice?' }] },
    });
  });

  it('should fail to get food items', async () => {
    axiosMock.onGet().replyOnce(400, { message: 'unable to fetch items' });
    await getMenu()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'STOP_FETCHING',
      payload: { error: true, message: 'unable to fetch items' },
    });
  });
});
