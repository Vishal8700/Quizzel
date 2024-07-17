import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './QuizPage.css';

function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const quizzes = {
      1: [
        { id: 1, question: 'What is the capital of France?', answers: ['Paris', 'London', 'Berlin', 'Madrid'], correctAnswer: 0 },
        { id: 2, question: 'What is the largest planet in our solar system?', answers: ['Earth', 'Jupiter', 'Saturn', 'Mars'], correctAnswer: 1 },
        { id: 3, question: 'Who wrote "To Kill a Mockingbird"?', answers: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'], correctAnswer: 0 },
        { id: 4, question: 'Which ocean is the largest?', answers: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 3 },
        { id: 5, question: 'What is the tallest mountain in the world?', answers: ['K2', 'Mount Everest', 'Kangchenjunga', 'Lhotse'], correctAnswer: 1 },
        { id: 6, question: 'Who painted the Mona Lisa?', answers: ['Vincent van Gogh', 'Claude Monet', 'Pablo Picasso', 'Leonardo da Vinci'], correctAnswer: 3 },
        { id: 7, question: 'What is the smallest country in the world?', answers: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'], correctAnswer: 1 },
        { id: 8, question: 'Which element has the chemical symbol O?', answers: ['Oxygen', 'Gold', 'Silver', 'Osmium'], correctAnswer: 0 },
        { id: 9, question: 'In which year did the Titanic sink?', answers: ['1912', '1905', '1920', '1918'], correctAnswer: 0 },
        { id: 10, question: 'Who was the first person to walk on the moon?', answers: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Michael Collins'], correctAnswer: 1 }
      ],
      2: [
        { id: 1, question: 'What is the speed of light?', answers: ['299,792 km/s', '150,000 km/s', '500,000 km/s', '1,000,000 km/s'], correctAnswer: 0 },
        { id: 2, question: 'Who developed the theory of relativity?', answers: ['Isaac Newton', 'Galileo Galilei', 'Albert Einstein', 'Nikola Tesla'], correctAnswer: 2 },
        { id: 3, question: 'What does DNA stand for?', answers: ['Deoxyribonucleic Acid', 'Deoxyribogenetic Acid', 'Deoxyribonitric Acid', 'Deoxyribose Nucleic Acid'], correctAnswer: 0 },
        { id: 4, question: 'What is the hardest natural substance on Earth?', answers: ['Gold', 'Iron', 'Diamond', 'Platinum'], correctAnswer: 2 },
        { id: 5, question: 'What is the main gas found in the air we breathe?', answers: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Nitrogen'], correctAnswer: 3 },
        { id: 6, question: 'What planet is known as the Red Planet?', answers: ['Mars', 'Venus', 'Jupiter', 'Saturn'], correctAnswer: 0 },
        { id: 7, question: 'Who is known as the father of computers?', answers: ['Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs'], correctAnswer: 0 },
        { id: 8, question: 'What is the symbol for potassium?', answers: ['K', 'P', 'Po', 'Pt'], correctAnswer: 0 },
        { id: 9, question: 'What is the chemical formula for water?', answers: ['H2O', 'O2', 'CO2', 'H2O2'], correctAnswer: 0 },
        { id: 10, question: 'Who discovered penicillin?', answers: ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Albert Schweitzer'], correctAnswer: 1 }
      ],
      3: [
        { id: 1, question: 'Who was the first President of the United States?', answers: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'], correctAnswer: 0 },
        { id: 2, question: 'In which year did World War II end?', answers: ['1945', '1939', '1918', '1950'], correctAnswer: 0 },
        { id: 3, question: 'What is the capital of Japan?', answers: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correctAnswer: 2 },
        { id: 4, question: 'Which country is known as the Land of the Rising Sun?', answers: ['China', 'Japan', 'Thailand', 'Vietnam'], correctAnswer: 1 },
        { id: 5, question: 'What was the ancient name of Iraq?', answers: ['Babylonia', 'Mesopotamia', 'Sumer', 'Persia'], correctAnswer: 1 },
        { id: 6, question: 'Which explorer discovered America in 1492?', answers: ['Vasco da Gama', 'Christopher Columbus', 'Marco Polo', 'Ferdinand Magellan'], correctAnswer: 1 },
        { id: 7, question: 'What is the largest desert in the world?', answers: ['Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Kalahari Desert'], correctAnswer: 0 },
        { id: 8, question: 'In which continent is the Amazon rainforest located?', answers: ['Africa', 'Asia', 'South America', 'Australia'], correctAnswer: 2 },
        { id: 9, question: 'What is the longest river in the world?', answers: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'], correctAnswer: 1 },
        { id: 10, question: 'Which ancient civilization built the pyramids?', answers: ['Romans', 'Greeks', 'Egyptians', 'Mayans'], correctAnswer: 2 }
      ]
    };

    setQuestions(quizzes[id] || []);
  }, [id]);

  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      clearInterval(timer);
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

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
    const numCorrect = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    const numIncorrect = questions.length - numCorrect;

    navigate('/results', {
      state: { numCorrect, numIncorrect, questions, userAnswers }
    });
  };

  // Start quiz immediately on component mount
  useEffect(() => {
    handleDifficultyChange('easy'); // Default difficulty and time on page load
  }, []);

  return (
    <div className="quiz-page-container">
      <h1>Quiz: {questions.length} Questions</h1>
      <div className="difficulty-buttons">
        <button onClick={() => handleDifficultyChange('easy')} className={difficulty === 'easy' ? 'active' : ''}>Easy (5 min)</button>
        <button onClick={() => handleDifficultyChange('medium')} className={difficulty === 'medium' ? 'active' : ''}>Medium (3 min)</button>
        <button onClick={() => handleDifficultyChange('hard')} className={difficulty === 'hard' ? 'active' : ''}>Hard (1 min)</button>
      </div>
      <div className="timer">Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</div>
      {questions.map((question, index) => (
        <div key={question.id} className="quiz-question">
          <h3>{question.question}</h3>
          <div className="quiz-answers">
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={userAnswers[index] === answerIndex}
                  onChange={() => handleAnswerSelect(index, answerIndex)}
                />
                {answer}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="quiz-submit-button" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}

export default QuizPage;