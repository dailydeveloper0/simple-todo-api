const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/simple_todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  due_date: Date,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task: Task };
