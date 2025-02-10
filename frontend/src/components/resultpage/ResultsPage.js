

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import './ResultsPage.css';

// PDF Document component (unchanged)
const ResultDocument = ({ numCorrect, questions, userAnswers }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Quiz Results</Text>
                <Text style={styles.text}>You got {numCorrect} out of {questions.length} questions correct.</Text>
                <Text style={styles.text}>Your score: {(numCorrect / questions.length * 100).toFixed(2)}%</Text>
            </View>
            {questions.map((question, index) => (
                <View key={index} style={styles.question}>
                    <Text style={styles.questionText}>{question.question}</Text>
                    <Text style={styles.answerText}>Your Answer: {question.options[userAnswers[index]]}</Text>
                    <Text style={styles.answerText}>Correct Answer: {question.options[question.correctAnswer]}</Text>
                </View>
            ))}
        </Page>
    </Document>
);

// Styles for PDF document (unchanged)
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 30,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 10,
    },
    text: {
        marginBottom: 5,
    },
    question: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    questionText: {
        fontSize: 14,
        marginBottom: 5,
    },
    answerText: {
        marginBottom: 5,
    },
});

function ResultsPage() {
    const location = useLocation();
    const { numCorrect, numIncorrect, questions, userAnswers } = location.state;
    const [animatedItems, setAnimatedItems] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedItems(questions.map((_, index) => index));
        }, 100);
        return () => clearTimeout(timer);
    }, [questions]);

    const totalQuestions = questions.length;

    return (
        <div className="results-page">
            <div className="results-container">
                <h1 className="results-title">Quiz Results</h1>
                

                <p className="score-text">
                    You got <span className="correct-score">{numCorrect}</span> out of {totalQuestions} questions correct.
                </p>
                <p className="score-text">
                    You got <span className="incorrect-score">{numIncorrect}</span> questions wrong.
                </p>

                <h2 className="incorrect-answers-title">Incorrect Answers</h2>
                {questions.map((question, index) => {
                    if (userAnswers[index] !== question.correctAnswer) {
                        return (
                            <div 
                                key={index}
                                className={`incorrect-answer ${animatedItems.includes(index) ? 'fade-in' : ''}`}
                            >
                                <h3 className="question-text">{question.question}</h3>
                                <p className="user-answer">
                                    Your answer: <span>{question.options[userAnswers[index]]}</span>
                                </p>
                                <p className="correct-answer">
                                    Correct answer: <span>{question.options[question.correctAnswer]}</span>
                                </p>
                            </div>
                        );
                    }
                    return null;
                })}

                <div className="download-button-container">
                    <PDFDownloadLink 
                        document={<ResultDocument numCorrect={numCorrect} numIncorrect={numIncorrect} questions={questions} userAnswers={userAnswers} />} 
                        fileName="quiz_results.pdf"
                        className="download-button"
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Preparing document...' : 'Download Result (PDF)'
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    );
}

export default ResultsPage;
