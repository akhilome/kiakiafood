import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => (
  <div>
    This is the login page See
    {' '}
    <Link to="/signup">signup</Link>
  </div>
);

export default LoginPage;
