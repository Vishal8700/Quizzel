import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './Auth.css';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Submitting signup with:', { firstName, lastName, email, password });
      // Make a POST request to the signup endpoint
      const response = await axios.post('https://quizzel.onrender.com/api/signup', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('User created successfully:', response.data);
        navigate('/login'); // Redirect to Login page after successful signup
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'An error occurred during signup.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Create Your First Quiz</h1>
        <p>
          Start with Free Account Today and Turn Your Quiz into a Marketing Machine.<br />
          No Credit Card Required.
        </p>
      </div>
      <div className="auth-right">
        <div className="promo-banner">
          Try it free for 7 days then $20/mo. thereafter
        </div>
        <div className="auth-form">
          <h2>Sign Up</h2>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
            <p className="terms">
              By signing up, you agree to our{' '}
              <Link to="/terms">Terms and Services</Link>
            </p>
          </form>
          <p className="no-account">
            Already have an account? <Link to="/login">Sign In here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
