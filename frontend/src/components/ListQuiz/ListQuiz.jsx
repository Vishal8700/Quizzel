// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './ListQuiz.css';

// function ListQuiz() {
//     const [quizzes, setQuizzes] = useState([]);
//     const [deleteConfirmation, setDeleteConfirmation] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch quizzes created by the logged-in user
//         const fetchQuizzes = async () => {
//             try {
//                 const token = localStorage.getItem('token'); // Get the token from local storage

//                 const response = await axios.get('http://localhost:3001/api/quizzes', {
//                     headers: {
//                         Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//                     },
//                 });
//                 setQuizzes(response.data);
//             } catch (error) {
//                 console.error("Error fetching quizzes:", error);
//                 // Handle error (e.g., redirect to login if unauthorized)
//                 if (error.response && error.response.status === 403) {
//                     navigate('/login');
//                 }
//             }
//         };

//         fetchQuizzes();
//     }, [navigate]);

//     const handleDeleteQuiz = async (quizId) => {
//         if (deleteConfirmation === 'sudo delete') {
//             try {
//                 const token = localStorage.getItem('token');
//                 await axios.delete(`http://localhost:3001/api/quizzes/${quizId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 // Update the quizzes list after successful deletion
//                 setQuizzes(quizzes.filter((quiz) => quiz.quizId !== quizId));
//                 setDeleteConfirmation(''); // Clear the confirmation input
//             } catch (error) {
//                 console.error("Error deleting quiz:", error);
//                 // Handle error (e.g., display an error message)
//             }
//         } else {
//             alert('Please type "sudo delete" to confirm deletion.');
//         }
//     };

//     return (
//         <div className="list-quiz-container">
//             <h1>My Quizzes</h1>
//             {quizzes.length === 0 ? (
//                 <p>No quizzes created yet.</p>
//             ) : (
//                 <ul>
//                     {quizzes.map((quiz) => (
//                         <li key={quiz.quizId}>
//                             {quiz.title}
//                             <button onClick={() => handleDeleteQuiz(quiz.quizId)}>Delete</button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//             <input
//                 type="text"
//                 placeholder="Type 'sudo delete' to confirm"
//                 value={deleteConfirmation}
//                 onChange={(e) => setDeleteConfirmation(e.target.value)}
//             />

//         </div>
//     );
// }

// export default ListQuiz;

// ListQuiz.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ListQuiz.css';

function ListQuiz() {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/quizzes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuizzes(response.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                if (error.response && error.response.status === 403) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [navigate]);

    const initiateDelete = (quizId) => {
        setSelectedQuizId(quizId);
        setShowModal(true);
        setDeleteConfirmation('');
    };

    const handleDeleteQuiz = async () => {
        if (deleteConfirmation === 'sudo delete') {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3001/api/quizzes/${selectedQuizId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuizzes(quizzes.filter((quiz) => quiz.quizId !== selectedQuizId));
                setShowModal(false);
                setDeleteConfirmation('');
            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading your quizzes...</p>
            </div>
        );
    }

    return (
        <div className="list-quiz-container-it">
            <div className="header-it">
                <h1>My Quizzes</h1>
            </div>

            {quizzes.length === 0 ? (
                <div className="empty-state">
                    <svg className="empty-icon" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <p>No quizzes created yet.</p>
                    <button className="create-button" onClick={() => navigate('/quiz-creator')}>
                        Create Your First Quiz
                    </button>
                </div>
            ) : (
                <div className="quiz-list-it">
                    {quizzes.map((quiz) => (
                        <div className="quiz-card-it" key={quiz.quizId}>
                            <div className="quiz-content-it">
                                <h3>{quiz.title}</h3>
                                {quiz.description && <p>{quiz.description}</p>}
                            </div>
                            <div className="quiz-actions-it">
                                <button 
                                    className="edit-button"
                                    onClick={() => navigate(`/edit-quiz/${quiz.quizId}`)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="delete-button"
                                    onClick={() => initiateDelete(quiz.quizId)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <svg className="warning-icon" viewBox="0 0 24 24">
                            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                        </svg>
                        <h2>Confirm Deletion</h2>
                        <p>This action cannot be undone. Please type 'sudo delete' to confirm.</p>
                        <input
                            type="text"
                            placeholder="Type 'sudo delete' to confirm"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            className={deleteConfirmation === 'sudo delete' ? 'valid' : ''}
                        />
                        <div className="modal-actions">
                            <button 
                                className="cancel-button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`confirm-button ${deleteConfirmation === 'sudo delete' ? 'active' : ''}`}
                                onClick={handleDeleteQuiz}
                                disabled={deleteConfirmation !== 'sudo delete'}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListQuiz;