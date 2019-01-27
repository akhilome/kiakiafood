import React from 'react';
import { shallow } from 'enzyme';

import FoodCard from '../../components/FoodCard';

describe('Food Card Component', () => {
  const props = {
    foodImage: 'some.img',
    foodName: 'final fantasy',
    id: 69,
    foodPrice: 1996,
    isAdmin: false,
    buttonCallback: jest.fn(),
  };

  it('should render correctly for customer', () => {
    const wrapper = shallow(<FoodCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly for admin', () => {
    const wrapper = shallow(<FoodCard {...{ ...props, isAdmin: true }} />);
    expect(wrapper).toMatchSnapshot();
  });
});
