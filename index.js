import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./lab5/index.js";
import cors from "cors";
import UserRoutes from './kambaz/users/routes.js';
import CourseRoutes from './kambaz/courses/routes.js';
import session from 'express-session';
import "dotenv/config";
import ModuleRoutes from "./kambaz/modules/routes.js";
import EnrollmentRoutes from './kambaz/enrollments/routes.js';
import AssignmentRoutes from './kambaz/assignments/routes.js';


const app = express()
app.use(
    cors({
        credentials: true,
        origin: process.env.NETLIFY_URL || "http://localhost:5173",
    })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
EnrollmentRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);

  
