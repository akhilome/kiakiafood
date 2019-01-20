import React from 'react';
import { shallow } from 'enzyme';

import { SignupPage } from '../../components/SignupPage';
import { mountWrap } from '../helpers/contextWrapper';
import { updateInput } from '../helpers';

describe('SignupPage Component', () => {
  const props = {
    signUpUser: jest.fn(),
    history: jest.fn(),
    isLoggedIn: false,
  };

  const altProps = {
    signUpUser: jest.fn(),
    history: { push: jest.fn() },
    isLoggedIn: true,
    fetching: false,
  };

  it('should render signup page correctly', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow user to fill signup form', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    const form = wrapper.find('form');
    updateInput(form, 'input[name="name"]', 'kizito');
    updateInput(form, 'input[name="email"]', 'kay@gmail.com');
    updateInput(form, 'input[name="password"]', 'secretpassword');
    updateInput(form, 'input[name="password-confirm"]', 'secretpassword');
    updateInput(form, 'input[name="admin-secret"]', 'adminsecret');

    expect(wrapper.state('name')).toEqual('kizito');
    expect(wrapper.state('email')).toEqual('kay@gmail.com');
    expect(wrapper.state('password')).toEqual('secretpassword');
    expect(wrapper.state('confirmPassword')).toEqual('secretpassword');
    expect(wrapper.state('adminSecret')).toEqual('adminsecret');
  });

  it('should correct submit form with user details', () => {
    const wrapper = shallow(<SignupPage {...props} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => '' });
    expect(props.signUpUser).toHaveBeenCalled();
  });

  it('should redirect user after signup', () => {
    const wrapper = shallow(<SignupPage {...altProps} />);
    wrapper.find('form').simulate('submit', { preventDefault: () => '' });
    expect(altProps.history.push).toHaveBeenCalled();
  });

  it('should redirect user if already logged in', () => {
    mountWrap(<SignupPage {...altProps} />);
    expect(altProps.history.push).toHaveBeenCalledWith('/menu');
  });
});
