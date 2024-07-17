import React from 'react';
import { Route, Routes } from 'react-router-dom';
import QuizList from './components/quizlist/QuizList.js';
import QuizPage from './components/quizpage/QuizPage.js';
import ResultsPage from './components/resultpage/ResultsPage.js';
import About from './components/about/About.js';
import PrivacyPolicy from './components/privacy/PrivacyPolicy.js';
import './App.css';

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
        </Routes>
      </main>
    </div>
  );
}

export default App;
