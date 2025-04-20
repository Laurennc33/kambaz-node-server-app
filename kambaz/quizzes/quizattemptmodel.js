import mongoose from "mongoose";
import quizAttemptSchema from "./quizattemptschema.js";
const QuizAttempt = mongoose.model("QuizAttempt", quizAttemptSchema);
export default QuizAttempt;

