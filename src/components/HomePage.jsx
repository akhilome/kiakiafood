import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const HomePage = () => (
  <div>
    <Nav />
    <section className="hero">
      <h2>Quell Your Hunger in Minutes</h2>
      <Link to="/menu">
        <button type="button" className="btn-primary">
          Get Food ⟶
        </button>
      </Link>
    </section>
  </div>
);

export default HomePage;
