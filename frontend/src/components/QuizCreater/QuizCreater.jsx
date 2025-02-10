import React, { useState } from 'react';
import './QuizCreator.css';
import axios from 'axios'; // Import Axios for making requests

const QuizCreator = () => {
    const [quizData, setQuizData] = useState({
        title: '',
        imageUrl: '',
        questions: [
            {
                question: '',
                options: ['', '', '', ''],
                correctAnswer: 0
            }
        ]
    });

    const [imageError, setImageError] = useState('');
    const [submissionError, setSubmissionError] = useState('');

    const validateImageUrl = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setQuizData(prev => ({ ...prev, imageUrl: url }));
        
        if (url && !validateImageUrl(url)) {
            setImageError('Please enter a valid image URL (ending with .jpg, .jpeg, .png, or .gif)');
        } else {
            setImageError('');
        }
    };

    const addQuestion = () => {
        if (quizData.questions.length < 10) {
            setQuizData(prev => ({
                ...prev,
                questions: [...prev.questions, {
                    question: '',
                    options: ['', '', '', ''],
                    correctAnswer: 0
                }]
            }));
        }
    };

    const removeQuestion = (index) => {
        setQuizData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const updateQuestion = (index, field, value, optionIndex = null) => {
        setQuizData(prev => {
            const newQuestions = [...prev.questions];
            if (optionIndex !== null) {
                newQuestions[index].options[optionIndex] = value;
            } else if (field === 'correctAnswer') {
                newQuestions[index].correctAnswer = parseInt(value);
            } else {
                newQuestions[index][field] = value;
            }
            return { ...prev, questions: newQuestions };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (quizData.imageUrl && !validateImageUrl(quizData.imageUrl)) {
            setImageError('Please enter a valid image URL before submitting');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/create-quiz', {
                title: quizData.title,
                imageUrl: quizData.imageUrl,
                questions: quizData.questions
            }, { 
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include token if necessary
            });

            console.log('Quiz Data:', response.data);
            // Handle successful submission (e.g., redirect or show success message)
            
        } catch (error) {
            console.error('Error submitting quiz:', error);
            setSubmissionError('Failed to submit quiz. Please try again.');
        }
    };

    return (
        <div className="quiz-creator">
            <form onSubmit={handleSubmit} className="quiz-form">
                {/* Title Section */}
                <div className="form-section">
                    <label>Quiz Title</label>
                    <input
                        type="text"
                        value={quizData.title}
                        onChange={(e) => setQuizData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter quiz title"
                        required
                    />
                </div>

                {/* Image URL Section */}
                <div className="form-section">
                    <label>Image URL</label>
                    <div className="image-url-container">
                        <input
                            type="url"
                            value={quizData.imageUrl}
                            onChange={handleImageUrlChange}
                            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                            className={imageError ? 'error' : ''}
                        />
                        {imageError && <div className="error-message">{imageError}</div>}
                    </div>
                    {quizData.imageUrl && !imageError && (
                        <div className="image-preview">
                            <img
                                src={quizData.imageUrl}
                                alt="Quiz preview"
                                onError={() => setImageError('Failed to load image. Please check the URL.')}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setQuizData(prev => ({ ...prev, imageUrl: '' }));
                                    setImageError('');
                                }}
                                className="remove-image"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </div>

                {/* Questions Section */}
                <div className="questions-section">
                    <div className="questions-header">
                        <h2>Questions ({quizData.questions.length}/10)</h2>
                        <button
                            type="button"
                            onClick={addQuestion}
                            disabled={quizData.questions.length >= 10}
                            className="add-question-btn"
                        >
                            + Add Question
                        </button>
                    </div>

                    {quizData.questions.map((question, qIndex) => (
                        <div key={qIndex} className="question-card">
                            <div className="question-header">
                                <h3>Question {qIndex + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="remove-question-btn"
                                >
                                    ×
                                </button>
                            </div>

                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                placeholder="Enter question"
                                className="question-input"
                                required
                            />

                            <div className="options-container">
                                {question.options.map((option, oIndex) => (
                                    <div key={oIndex} className="option-item">
                                        <input
                                            type="radio"
                                            name={`correct-${qIndex}`}
                                            checked={question.correctAnswer === oIndex}
                                            onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => updateQuestion(qIndex, 'options', e.target.value, oIndex)}
                                            placeholder={`Option ${oIndex + 1}`}
                                            className="option-input"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {submissionError && <div className="error-message">{submissionError}</div>} {/* Display submission error */}

                <button type="submit" className="submit-btn">
                    Save Quiz
                </button>
            </form>
        </div>
    );
};

export default QuizCreator;
