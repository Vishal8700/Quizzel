import React from 'react';
import './About.css'

const About = () => {
  return (
    <div className="about-container">
      <h2>About Quizzel</h2>
      <p>
      Welcome to our interactive quiz application! 🎉 Whether you’re testing your knowledge, learning something new, or simply having fun, our app has you covered.
      </p>
      
      <h3>About the Developer</h3>
      <p>This app was developed by git_alien, a passionate software developer with expertise in building user-friendly web applications.</p>
      
      <div className="developer-links">
        <p>Find git_alien on:</p>
        <ul>
          <li><a href="https://github.com/Vishal8700" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/vishal-kumar12432/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
  );
};

export default About;
