import React from 'react';

import { MenuPage } from '../../components/MenuPage';
import { mountWrap } from '../helpers/contextWrapper';

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
  };

  it('should render correctly', () => {
    const wrapper = mountWrap(<MenuPage {...props} />);

    expect(props.getMenu).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
