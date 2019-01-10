import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <header className="transparent">
    <div className="site-title">
      <h2>
        <Link to="/">Kiakia Food</Link>
      </h2>
    </div>
    <nav>
      <ul>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Nav;
