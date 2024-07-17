import React from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import './ResultsPage.css';

// PDF Document component
const ResultDocument = ({ numCorrect, numIncorrect, questions, userAnswers }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Quiz Results</Text>
      <Text>
        You got {numCorrect} out of {questions.length} questions correct.
      </Text>
      <Text>You got {numIncorrect} questions wrong.</Text>
      <Text style={styles.subHeader}>Incorrect Answers:</Text>
      {questions.map((question, index) => {
        if (userAnswers[index] !== question.correctAnswer) {
          return (
            <View key={question.id} style={styles.answerContainer}>
              <Text>{question.question}</Text>
              <Text>Your answer: {question.answers[userAnswers[index]]}</Text>
              <Text>Correct answer: {question.answers[question.correctAnswer]}</Text>
            </View>
          );
        }
        return null;
      })}
    </Page>
  </Document>
);

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  answerContainer: {
    marginBottom: 10,
  },
});

function ResultsPage() {
  const location = useLocation();
  const { numCorrect, numIncorrect, questions, userAnswers } = location.state;

  return (
    <div className="results-page-container">
      <h1>Quiz Results</h1>
      <p className="score">
        You got {numCorrect} out of {questions.length} questions correct.
      </p>
      <p className="score">You got {numIncorrect} questions wrong.</p>
      <h2>Incorrect Answers</h2>
      {questions.map((question, index) => {
        if (userAnswers[index] !== question.correctAnswer) {
          return (
            <div key={question.id} className="incorrect-answer">
              <h3>{question.question}</h3>
              <p>
                Your answer: {question.answers[userAnswers[index]]}
              </p>
              <p>
                Correct answer: {question.answers[question.correctAnswer]}
              </p>
            </div>
          );
        }
        return null;
      })}
      <div className="download-button-container">
        <PDFDownloadLink document={<ResultDocument numCorrect={numCorrect} numIncorrect={numIncorrect} questions={questions} userAnswers={userAnswers} />} fileName="quiz_results.pdf">
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Download Result (PDF)'
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
}

export default ResultsPage;
