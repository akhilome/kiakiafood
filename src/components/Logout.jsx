import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { logout } from '../actions';

export class Logout extends Component {
  onLogoutClick = async (e) => {
    e.preventDefault();
    const { logout: logoutUser, history } = this.props;
    await logoutUser();
    return history.push('/login');
  };

  render() {
    return (
      <a onClick={this.onLogoutClick} href="!#">
        logout
      </a>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  null,
  { logout },
)(withRouter(Logout));
