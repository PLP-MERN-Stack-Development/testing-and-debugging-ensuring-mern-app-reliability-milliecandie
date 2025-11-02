const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// temporary "database" (array)
let bugs = [];

// Create new bug
app.post("/api/bugs", (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ message: "Bug title is required" });

  const newBug = { id: bugs.length + 1, title, status: status || "open" };
  bugs.push(newBug);
  res.status(201).json(newBug);
});

// Get all bugs
app.get("/api/bugs", (req, res) => {
  res.json(bugs);
});

// Update bug status
app.put("/api/bugs/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const bug = bugs.find((b) => b.id == id);

  if (!bug) return res.status(404).json({ message: "Bug not found" });

  bug.status = status;
  res.json(bug);
});

// Delete a bug
app.delete("/api/bugs/:id", (req, res) => {
  const { id } = req.params;
  bugs = bugs.filter((b) => b.id != id);
  res.json({ message: "Bug deleted successfully" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));