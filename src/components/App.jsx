import '../index.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { checkAuthStatus } from '../actions';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Signup from './SignupPage';
import NotFoundPage from './NotFoundPage';

export class App extends Component {
  componentDidMount() {
    const { checkAuthStatus: checkUserAuthStatus } = this.props;
    checkUserAuthStatus();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={Signup} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  checkAuthStatus: propTypes.func.isRequired,
};

export default connect(
  null,
  { checkAuthStatus },
)(App);
