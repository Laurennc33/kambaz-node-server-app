import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  _id: { type: String, required: true },  // UUID
  type: {
    type: String,
    enum: ["multiple_choice", "true_false", "fill_in_the_blank"],
    required: true
  },
  question: { type: String, required: true },
  options: [{ type: String }], // used for multiple choice
  correctAnswer: { type: String }, // used for MC and True/False
  fillInTheBlankAnswers: [         // used for Fill in the Blank
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ],
  points: { type: Number, default: 0 },
}, { _id: false });

const quizSchema = new mongoose.Schema({
  _id: String,
  course: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['Graded Quiz', 'Practice Quiz', 'Exam']},
  assignmentGroup: { type: String, enum: ['Assignments', 'Quizzes', 'Exams']},
  shuffleAnswers: { type: Boolean},
  timeLimit: { type: Number, default: 0 },
  multipleAttempts: { type: String},
  showCorrectAnswers: { type: String},
  accessCode: { type: String, default: "" },
  oneQuestionAtATime: { type: Boolean},
  webcamRequired: { type: Boolean},
  lockQuestionsAfterAnswering: { type: Boolean},
  dueDate: { type: Date },
  availableDate: { type: Date },
  untilDate: { type: Date },
  questions: { type: [questionSchema], default: [] },
  points: { type: Number, default: 0 },
}, { collection: "quizzes" });

export default quizSchema;
