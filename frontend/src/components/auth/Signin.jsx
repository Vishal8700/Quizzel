import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Link to the CSS file
import axios from 'axios'; // Import Axios

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // To handle error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the sign-in endpoint
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        
        // Store the JWT token in local storage
        localStorage.setItem('token', response.data.token); // Store JWT token

        navigate('/'); // Navigate to home page after successful login
      }
    } catch (err) {
      console.error('SignIn error:', err);
      setError(err.response?.data?.message || 'An error occurred during sign-in.');
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
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
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
            <button type="submit">Sign In</button>
            <p className="terms">
              By signing in, you agree to our{' '}
              <Link to="/terms">Terms and Services</Link>
            </p>
          </form>
          <p className="no-account">
            Don't have an account? <Link to="/signup">Sign Up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
