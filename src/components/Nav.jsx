import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutLink from './Logout';

export const Nav = ({ isLoggedIn, role, cartItemsCount }) => {
  const navContent = () => {
    if (isLoggedIn && role === 'customer') {
      return (
        <Fragment>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/cart">
Cart [
              {cartItemsCount}
]
            </Link>
          </li>
          <li>
            <Link to="/order-history">Order History</Link>
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
          <li>
            <LogoutLink />
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
  cartItemsCount: PropTypes.number,
};

Nav.defaultProps = {
  isLoggedIn: false,
  cartItemsCount: 0,
};

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  role: state.user.role,
  cartItemsCount: Object.keys(state.cart).length,
});

export default connect(mapStateToProps)(Nav);
