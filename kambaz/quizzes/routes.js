import * as quizzesDao from './dao.js';

export default function QuizRoutes(app) {
    // Create a new quiz
    app.post("/api/quizzes", async (req, res) => {
        const quizUpdates = req.body;
        try {
            const newQuiz = await quizzesDao.createQuiz(quizUpdates);
            res.status(201).json(newQuiz);
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ message: "Error creating quiz", error: error.message });
        }
    });

    // Get all quizzes
    app.get("/api/quizzes", async (req, res) => {
        try {
            const quizzes = await quizzesDao.findAllQuizzes();
            if (!quizzes || quizzes.length === 0) {
                return res.status(404).json({ message: "No quizzes found" });
            }
            res.json(quizzes);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
            res.status(500).json({ message: "Error retrieving quizzes", error: error.message });
        }
    });

    app.get("/api/quizzes/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const normalized = courseId.trim().toUpperCase();  // optional
    
        console.log("Normalized Course ID:", normalized);
    
        // DEBUG: fetch all quizzes
        const allQuizzes = await quizzesDao.findAllQuizzes();
        console.log("ALL quizzes in DB:", allQuizzes);
    
        // Fetch just the ones for this course
        const matching = await quizzesDao.findQuizzesForCourse(normalized);
        console.log("Matching quizzes for course:", matching);
    
        if (!matching || matching.length === 0) {
            return res.status(404).json({ message: "No quizzes found for this course" });
        }
    
        res.json(matching);
    });
    
      
      
      

    // Update a specific quiz by its ID
    app.put("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        try {
            const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
            res.json(status);
        } catch (error) {
            console.error("Error updating quiz:", error);
            res.status(500).json({ message: "Error updating quiz", error: error.message });
        }
    });

    // Delete a quiz by its ID
    app.delete("/api/quizzes/:quizId", async (req, res) => {
        const { quizId } = req.params;
        try {
            const status = await quizzesDao.deleteQuiz(quizId);
            res.json(status);
        } catch (error) {
            console.error("Error deleting quiz:", error);
            res.status(500).json({ message: "Error deleting quiz", error: error.message });
        }
    });
}
