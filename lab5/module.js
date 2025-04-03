let module = {
    id: "m1",
    name: "React Fundamentals",
    description: "Learn the basics of React, components, and state management.",
    course: "CS4550 - Web Development",
  };
  
  export default function ModuleRoutes(app) {
    // GET: Retrieve the entire module object
    app.get("/lab5/module", (req, res) => {
      res.json(module);
    });
  
    // GET: Retrieve only the module name
    app.get("/lab5/module/name", (req, res) => {
      res.send(module.name);
    });
  
    // PUT: Update module name
    app.put("/lab5/module/name", (req, res) => {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send("Module name is required.");
      }
      module.name = name;
      res.send(`Module name updated to: ${module.name}`);
    });
  
    // PUT: Update module description
    app.put("/lab5/module/description", (req, res) => {
      const { description } = req.body;
      if (!description) {
        return res.status(400).send("Module description is required.");
      }
      module.description = description;
      res.send(`Module description updated to: ${module.description}`);
    });
  }
  