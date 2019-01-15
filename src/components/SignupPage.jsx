import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signUpUser } from '../actions';
import Nav from './Nav';

export class SignupPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminSecret: '',
  };

  componentDidMount() {
    const { isLoggedIn, fetching, history } = this.props;
    if (!fetching && isLoggedIn) history.push('/menu');
  }

  onFormSubmit = async (e) => {
    e.preventDefault();
    const {
      name, email, password, confirmPassword, adminSecret,
    } = this.state;
    const { signUpUser: register } = this.props;
    await register({
      name,
      email,
      password,
      confirmPassword,
      adminSecret,
    });
    const { isLoggedIn, fetching, history } = this.props;
    if (!fetching && isLoggedIn) history.push('/menu');
  };

  render() {
    const {
      name, email, password, confirmPassword, adminSecret,
    } = this.state;
    return (
      <Fragment>
        <Nav />
        <div className="wrapper auth">
          <section className="container">
            <h2>Create An Account</h2>

            <form onSubmit={this.onFormSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Choose Password"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                required
              />
              <input
                type="password"
                name="password-confirm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => this.setState({ confirmPassword: e.target.value })}
                required
              />
              <input
                type="password"
                name="admin-secret"
                placeholder="Admin Secret [optional]"
                value={adminSecret}
                onChange={e => this.setState({ adminSecret: e.target.value })}
              />
              <input type="submit" name="submit" value="Sign Up" className="btn-primary" />
            </form>
            <div>
              <p>
                Already have an account?
                {' '}
                <Link to="/login">Sign In</Link>
              </p>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}

SignupPage.defaultProps = {
  isLoggedIn: false,
  fetching: false,
};

SignupPage.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
  fetching: PropTypes.bool,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  fetching: state.fetching.fetching,
});

export default connect(
  mapStateToProps,
  { signUpUser },
)(SignupPage);
