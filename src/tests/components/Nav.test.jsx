import React from 'react';
import { mount } from 'enzyme';
import { Nav } from '../../components/Nav';
import { routerWrap, reduxWrap } from '../helpers';

describe('<Nav />', () => {
  const adminProps = {
    role: 'admin',
    isLoggedIn: true,
  };

  const customerProps = {
    role: 'customer',
    isLoggedIn: true,
  };

  const noAuthProps = {
    role: 'admin',
    isLoggedIn: false,
  };

  it('should render correctly for admin', () => {
    const connectedComponent = reduxWrap(<Nav {...adminProps} />);
    const wrapper = mount(routerWrap(connectedComponent));
    const links = wrapper.find('li');
    expect(links.length).toEqual(3);
    wrapper.unmount();
  });

  it('should render correctly for customer', () => {
    const connectedComponent = reduxWrap(<Nav {...customerProps} />);
    const wrapper = mount(routerWrap(connectedComponent));
    const links = wrapper.find('li');
    expect(links.length).toEqual(4);
    wrapper.unmount();
  });

  it('should render correctly for unauthenticated user', () => {
    const wrapper = mount(routerWrap(<Nav {...noAuthProps} />));
    const links = wrapper.find('li a');
    expect(links.length).toEqual(2);
    expect(links.first().text()).toEqual('Log In');
    expect(links.last().text()).toEqual('Sign Up');
    wrapper.unmount();
  });
});
