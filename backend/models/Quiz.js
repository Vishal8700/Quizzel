const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: false},
    questions: [
        {
            question: { type: String, required: true },
            options: [{ type: String, required: true }],
            correctAnswer: { type: Number, required: true }
        }
    ],
    quizId: { type: String, unique: true, required: true } // Unique ID for each quiz
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
