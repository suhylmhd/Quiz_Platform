import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container home-container">
      <h1>Welcome to the Quiz Platform</h1>
      <p>Your journey to knowledge starts here.</p>
      <div className="button-group">
        <Link to="/quiz">
          <button className="btn btn-start">Start Quiz</button>
        </Link>
        <Link to="/admin">
          <button className="btn btn-admin">Admin Panel</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-login">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
