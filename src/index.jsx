import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ToastContainer, Flip } from 'react-toastify';

import AppIndex from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const jsx = (
  <Provider store={store}>
    <AppIndex />
    <ToastContainer transition={Flip} position="top-center" autoClose={3500} />
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#app'));
