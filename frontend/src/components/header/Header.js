import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './logo.jpg'; // Add your logo here

function Header() {
  const navigate = useNavigate();
  
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null; // Check if token exists
  };

  return (
    <header className="app-header">
      <div className="header-left" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="logo" />
        <h1>Quizzel</h1>
      </div>
      <nav className="header-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/privacy">Policies</Link>
        {isAuthenticated() ? (
          <>
            <Link to="/manage" className="ctr-btn">Manage & Create</Link>
          </>
        ) : (
          <>
            <Link to="/create-quiz" className="ctr-btn">Create Quiz</Link>
            <Link to="/login" className="btn">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
