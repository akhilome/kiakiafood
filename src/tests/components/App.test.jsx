import React from 'react';
import { mount, shallow } from 'enzyme';
import { App } from '../../components/App';
import { reduxWrap } from '../helpers';

describe('App component', () => {
  const props = { checkAuthStatus: jest.fn(), getCart: jest.fn() };
  it('should render app correctly', () => {
    const wrapper = mount(reduxWrap(<App {...props} />));
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should render app correctly for authenticated customers', () => {
    const wrapper = mount(reduxWrap(<App {...{ ...props, isLoggedIn: true }} />));
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('calls component did mount', () => {
    jest.spyOn(App.prototype, 'componentDidMount');
    shallow(<App {...props} />);
    expect(App.prototype.componentDidMount).toHaveBeenCalled();
  });
});
