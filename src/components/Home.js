import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="container home-container">
      <h1>Welcome to the Quiz Platform</h1>
      <div className="button-group">
        <Link to="/quiz">
          <button className="btn btn-green">Start Quiz</button>
        </Link>
        <Link to="/admin">
          <button className="btn btn-primary">Admin Panel</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-success">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
