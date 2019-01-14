import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../../components/App';

describe('App component', () => {
  const props = { checkAuthStatus: jest.fn() };
  it('should render app correctly', () => {
    const wrapper = mount(<App {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('calls component did mount', () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    shallow(<App {...props} />);
    expect(App.prototype.componentDidMount).toHaveBeenCalled();
  });
});
