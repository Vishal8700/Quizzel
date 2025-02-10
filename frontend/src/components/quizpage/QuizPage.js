import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuizPage.css';
import axios from 'axios'; // Import axios

function QuizPage() {
    const { id } = useParams(); // Quiz ID from the URL
    const navigate = useNavigate();
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [timeLeft, setTimeLeft] = useState(300);
    const [loading, setLoading] = useState(true); // Add loading state
    const [currentQuestionIndex] = useState(0);


    useEffect(() => {
        console.log("Quiz ID from URL (quizId):", id); // CHECK ID
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`https://quizzel.onrender.com/api/quizzes/${id}`); // Replace with your backend URL
                const quizData = response.data;

                setQuizTitle(quizData.title);
                setQuestions(quizData.questions);
                setUserAnswers(new Array(quizData.questions.length).fill(null)); // Initialize userAnswers array
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setLoading(false); // Ensure loading is set to false even in case of error
                // Handle error appropriately (e.g., show an error message to the user)
            }
        };

        fetchQuiz();
    }, [id]);
 // eslint-disable-next-line 
    useEffect(() => {
        let timer;
        if (timeLeft > 0 && !loading) { // Only start timer if not loading
            timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            clearInterval(timer);
            handleSubmit();
        }
        return () => clearInterval(timer);
    }, [timeLeft, loading]);

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = answerIndex;
            return newAnswers;
        });

    };

    const handleDifficultyChange = (difficulty) => {
        setDifficulty(difficulty);
        switch (difficulty) {
            case 'easy':
                setTimeLeft(300); // 5 minutes for easy
                break;
            case 'medium':
                setTimeLeft(180); // 3 minutes for medium
                break;
            case 'hard':
                setTimeLeft(60); // 1 minute for hard
                break;
            default:
                setTimeLeft(300);
        }
    };

    const handleSubmit = () => {
        let numCorrect = 0;
        questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                numCorrect++;
            }
        });

        const numIncorrect = questions.length - numCorrect;

        navigate('/results', {
            state: { numCorrect, numIncorrect, questions, userAnswers }
        });
    };

    useEffect(() => {
        handleDifficultyChange('easy'); // Default difficulty and time on page load
    }, []);

    // Real-time feedback logic inside handleAnswerSelect
    const handleAnswerSelectWithFeedback = (questionIndex, answerIndex) => {
        handleAnswerSelect(questionIndex, answerIndex); // Update user's answer
    };

    if (loading) {
        return <div>Loading Quiz...</div>; // Or a loading spinner
    }


   
    const TimerSVG = () => (
        <svg className="timer-svg" viewBox="0 0 36 36">
            <path
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#444"
                strokeWidth="1"
                strokeDasharray={`${(timeLeft / (difficulty === 'easy' ? 300 : difficulty === 'medium' ? 180 : 60)) * 100}, 100`}
            />
        </svg>
    );

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">
                    <svg viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                    </svg>
                </div>
                <p>Loading Quiz...</p>
            </div>
        );
    }

    return (
        <div className="quiz-page-container">
            <div className="quiz-header">
                <svg className="quiz-icon" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
                </svg>
                <h1>Quiz: {quizTitle}</h1>
            </div>

            <div className="difficulty-selector">
                <div className="difficulty-buttons">
                    {['easy', 'medium', 'hard'].map((level) => (
                        <button
                            key={level}
                            onClick={() => handleDifficultyChange(level)}
                            className={`difficulty-button ${difficulty === level ? 'active' : ''}`}
                        >
                            <span className="difficulty-icon">
                                {level === 'easy' && '🌟'}
                                {level === 'medium' && '⚡'}
                                {level === 'hard' && '🔥'}
                            </span>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="timer-container">
                <TimerSVG />
                <span className="timer-text">
                    {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
                </span>
            </div>

            <div className="progress-bar">
                <div 
                    className="progress-fill"
                    style={{ width: `${(userAnswers.filter(answer => answer !== null).length / questions.length) * 100}%` }}
                />
            </div>

            {questions.map((question, index) => (
                <div 
                    key={index} 
                    className={`quiz-question ${index === currentQuestionIndex ? 'active' : ''}`}
                >
                    <div className="question-number">Question {index + 1}</div>
                    <h3>{question.question}</h3>
                    <div className="quiz-answers">
                        {question.options.map((answer, answerIndex) => (
                            <label 
                                key={answerIndex}
                                className={`answer-option ${userAnswers[index] === answerIndex ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${index}`}
                                    checked={userAnswers[index] === answerIndex}
                                    onChange={() => handleAnswerSelectWithFeedback(index, answerIndex)}
                                />
                                <span className="radio-custom"></span>
                                <span className="answer-text">{answer}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

            <button 
                className="submit-button"
                onClick={handleSubmit}
            >
                <span className="submit-text">Submit Quiz</span>
                <svg className="submit-arrow" viewBox="0 0 24 24">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
            </button>
        </div>
    );
}

export default QuizPage;
