import ordersReducer from '../../reducers/ordersReducer';

const initialState = Object.freeze({
  history: [],
});

const getOrderHistoryAction = {
  type: 'GET_ORDER_HISTORY',
  payload: {
    orders: [
      {
        foodName: 'das',
        foodPrice: 20,
        date: 'yesterday?',
      },
    ],
  },
};

const getOrderHistoryFailAction = { type: 'GET_ORDER_HISTORY_FAIL' };

describe('orders reducer', () => {
  it('should return correct state for getting user order history', () => {
    const state = ordersReducer(initialState, getOrderHistoryAction);
    expect(state.history).toHaveLength(1);
    expect({ ...state.history[0] }).toEqual({ ...getOrderHistoryAction.payload.orders[0] });
  });

  it('should return correct state for getting user order history failure', () => {
    const state = ordersReducer(undefined, getOrderHistoryFailAction);
    expect({ ...state.history }).toEqual({ ...initialState.history });
  });
});
