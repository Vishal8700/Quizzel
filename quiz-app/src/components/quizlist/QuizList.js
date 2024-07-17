import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './QuizList.css';

import generalKnowledgeImage from './quiz-1-o.avif';
import scienceTechImage from './wordpress-quiz-plugins.jpg';
import historyGeoImage from './798j.png';

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchedQuizzes = [
      { id: 1, title: 'General Knowledge Quiz', image: generalKnowledgeImage },
      { id: 2, title: 'Science and Technology Quiz', image: scienceTechImage },
      { id: 3, title: 'History and Geography Quiz', image: historyGeoImage },
    ];
    setQuizzes(fetchedQuizzes);
  }, []);

  return (
    <div className="quiz-list">
      <div className="header_text">
        <h2>Available Quizes </h2>
      </div>

      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <Link to={`/quiz/${quiz.id}`}>
              <img src={quiz.image} alt={quiz.title} />
              <p>{quiz.title}</p>
            </Link>
          </div>
        ))}
      </div>
      <p className='down-text'>More Quizes add soon !</p>
    </div>
  );
}

export default QuizList;
