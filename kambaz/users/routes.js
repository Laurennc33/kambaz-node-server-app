import * as dao from "./dao.js";
import * as courseDao from "../courses/dao.js";
import * as enrollmentsDao from "../enrollments/dao.js";

export default function UserRoutes(app) {
    const findCoursesForUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) return res.sendStatus(401);

        if (currentUser.role === "ADMIN") {
            const courses = await courseDao.findAllCourses();
            return res.json(courses);
        }

        let { uid } = req.params;
        if (uid === "current") uid = currentUser._id;

        const courses = await enrollmentsDao.findCoursesForUser(uid);
        res.json(courses);
    };

    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;

        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) return res.status(401).send({ error: "User not logged in" });
            uid = currentUser._id;
        }

        try {
            const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
            res.status(201).send(status);
        } catch (error) {
            console.error("Failed to enroll user:", error);
            res.status(500).send({ error: "Enrollment failed", details: error.message });
        }
    };

    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) return res.sendStatus(401);
            uid = currentUser._id;
        }

        const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.send(status);
    };

    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };

    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;

        if (role) {
            const users = await dao.findUsersByRole(role);
            return res.json(users);
        }

        if (name) {
            const users = await dao.findUsersByPartialName(name);
            return res.json(users);
        }

        const users = await dao.findAllUsers();
        res.json(users);
    };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) return res.sendStatus(401);
        res.json(currentUser);
    };

    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) return res.status(400).json({ message: "Username already in use" });

        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };

    const updateUser = async (req, res) => {
        const userId = req.params.userId;
        const userUpdates = req.body;

        const updatedUser = await dao.updateUser(userId, userUpdates);
        const currentUser = req.session["currentUser"];

        if (currentUser && currentUser._id === userId) {
            req.session["currentUser"] = { ...currentUser, ...userUpdates };
        }

        res.json(updatedUser);
    };

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const findCoursesForEnrolledUser = async (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) return res.sendStatus(401);
            userId = currentUser._id;
        }

        const courses = await courseDao.findCoursesForEnrolledUser(userId);
        res.json(courses);
    };

    const createCourse = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) return res.status(401).send({ error: "Not logged in" });

        try {
            const newCourse = await courseDao.createCourse(req.body);
            await enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
            res.json(newCourse);
        } catch (error) {
            console.error("Error creating course:", error);
            res.status(500).send({ error: "Course creation failed" });
        }
    };

    

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.get("/api/users/profile", profile);

    app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
    app.post("/api/users/current/courses", createCourse);
    app.get("/api/users/:uid/courses", findCoursesForUser);
    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
}
