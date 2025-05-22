// Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Sugar Exchange Logo" />
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#market">Market</a>
        <a href="#portfolio">Portfolio</a>
      </nav>
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="signup">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
