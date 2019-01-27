import React from 'react';
import { mount } from 'enzyme';

import { Cart } from '../../components/Cart';

describe('<Cart />', () => {
  const props = {
    cart: {
      1: {
        foodName: 'Sweet food',
        foodPrice: 829,
      },
      2: {
        foodName: 'Ugly plantain',
        foodPrice: 129,
      },
    },
    removeFromCart: jest.fn(),
    checkout: jest.fn(),
    history: { push: jest.fn() },
    fetching: { fetching: false, errorMessage: '' },
  };

  it('should render correctly', () => {
    const wrapper = mount(<Cart {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should remove item from cart successfully', () => {
    const wrapper = mount(<Cart {...props} />);
    const firstRemoveButton = wrapper.find('.food-card-checkout > button').first();
    firstRemoveButton.simulate('click');
    expect(props.removeFromCart).toHaveBeenCalledWith(1);
    wrapper.unmount();
  });

  it('should place order for food successfully', async () => {
    const wrapper = mount(<Cart {...props} />);
    const checkoutButton = wrapper.find('#checkout');
    await checkoutButton.simulate('click');
    expect(props.checkout).toHaveBeenCalledWith([1, 2]);
    expect(props.history.push).toHaveBeenCalledWith('/');
    wrapper.unmount();
  });

  it('should not redirect user if error occurs', async () => {
    const wrapper = mount(
      <Cart
        {...{
          ...props,
          fetching: { ...props.fetching, errorMessage: 'something went bonkers' },
        }}
      />,
    );
    const checkoutButton = wrapper.find('#checkout');
    await checkoutButton.simulate('click');
    expect(props.history.push).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});
