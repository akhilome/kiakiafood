import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../../components/HomePage';

describe('HomePage component', () => {
  it('should render homepage correctly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
