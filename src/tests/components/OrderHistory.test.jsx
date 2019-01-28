import React from 'react';
import { mount } from 'enzyme';
import { OrderHistory } from '../../components/OrderHistory';

describe('<OrderHistory />', () => {
  const orders = [
    {
      id: 1,
      items: ['Fish', 'Beans'],
      price: 120,
      status: 'processing',
      date: '2018-10-18T00:00:00.000Z',
    },
    {
      id: 2,
      items: ['Snack'],
      price: 1220,
      status: 'cancelled',
      date: '2018-11-18T00:00:00.000Z',
    },
    {
      id: 3,
      items: ['Phoebe'],
      price: 1120,
      status: 'complete',
      date: '2018-12-18T00:00:00.000Z',
    },
    {
      id: 4,
      items: ['Egg'],
      price: 12,
      status: 'new',
      date: '2019-01-18T00:00:00.000Z',
    },
  ];

  const props = {
    orders,
    getUserOrderHistory: jest.fn(),
  };

  it('should render correctly', () => {
    const spy = jest.spyOn(OrderHistory.prototype, 'componentDidMount');
    const wrapper = mount(<OrderHistory {...props} />);
    expect(spy).toHaveBeenCalled();
    const orderCards = wrapper.find('.order-card');
    expect(orderCards.length).toEqual(4);
    wrapper.unmount();
  });
});
