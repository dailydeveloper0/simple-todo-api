const mongoose = require("mongoose");

mongoose.connect("mongob://localhost:27017/simple_todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: Text,
  due_date: Date,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task: Task };
