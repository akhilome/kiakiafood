import React from 'react';
import { mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';

import Cart from '../../components/Cart';
import { reduxWrap } from '../helpers';
import axios from '../../services/axios';

const axiosMock = new MockAdapter(axios);

describe('<Cart />', () => {
  const initialState = {
    user: { isLoggedIn: true },
    fetching: { fetching: false, errorMessage: '' },
    menu: [
      {
        id: 1,
        food_name: 'Tasty Prawns',
        food_image: 'https://i.imgur.com/mTHYwlc.jpg',
        price: 1250,
      },
      {
        id: 2,
        food_name: 'Turkey Wings',
        food_image: 'https://i.imgur.com/Bfn1CxC.jpg',
        price: 950,
      },
    ],
    cart: {
      1: {
        foodName: 'Tasty Prawns',
        foodPrice: 1250,
      },
      2: {
        foodName: 'Turkey Wings',
        foodPrice: 950,
      },
    },
  };

  afterEach(axiosMock.restore);
  afterAll(axiosMock.reset);

  const connectedComponent = reduxWrap(<Cart />, { initialState });

  it('should render correctly', () => {
    const wrapper = mount(connectedComponent);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should remove item from cart successfully', () => {
    const wrapper = mount(connectedComponent);
    const firstRemoveButton = wrapper.find('.food-card-checkout > button').first();
    firstRemoveButton.simulate('click');
    expect(wrapper.find('.food-card-checkout').length).toEqual(1);
    wrapper.unmount();
  });

  it('should place order for food successfully', async () => {
    axiosMock.onPost().replyOnce(201, {
      status: 'success',
      message: 'new order placed successfully',
    });
    const wrapper = mount(connectedComponent);
    const checkoutButton = wrapper.find('#checkout');
    await checkoutButton.simulate('click');
    wrapper.unmount();
  });
});
