import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import { shape } from 'prop-types';

// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
});

export const mountWrap = node => mount(node, createContext());
export const shallowWrap = node => shallow(node, createContext());
