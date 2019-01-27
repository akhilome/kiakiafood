import React from 'react';
import { mount } from 'enzyme';
import { Logout } from '../../components/Logout';

describe('<Logout />', () => {
  const props = {
    logout: jest.fn(),
    history: { push: jest.fn() },
  };

  it('should successfully logout the user', () => {
    const wrapper = mount(<Logout {...props} />);
    wrapper.find('a').simulate('click');
    expect(props.logout).toHaveBeenCalled();
    wrapper.unmount();
  });
});
