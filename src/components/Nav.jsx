import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutLink from './Logout';

export const Nav = ({ isLoggedIn, role }) => {
  const navContent = () => {
    if (isLoggedIn && role === 'customer') {
      return (
        <Fragment>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <LogoutLink />
          </li>
        </Fragment>
      );
    }

    if (isLoggedIn && role === 'admin') {
      return (
        <Fragment>
          <li>
            <Link to="/admin">adminer</Link>
          </li>
          <li>
            <Link to="/admining">adminest</Link>
          </li>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </Fragment>
    );
  };
  return (
    <header>
      <div className="site-title">
        <h2>
          <Link to="/">Kiakia Food</Link>
        </h2>
      </div>
      <nav>
        <ul>{navContent()}</ul>
      </nav>
    </header>
  );
};

Nav.propTypes = {
  isLoggedIn: PropTypes.bool,
  role: PropTypes.string.isRequired,
};

Nav.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  role: state.user.role,
});

export default connect(mapStateToProps)(Nav);
