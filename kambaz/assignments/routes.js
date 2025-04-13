import * as assignmentDao from './dao.js';

export default function AssignmentRoutes(app) {
    app.post("/api/assignments", async (req, res) => {
        const assignmentUpdates = req.body;
        const newAssignment = await assignmentDao.createAssignment(assignmentUpdates);
        res.status(201).json(newAssignment); 
    });

    app.get("/api/assignments", async (req, res) => {
        const assignments = await assignmentDao.findAllAssignments();
        if (assignments.length === 0) {
            return res.status(404).json({ message: "No assignments found" });
        }
        res.json(assignments);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = await assignmentDao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await assignmentDao.deleteAssignment(assignmentId);
        res.send(status); 
    });

    app.get("/api/assignments/course/:courseId", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await assignmentDao.findAssignmentsForCourse(courseId);
        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ message: "No assignments found for this course" });
        }
        res.json(assignments);
    });
    
}

