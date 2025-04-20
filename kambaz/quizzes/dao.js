import model from "./model.js";
import QuizAttempt from "./quizattemptmodel.js";
import { v4 as uuidv4 } from "uuid";


// ✅ Helper to normalize question types
const normalizeType = (type) => {
    const map = {
        "multiple choice": "multiple_choice",
        "true/false": "true_false",
        "fill in the blank": "fill_in_the_blank",
    };
    return map[type.toLowerCase().trim()] || type;
};

// Find all quizzes
export function findAllQuizzes() {
    return model.find();
}

// Find quizzes for a specific course
export function findQuizzesForCourse(courseId) {
    return model.find({ course: courseId });
}

// Find a quiz by its ID
export function findQuizById(quizId) {
    return model.findById(quizId);
}

// Calculate total points from questions
const calculateTotalPoints = (questions) => {
    return questions.reduce((total, question) => total + (question.points || 0), 0);
};

// Create a new quiz
export async function createQuiz(quiz) {
    try {
        if (!quiz.questions || !Array.isArray(quiz.questions)) {
            console.error("Invalid quiz questions:", quiz.questions);  // Log invalid quiz questions
            throw new Error("Quiz must have an array of questions.");
        }

        const normalizedQuestions = quiz.questions.map((q) => ({
            ...q,
            _id: q._id || uuidv4(),
            type: normalizeType(q.type),
            points: q.points || 0,
        }));

        const newQuiz = {
            ...quiz,
            _id: uuidv4(),
            questions: normalizedQuestions,
            points: calculateTotalPoints(normalizedQuestions),
        };

        const savedQuiz = await model.create(newQuiz);
        return savedQuiz;
    } catch (error) {
        console.error("Error creating quiz:", error);  // Log detailed error
        throw new Error(`Error creating quiz: ${error.message}`);
    }
}



// Update a quiz
export const updateQuiz = async (quizId, quizUpdates) => {
    try {
        // Directly match by _id assuming quizId is a string like "Q201"
        return await model.updateOne({ _id: quizId }, { $set: quizUpdates });
    } catch (error) {
        console.error('Error updating quiz in DAO:', error);
        throw error;
    }
};

// Delete a quiz
export function deleteQuiz(quizId) {
    return model.deleteOne({ _id: quizId });
}

// Replace all questions in a quiz
export async function updateQuizQuestions(quizId, questions) {
    const questionsWithIds = questions.map((q) => ({
        ...q,
        _id: q._id || uuidv4(),
        type: normalizeType(q.type),
    }));

    const points = calculateTotalPoints(questionsWithIds);

    await model.updateOne({ _id: quizId }, { $set: { questions: questionsWithIds, points } });

    return model.findById(quizId);
}

// Add a question to a quiz
export function addQuestionToQuiz(quizId, question) {
    if (!quizId || !question) {
        return Promise.reject("Quiz ID or Question is missing.");
    }

    const questionWithId = {
        ...question,
        _id: question._id || uuidv4(),
        type: normalizeType(question.type),
    };

    return model.findOneAndUpdate(
        { _id: quizId },
        { $push: { questions: questionWithId }, $inc: { points: questionWithId.points || 0 } },
        { new: true }
    ).then(updatedQuiz => {
        if (!updatedQuiz) {
            return Promise.reject("Quiz not found.");
        }
        return updatedQuiz;
    }).catch(error => {
        console.error("Error adding question to quiz:", error);
        return Promise.reject(error);
    });
}

// Update a single question inside a quiz
export async function updateQuestionInQuiz(quizId, questionId, updatedQuestion) {
    const quiz = await model.findOne({ _id: quizId });
    if (!quiz) return null;

    quiz.questions = quiz.questions.map((q) =>
        q._id === questionId ? {
            ...q,
            ...updatedQuestion,
            type: normalizeType(updatedQuestion.type || q.type),
        } : q
    );

    quiz.points = calculateTotalPoints(quiz.questions);
    await quiz.save();
    return quiz;
}

// Delete a specific question from a quiz
export async function deleteQuestionFromQuiz(quizId, questionId) {
    const quiz = await model.findOne({ _id: quizId });
    if (!quiz) return;

    const questionToDelete = quiz.questions.find(q => q._id === questionId);
    const pointsToDeduct = questionToDelete?.points || 0;

    await model.updateOne(
        { _id: quizId },
        { $pull: { questions: { _id: questionId } }, $inc: { points: -1 * pointsToDeduct } }
    );
}

// ✅ New function to fetch user attempts for a specific quiz
export async function findUserAttempts(userId, quizId) {
    try {
        // Assuming there's a 'QuizAttempt' model (you may need to create one)
        const attempts = await QuizAttempt.find({ userId, quizId }).sort({ attemptDate: -1 });
        return attempts;
    } catch (error) {
        console.error("Error fetching user attempts:", error);
        throw new Error("Error fetching user attempts");
    }
}


// Function to create a quiz attempt
export async function submitQuizAttempt(userId, quizId, rawAnswers) {
    // Convert from { questionId: answer, ... } to [{ questionId, answer }, ...]
    const answersArray = Object.entries(rawAnswers).map(([questionId, answer]) => ({
        questionId,
        answer
    }));

    const score = calculateScore(rawAnswers); // Or use answersArray if needed

    const attempt = new QuizAttempt({
        userId,
        quizId,
        answers: answersArray,
        score
    });

    try {
        const savedAttempt = await attempt.save();
        return savedAttempt;
    } catch (error) {
        console.error("Error creating quiz attempt:", error);
        throw new Error("Error saving quiz attempt");
    }
}

// Calculate the score based on answers
function calculateScore(answers) {
    // Logic to calculate score based on the quiz's answers
    let score = 0;

    // Example: Compare answers with correct answers and calculate score
    for (const [questionId, answer] of Object.entries(answers)) {
        const correctAnswer = getCorrectAnswerForQuestion(questionId); // Assume you have a function to get the correct answer
        if (answer === correctAnswer) {
            score += 1; // Add points based on your scoring system
        }
    }

    return score;
}

export async function fetchQuizConfig(quizId) {
    const res = await fetch(`http://localhost:4000/api/quizzes/${quizId}/config`);
    if (!res.ok) throw new Error('Failed to fetch quiz config');
    return res.json();
}





