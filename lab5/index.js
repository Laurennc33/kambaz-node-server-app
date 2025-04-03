import PathParameters from "./pathparameters.js";
import QueryParameters from "../lab5/queryparameters.js";
import WorkingWithObjects from "../lab5/workingwithobjects.js";
import ModuleRoutes from "../lab5/module.js";
import WorkingWithArrays from "../lab5/workingwitharrays.js";


export default function Lab5(app) {
    app.get("/lab5/welcome", (req, res) => {
      res.send("Welcome to Lab 5");
    });

    PathParameters(app);
    QueryParameters(app);
    WorkingWithObjects(app);
    ModuleRoutes(app);
    WorkingWithArrays(app);
};
