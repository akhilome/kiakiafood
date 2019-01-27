import React from 'react';
import { mount } from 'enzyme';

import { MenuPage } from '../../components/MenuPage';

describe('<MenuPage />', () => {
  const props = {
    getMenu: jest.fn(),
    menu: [
      {
        id: 1,
        food_image: 'couple.png',
        food_name: '40 Lake',
        price: 102,
      },
    ],
    addToCart: jest.fn(),
    history: { push: jest.fn() },
  };

  const buyButtonSpy = jest.spyOn(MenuPage.prototype, 'onButtonClick');

  it('should add item to cart if user logged in', () => {
    const wrapper = mount(<MenuPage {...{ ...props, isLoggedIn: true }} />);

    const buyButton = wrapper.find('.food-details__action > button');
    buyButton.simulate('click');
    expect(buyButtonSpy).toHaveBeenCalled();
    expect(props.addToCart).toHaveBeenCalledWith({
      foodId: 1,
      foodName: '40 Lake',
      foodPrice: 102,
    });
  });

  it('should not add item to cart if user is not logged in', () => {
    const wrapper = mount(<MenuPage {...{ ...props, isLoggedIn: false }} />);

    const buyButton = wrapper.find('.food-details__action > button');
    buyButton.simulate('click');
    expect(buyButtonSpy).toHaveBeenCalled();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should render correctly', () => {
    const wrapper = mount(<MenuPage {...props} />);

    expect(props.getMenu).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
