import * as quizzesDao from "./dao.js";

export default function QuizRoutes(app) {
    // Create quiz
    app.post("/api/quizzes", async (req, res) => {
        try {
            const newQuiz = await quizzesDao.createQuiz(req.body);
            res.status(201).json(newQuiz);
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ message: "Error creating quiz", error: error.message });
        }
    });

    // Fetch all quizzes
    app.get("/api/quizzes", async (_, res) => {
        try {
            const quizzes = await quizzesDao.findAllQuizzes();
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving quizzes", error: error.message });
        }
    });

    // Fetch quizzes by course
    app.get("/api/quizzes/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        try {
            const quizzes = await quizzesDao.findQuizzesForCourse(courseId.trim().toUpperCase());
            if (!quizzes || quizzes.length === 0) {
                return res.status(404).json({ message: "No quizzes found for this course" });
            }
            res.json(quizzes);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving course quizzes", error: error.message });
        }
    });

    // Fetch questions for a specific quiz
    app.get("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = await quizzesDao.findQuizById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }
            res.json(quiz.questions); 
        } catch (error) {
            res.status(500).json({ message: "Error retrieving quiz questions", error: error.message });
        }
    });

    // Fetch quiz configuration (metadata like maxAttempts, title, etc.)
    app.get("/api/quizzes/:quizId/config", async (req, res) => {
        const { quizId } = req.params;
        try {
            const quiz = await quizzesDao.findQuizById(quizId);
            if (!quiz) {
                return res.status(404).json({ message: "Quiz not found" });
            }

            // Send only config-relevant data (not questions)
            const { _id, title, maxAttempts, availableDate, dueDate, points, course } = quiz;
            res.json({ _id, title, maxAttempts, availableDate, dueDate, points, course });
        } catch (error) {
            console.error("Error fetching quiz config:", error);
            res.status(500).json({ message: "Error fetching quiz config", error: error.message });
        }
    });

    // Update entire quiz
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await quizzesDao.updateQuiz(quizId, req.body);
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "Error updating quiz", error: error.message });
        }
    });

    // Delete quiz
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        try {
            const status = await quizzesDao.deleteQuiz(req.params.quizId);
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "Error deleting quiz", error: error.message });
        }
    });

    // Replace all questions in a quiz
    app.patch("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const { questions } = req.body;

        if (!Array.isArray(questions)) {
            return res.status(400).json({ message: "Questions must be an array." });
        }

        try {
            const updatedQuiz = await quizzesDao.updateQuizQuestions(quizId, questions);
            res.json(updatedQuiz);
        } catch (error) {
            console.error("Error updating questions:", error);
            res.status(500).json({ message: "Error updating questions", error: error.message });
        }
    });

    // Add a question to a quiz
    app.post("/api/quizzes/:quizId/questions", async (req, res) => {
        const { quizId } = req.params;
        const { question } = req.body; // Use single question object, not array

        try {
            const updatedQuiz = await quizzesDao.addQuestionToQuiz(quizId, question);
            res.status(200).json(updatedQuiz);
        } catch (err) {
            res.status(500).json({ message: "Failed to add question", error: err.message });
        }
    });

    // Update a single question in a quiz
    app.put("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
        const { quizId, questionId } = req.params;
        try {
            const updated = await quizzesDao.updateQuestionInQuiz(quizId, questionId, req.body);
            res.json(updated);
        } catch (error) {
            res.status(500).json({ message: "Error updating question", error: error.message });
        }
    });

    // Delete a single question from a quiz
    app.delete("/api/quizzes/:quizId/questions/:questionId", async (req, res) => {
        const { quizId, questionId } = req.params;
        try {
            const result = await quizzesDao.deleteQuestionFromQuiz(quizId, questionId);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: "Error deleting question", error: error.message });
        }
    });

    // Fetch user attempts for a specific quiz (new route)
    app.get("/api/quizzes/:quizId/attempts/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        try {
            const attempts = await quizzesDao.findUserAttempts(userId, quizId);

            if (!attempts || attempts.length === 0) {
                return res.status(404).json({ message: "No attempts found for this user in this quiz" });
            }

            res.json(attempts); // Return the attempts as an array
        } catch (error) {
            console.error("Error fetching user attempts:", error);
            res.status(500).json({ message: "Error fetching user attempts", error: error.message });
        }
    });

    // Create a quiz attempt (new route)
    app.post("/api/quizzes/:quizId/attempts/:userId", async (req, res) => {
        const { quizId, userId } = req.params;
        const { answers } = req.body; // Answers should be passed in the body

        if (!answers || typeof answers !== 'object') {
            return res.status(400).json({ message: "Answers must be provided." });
        }

        try {
            // Create the quiz attempt
            const newAttempt = await quizzesDao.submitQuizAttempt(userId, quizId, answers);
            res.status(201).json(newAttempt);
        } catch (error) {
            console.error("Error creating quiz attempt:", error);
            res.status(500).json({ message: "Error creating quiz attempt", error: error.message });
        }
    });

    
}
