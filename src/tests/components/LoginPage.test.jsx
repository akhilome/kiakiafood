import React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../components/LoginPage';
import { mountWrap } from '../helpers/contextWrapper';
import { updateInput } from '../helpers';

describe('LoginPage', () => {
  const props = {
    logInUser: jest.fn(),
    history: { push: jest.fn() },
  };

  it('should render LoginPage correctly', () => {
    const wrapper = mountWrap(<Login {...props} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('should allow user to fill login form', () => {
    const wrapper = shallow(<Login {...props} />);
    const form = wrapper.find('form');
    updateInput(form, 'input[name="email"]', 'an@email.address');
    updateInput(form, 'input[name="password"]', 'secretpass');

    expect(wrapper.state('email')).toEqual('an@email.address');
    expect(wrapper.state('password')).toEqual('secretpass');
  });

  it('should correctly submit login form with user details', () => {
    const wrapper = shallow(<Login {...props} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => undefined });

    expect(props.logInUser).toHaveBeenCalled();
  });

  it('should redirect user after login', () => {
    const wrapper = shallow(<Login {...{ ...props, isLoggedIn: true, fetching: false }} />);
    const form = wrapper.find('form');
    updateInput(form, 'input[name="email"]', 'an@email.address');
    updateInput(form, 'input[name="password"]', 'secretpass');

    form.simulate('submit', { preventDefault: () => undefined });
    expect(props.logInUser).toHaveBeenCalledWith({
      email: 'an@email.address',
      password: 'secretpass',
    });
    expect(props.history.push).toHaveBeenCalled();
  });

  it('should redirect user already logged in', () => {
    mountWrap(<Login {...{ ...props, isLoggedIn: true, fetching: false }} />);
    expect(props.history.push).toHaveBeenCalled();
  });
});
