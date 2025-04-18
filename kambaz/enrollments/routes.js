import * as enrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post("/api/enrollments/enroll", async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).send({ error: "User ID and Course ID are required" });
    }

    try {
      const newEnrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
      res.status(201).send(newEnrollment); 
    } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).send({ error: "Failed to enroll user" });
    }
  });

  app.delete("/api/enrollments/unenroll", async (req, res) => {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      return res.status(400).send({ error: "User ID and Course ID are required" });
    }

    try {
      await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
      res.status(200).send({ message: "User unenrolled successfully" });
    } catch (error) {
      console.error("Error unenrolling user:", error);
      res.status(500).send({ error: "Failed to unenroll user" });
    }
  });

  app.get("/api/enrollments/:userId", async (req, res) => {
    const { userId } = req.params;
  
    if (!userId) {
      return res.status(400).send({ error: "User ID is required" });
    }
  
    try {
      const userEnrollments = await enrollmentsDao.getUserEnrollments(userId);
      res.status(200).send(userEnrollments); 
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).send({ error: "Failed to retrieve enrollments" });
    }
  });
  
}
