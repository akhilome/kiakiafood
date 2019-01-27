import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <section className="hero">
    <h2>Quell Your Hunger in Minutes</h2>
    <Link to="/menu">
      <button type="button" className="btn-primary">
        Get Food ⟶
      </button>
    </Link>
  </section>
);

export default HomePage;
