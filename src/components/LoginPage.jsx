import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Nav from './Nav';
import { logInUser } from '../actions';

export class Login extends Component {
  state = { email: '', password: '' };

  componentDidMount() {
    const { isLoggedIn, fetching, history } = this.props;
    if (!fetching && isLoggedIn) history.push('/menu');
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { logInUser: logIn } = this.props;

    await logIn({ email, password });
    const { isLoggedIn, fetching, history } = this.props;
    if (!fetching && isLoggedIn) history.push('/menu');
  };

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <Nav />
        <div className="wrapper auth">
          <section className="container">
            <h2>Access Your Account</h2>
            <form onSubmit={this.onFormSubmit}>
              <input
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
                value={email}
                name="email"
                placeholder="Your Email Address"
                required
              />
              <input
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
                value={password}
                name="password"
                placeholder="Your Password"
                required
              />
              <input type="submit" name="submit" value="Log In" className="btn-primary" />
            </form>
            <div>
              <p>
                No account yet?
                {' '}
                <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

Login.propTypes = {
  logInUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  fetching: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

Login.defaultProps = {
  fetching: false,
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  fetching: state.fetching.fetching,
});

export default connect(
  mapStateToProps,
  { logInUser },
)(Login);
