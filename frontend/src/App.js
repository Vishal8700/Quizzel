import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuizList from './components/quizlist/QuizList.jsx';
import QuizPage from './components/quizpage/QuizPage.js';
import ResultsPage from './components/resultpage/ResultsPage.js';
import About from './components/about/About.js';
import PrivacyPolicy from './components/privacy/PrivacyPolicy.js';
import './App.css';
import SignUp from './components/auth/Signup.jsx';
import SignIn from './components/auth/Signin.jsx';
import CreateQuiz from './components/quiz/quiz.jsx';
import QuizCreator from './components/QuizCreater/QuizCreater.jsx';
import Manage from './components/Manage/Manage.jsx';
import ListQuiz from './components/ListQuiz/ListQuiz.jsx';

function App() {
  return (
    <div className="app-container">
      <main className="app-content">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/create-quiz" element={<CreateQuiz/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/quiz-creator" element={<QuizCreator/>} />
          <Route path="/manage" element={<Manage/>} />

          <Route path="/list-quizzes" element={<ListQuiz/>} />


        </Routes>
      </main>
    </div>
  );
}

export default App;
