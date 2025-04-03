let assignment = {
    title: "React Assignment",
    score: 85,
    completed: false,
  };
  
  app.put("/lab5/assignment/score", (req, res) => {
    const { score } = req.body;
    if (isNaN(score)) {
      return res.status(400).send("Score must be a number.");
    }
    assignment.score = Number(score);
    res.send(`Updated score to: ${assignment.score}`);
  });
  

  app.put("/lab5/assignment/completed", (req, res) => {
    const { completed } = req.body;
    assignment.completed = completed === "true";
    res.send(`Updated completion to: ${assignment.completed}`);
  });
  