import '../index.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { checkAuthStatus, getCart } from '../actions';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import Signup from './SignupPage';
import Menu from './MenuPage';
import CartPage from './Cart';
import NotFoundPage from './NotFoundPage';
import Loader from './Loader';
import Nav from './Nav';

export class App extends Component {
  async componentDidMount() {
    const { checkAuthStatus: checkUserAuthStatus, getCart: getCartItems } = this.props;
    await checkUserAuthStatus();
    const { isLoggedIn } = this.props;
    if (isLoggedIn) getCartItems();
  }

  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Fragment>
          {loading && <Loader />}
          <Nav />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/menu" component={Menu} />
            <Route path="/cart" component={CartPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

App.propTypes = {
  checkAuthStatus: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  loading: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: false,
  loading: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  loading: state.fetching.fetching,
});

export default connect(
  mapStateToProps,
  { checkAuthStatus, getCart },
)(App);
