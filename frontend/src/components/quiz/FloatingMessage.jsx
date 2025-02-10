import React from 'react';
import { useNavigate } from 'react-router-dom';

function FloatingMessage({ message, onSignUp }) {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="floating-message">
      <p>{message}</p>
      <button onClick={onSignUp}>Sign Up</button>
      <button onClick={handleHomeRedirect}>Home</button> {/* Home button */}
    </div>
  );
}

export default FloatingMessage;
