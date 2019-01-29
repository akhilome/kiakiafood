import ordersReducer from '../../reducers/ordersReducer';

const initialState = Object.freeze({
  history: [],
});

const stateWithOrders = Object.freeze({
  history: [
    {
      id: 2,
      items: ['Tasty Prawns', 'Chicken Wings'],
      price: 2100,
      date: '2018-10-19T00:00:00.000Z',
      status: 'cancelled',
    },
    {
      id: 5,
      items: ['Tasty Prawns'],
      price: 1250,
      date: '2018-11-25T00:00:00.000Z',
      status: 'new',
    },
    {
      id: 9,
      items: ['Tasty Prawns', 'Turkey Wings'],
      price: 2200,
      date: '2018-12-02T00:00:00.000Z',
      status: 'new',
    },
  ],
});

const getOrderHistoryAction = {
  type: 'GET_ORDER_HISTORY',
  payload: {
    orders: [
      {
        id: 55,
        items: ['Tasty Prawns'],
        price: 1250,
        date: '2018-11-25T00:00:00.000Z',
        status: 'new',
      },
    ],
  },
};

const cancelOrderAction = {
  type: 'CANCEL_ORDER',
  payload: { orderId: 5 },
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

  it('should return correct state for cancelling user order', () => {
    const state = ordersReducer(stateWithOrders, cancelOrderAction);
    expect(state.history).toHaveLength(2);
  });
});
