import mongoose from 'mongoose';

const quizAttemptSchema = new mongoose.Schema({
    quizId: { type: String, required: true, ref: 'Quiz', index: true },  // Changed to ObjectId
    userId: { type: String, required: true, ref: 'User', index: true }, // userId is ObjectId
    answers: [{
        questionId: { type: String, ref: 'Question', required: true },  // Question references as ObjectId
        answer: { type: String, required: true }  // Assuming answers are strings
    }],
    score: { type: Number, required: true },  // Numeric score for the attempt
    attemptDate: { type: Date, default: Date.now },  // Date of the attempt (defaults to current date)
});

export default quizAttemptSchema;

