import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaRedditAlien, FaDiscord } from 'react-icons/fa';
import './Footer.css';
import logo from './logo.jpg';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo and Copyright Section */}
          <div className="footer-section">
            <div className="logo-container">
              <img src={logo} alt="logo" className="logo-it" />
              <svg className="brand-icon" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p className="copyright">
              Copyright © {new Date().getFullYear()}
              <br />
              All rights reserved | Quizzel
            </p>
          </div>

          {/* Info Links Section */}
          <div className="footer-section">
            <h4 className="section-title">Connect</h4>
            <ul className="footer-links">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" /> Instagram
              </a></li>
              <li><a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon" /> Twitter / X
              </a></li>
              <li><a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
                <FaRedditAlien className="social-icon" /> Reddit
              </a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <FaDiscord className="social-icon" /> Discord
              </a></li>
            </ul>
          </div>

          {/* Games Section */}
          <div className="footer-section">
            <h4 className="section-title">Featured Games</h4>
            <ul className="footer-links">
              <li><a href="https://poki.com" target="_blank" rel="noopener noreferrer">Poki Games</a></li>
              <li><a href="https://poki.com/en/g/temple-run-2" target="_blank" rel="noopener noreferrer">Temple Run</a></li>
              <li><a href="https://poki.com/en/g/blocky-puzzle" target="_blank" rel="noopener noreferrer">Blocks</a></li>
              <li><a href="https://poki.com/en/g/bubble-shooter-lak" target="_blank" rel="noopener noreferrer">Bubble Shooter</a></li>
              <li><a href="https://poki.com/en/g/spades" target="_blank" rel="noopener noreferrer">Spades</a></li>
            </ul>
          </div>

          {/* About Section */}
          <div className="footer-section">
            <h4 className="section-title">About Us</h4>
            <p className="about-text">
              Quizzel is your gateway to knowledge and fun! Test your wit and wisdom 
              across diverse topics while competing for high scores. Perfect for learning 
              enthusiasts and casual gamers alike. 🎯🧠🎮
            </p>
            <div className="social-icons-container">
              <a href="#" className="social-link"><FaFacebookF /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaDiscord /></a>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="footer-wave">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;