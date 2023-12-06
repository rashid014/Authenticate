import React, { useState } from 'react';
import './loginComponent.css';
import { Link } from 'react-router-dom';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.token);
        setError('');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white text-center">
              <h2>Login</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-danger mb-3">{error}</div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
             
              <div className="mt-3">
                <p className="text-center">
                  Don't have an account? <Link to="/signup">Signup</Link>
                </p>
              </div>
              </form>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
