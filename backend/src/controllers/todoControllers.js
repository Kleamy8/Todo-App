const Todos = require("../models/todoModel");
const addTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, completed } = req.body;
    const todoAdded = new Todos({
      title,

      description,

      completed: completed || false,
      userId: userId,
    });
    await todoAdded.save();
    res.status(201).json(todoAdded);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};
const getTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await Todos.find({ userId });
    if (todos.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error });
  }
};
const todoChange = async (req, res) => {
  try {
    const { completed, title, description } = req.body;
    const { id } = req.params;

    const updatedTodos = await Todos.findByIdAndUpdate(
      id,
      { completed, title, description },
      { new: true }
    );

    if (!updatedTodos) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(202).json(updatedTodos);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { addTodo, getTodo, todoChange };
