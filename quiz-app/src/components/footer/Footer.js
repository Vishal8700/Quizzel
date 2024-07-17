import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import './Footer.css';
import logo from './logo.jpg'; // Import your Footer.css file

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
            <img src={logo} alt='logo' id='logo'>
            </img>
          <p>Copyright © {new Date().getFullYear()}</p>
          <p>All rights reserved | Quizzel</p>
        </div>
        <div className="footer-section">
          <h4>Info</h4>
          <ul>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagrame</a></li>
            <li><a href="https://x.com/?lang=en-in" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Reddit</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Featured Games</h4>
          <li><a href="https://poki.com" target="_blank" rel="noopener noreferrer">Poki Games</a></li>
          <li><a href="https://poki.com/en/g/temple-run-2" target="_blank" rel="noopener noreferrer">Temple Run</a></li>
          <li><a href="https://poki.com/en/g/blocky-puzzle" target="_blank" rel="noopener noreferrer">Blocks </a></li>
          <li><a href="https://poki.com/en/g/bubble-shooter-lak" target="_blank" rel="noopener noreferrer">Bubble Shooter</a></li>
          <li><a href="https://poki.com/en/g/spades" target="_blank" rel="noopener noreferrer">Spades</a></li>
        </div>
        <div className="footer-section">
          {/* Add about section here */}
          <p className='intro'>
          Quizzel game typically involves explaining the purpose <br/>of the game and how it works.
          Players answer <br/>questions on various topics to test their knowledge and compete <br/>for high scores. 
          It's an engaging way to learn and have fun! 🎯🧠🎮
            </p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="social-icons">
        <a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebookF /></a>
        <a href="https://x.com/?lang=en-in" aria-label="Twitter"><FaTwitter /></a>
      </div>
    </footer>
  );
};

export default Footer;
