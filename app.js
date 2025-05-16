const express = require("express");

const { Task } = require("./mongoose-config");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    var { title, description, due_date, completed } = req.body;
    title = title.trim();
    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = new Task({
      title,
      description,
      due_date,
      completed: completed || false,
    });
    await task.save();
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    var { title, description, due_date, completed } = req.body;
    title = title.trim();
    if (!title || title === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = await Task.findByIdAndUpdate(id, {
      title,
      description,
      due_date,
      completed: completed || false,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
