import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';

describe('App component', () => {
  it('should render app correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
