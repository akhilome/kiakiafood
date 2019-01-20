import axios from '../../services/axios';
import { getMenu } from '../../actions';

describe('Get Food Menu', () => {
  afterEach(() => jest.resetAllMocks());
  const dispatch = jest.fn();
  const response = { data: { menu: [{ foodName: 'Rice?' }] } };

  it('should get all food items', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(response));
    await getMenu()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(3);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'GET_MENU',
      payload: { menu: [{ foodName: 'Rice?' }] },
    });
  });

  it('should fail to get food items', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(response));
    await getMenu()(dispatch);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: 'STOP_FETCHING',
      payload: { error: true, message: 'something went wrong' },
    });
  });
});
