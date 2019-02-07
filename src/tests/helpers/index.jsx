import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducers from '../../reducers';

export const reduxWrap = (
  component,
  { initialState, store = createStore(reducers, initialState, applyMiddleware(thunk)) } = {},
) => <Provider store={store}>{component}</Provider>;
export const routerWrap = component => <MemoryRouter>{component}</MemoryRouter>;

/*
  Credit: https://github.com/twclark0/react-enzyme-jest
*/
export const updateInput = (wrapper, instance, newValue) => {
  const input = wrapper.find(instance);
  input.simulate('change', {
    target: { value: newValue },
  });
};
