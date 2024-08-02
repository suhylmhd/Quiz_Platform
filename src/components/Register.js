// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExists = existingUsers.some(user => user.username === username);

    if (isUserExists) {
      alert('Username already exists!');
    } else {
      const newUser = { username, password };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      alert('Registration successful! Please log in.');
      navigate('/login');
    }
  };

  return (
    <div className="container register-container">
      <div className="register-box">
        <h1 className="h1">Create Account</h1>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="button" onClick={handleRegister} className="btn btn-register">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
