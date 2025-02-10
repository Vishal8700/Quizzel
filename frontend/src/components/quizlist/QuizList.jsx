
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './QuizList.css';
import axios from 'axios';

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/quizzes');
                const backendQuizzes = response.data.map(quiz => ({
                    id: quiz.quizId,
                    title: quiz.title,
                    image: quiz.imageUrl || '',
                }));
                setQuizzes(backendQuizzes);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError('Failed to load quizzes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <svg className="loading-svg" viewBox="0 0 50 50">
                    <circle className="loading-circle" cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5"/>
                </svg>
                <p>Loading Quizzes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <svg className="error-svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="quiz-list">
            <div className="header">
               
                <h2>Available Quizzes</h2>
                <p className="subtitle">Choose your challenge</p>
            </div>

            <div className="quiz-grid">
                {quizzes.map((quiz) => (
                    <Link to={`/quiz/${quiz.id}`} key={quiz.id} className="quiz-item">
                        <div className="quiz-card">
                            <div className="image-container">
                                <img
                                    src={quiz.image || 'default-placeholder.png'}
                                    alt={quiz.title}
                                />
                                <div className="overlay-item">
                                    <svg className="play-icon" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="quiz-info">
                                <h3>{quiz.title}</h3>
                                <svg className="arrow-icon" viewBox="0 0 24 24">
                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="footer">
                <svg className="footer-decoration" viewBox="0 0 100 20">
                    <circle className="dot" cx="50" cy="10" r="3"/>
                    <circle className="dot" cx="30" cy="10" r="3"/>
                    <circle className="dot" cx="70" cy="10" r="3"/>
                </svg>
                <p className="coming-soon">More Quizzes Coming Soon!</p>
            </div>
        </div>
    );
}

export default QuizList;