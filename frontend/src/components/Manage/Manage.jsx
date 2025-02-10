// Manage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Manage.css';

function Manage() {
    const navigate = useNavigate();

    const handleCreateQuiz = () => {
        navigate('/quiz-creator');
    };

    const handleShowQuizzes = () => {
        navigate('/list-quizzes');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="manage-container">
            <div className="header">
                <svg className="logo" viewBox="0 0 24 24" width="48" height="48">
                    <path 
                        fill="currentColor" 
                        d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                        fill="currentColor"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                </svg>
                <h1>Quiz Management Dashboard</h1>
                <p>Create and manage your quizzes with ease</p>
            </div>

            <div className="cards-container">
                <div className="card" onClick={handleCreateQuiz}>
                    <div className="card-icon create-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path 
                                fill="currentColor" 
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
                            />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h2>Create Quiz</h2>
                        <p>Design a new quiz from scratch</p>
                    </div>
                </div>

                <div className="card" onClick={handleShowQuizzes}>
                    <div className="card-icon list-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path 
                                fill="currentColor" 
                                d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
                            />
                        </svg>
                    </div>
                    <div className="card-content">
                        <h2>Show Quizzes</h2>
                        <p>View and manage existing quizzes</p>
                    </div>
                </div>
            </div>

            <button className="logout-button" onClick={handleLogout}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path 
                        fill="currentColor" 
                        d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                    />
                </svg>
                <span>Logout</span>
            </button>
        </div>
    );
}

export default Manage;