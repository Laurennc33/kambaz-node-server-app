import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: String,  // Quiz ID (could be the same as the quiz's unique identifier)
  course: { type: String, required: true },  // Reference to the course this quiz belongs to
  title: { type: String, required: true },  // Quiz title
  description: { type: String },  // Description of the quiz
  type: { type: String, enum: ['Graded Quiz', 'Practice Quiz', 'Exam'], required: true },  // Quiz type
  assignmentGroup: { type: String, enum: ['Assignments', 'Quizzes', 'Exams'], required: true },  // Grouping the quiz into categories
  shuffleAnswers: { type: Boolean, default: true },  // Whether to shuffle the answers
  timeLimit: { type: Number, default: 0 },  // Time limit in minutes
  multipleAttempts: { type: Boolean, default: false },  // Whether multiple attempts are allowed
  showCorrectAnswers: { type: Boolean, default: false },  // Whether to show correct answers after submission
  accessCode: { type: String, default: "" },  // Access code to unlock quiz
  oneQuestionAtATime: { type: Boolean, default: true },  // Whether only one question appears at a time
  webcamRequired: { type: Boolean, default: false },  // Whether webcam is required for taking the quiz
  lockQuestionsAfterAnswering: { type: Boolean, default: false },  // Whether to lock the questions after answering
  dueDate: { type: Date },  // Due date for quiz submission
  availableDate: { type: Date },  // The date when quiz becomes available
  untilDate: { type: Date },  // The date when quiz will be no longer available
  questions: { type: Array, default: [] },  // List of questions for the quiz (you can populate this later)
  points: { type: Number, default: 0 },  // Total points for the quiz
}, { collection: "quizzes" });

export default quizSchema;
