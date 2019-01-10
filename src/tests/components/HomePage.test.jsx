import React from 'react';
import HomePage from '../../components/HomePage';
import { mountWrap, shallowWrap } from '../helpers/contextWrapper';

describe('HomePage component', () => {
  const wrappedShallow = () => shallowWrap(<HomePage />);
  const wrappedMount = () => mountWrap(<HomePage />);
  it('should render homepage correctly', () => {
    expect(wrappedShallow()).toMatchSnapshot();
  });

  it('should show login and sign up links', () => {
    const wrapper = wrappedMount();
    const navLinks = wrapper.find('nav ul li');
    const loginLink = navLinks.first().text();
    const signupLink = navLinks.last().text();

    expect(navLinks).toHaveLength(2);
    expect(loginLink).toEqual('Log In');
    expect(signupLink).toEqual('Sign Up');
  });

  it('should should button to get food', () => {
    const wrapper = wrappedMount();
    const getFoodButton = wrapper.find('button');

    expect(getFoodButton.text()).toEqual('Get Food ⟶');
  });
});
