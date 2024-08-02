import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(user => user.username === username && user.password === password);
  
    if (user) {
      alert('Login successful!');
      navigate('/');
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
    <div className="container login-container">
      <div className="login-box">
        <h1 className='h1'>Login</h1>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="button" onClick={handleLogin} className="btn btn-login">
          Login
        </button>
        <Link to="/register">
          <button className=" btn btn-register">Create Account</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
