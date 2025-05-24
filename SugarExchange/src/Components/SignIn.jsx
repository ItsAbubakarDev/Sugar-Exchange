// SignIn.jsx
import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    error: '',
    success: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setStatus({ loading: false, error: '', success: '' });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      // Example POST call (to be replaced with real endpoint)
      const response = await fetch('https://your-backend-api.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      setStatus({ loading: false, error: '', success: 'Login successful!' });

      // Redirect or set auth token here
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: '' });
    }
  };

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={handleSubmit}>
        <h2 className="signin-title">Welcome Back</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="signin-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="signin-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signin-button" disabled={status.loading}>
          {status.loading ? 'Signing In...' : 'Sign In'}
        </button>

        {status.error && <div className="signin-message error">{status.error}</div>}
        {status.success && <div className="signin-message success">{status.success}</div>}
      </form>
    </div>
  );
};

export default SignIn;
