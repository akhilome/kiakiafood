import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../components/Loader';

describe('<Loader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
});
