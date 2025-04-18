import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// Find all quizzes
export function findAllQuizzes() {
  return model.find();
}

// Find quizzes for a specific course
export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

// Update a specific quiz by its ID
export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, { $set: quizUpdates });
}

// Delete a quiz by its ID
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

// Create a new quiz
export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz);
}
