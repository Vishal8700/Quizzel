import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.jpg'; // Add your logo here

function Header() {
  const navigateToHome = () => {
    window.location.href = '/'; // Navigate to the home page
  };

  return (
    <header className="app-header">
      <div className="header-left" onClick={navigateToHome}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Quizzel</h1>
      </div>
      <nav className="header-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/privacy">Policies</Link>
      </nav>
    </header>
  );
}

export default Header;
