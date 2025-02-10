import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingMessage from './FloatingMessage'; // Import the floating message component
import './quiz.css'; // Add your CSS file here
function CreateQuiz() {
  const [showMessage, setShowMessage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setShowMessage(true); // Show floating message if not authenticated
    }
  }, []);

  const handleCreateQuiz = () => {
    if (!isLoggedIn) {
      setShowMessage(true); // Show floating message if not authenticated
      return; // Prevent further execution
    }
    else{
        navigate('/quiz-creator');
    }

    // Proceed with quiz creation logic here
    console.log("Creating quiz...");
    // Add your quiz creation form or logic here
  };

  const handleSignUp = () => {
    navigate('/signup'); // Redirect to signup page
    setShowMessage(false); // Close the message
  };

  return (
    <div className='create-quiz-container'>
      {isLoggedIn ? (
        <button onClick={handleCreateQuiz}>Start Creating Quiz</button>
        
      ) : (
        showMessage && (
          <FloatingMessage 
            message="You need to be logged in to create a quiz. Would you like to sign up?"
            onSignUp={handleSignUp} 
          />
        )
      )}
    </div>
  );
}

export default CreateQuiz;
