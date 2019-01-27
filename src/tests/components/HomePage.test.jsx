import React from 'react';
import HomePage from '../../components/HomePage';
import { shallowWrap } from '../helpers/contextWrapper';

describe('HomePage component', () => {
  it('should render homepage correctly', () => {
    const wrapper = shallowWrap(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should should button to get food', () => {
    const wrapper = shallowWrap(<HomePage />);
    const getFoodButton = wrapper.find('button');

    expect(getFoodButton.text()).toEqual('Get Food ⟶');
  });
});
