// controllers/todoController.js
const Todo = require("../models/todomodels");

// Get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos", error: err });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const newTodo = new Todo({
      title,
      description
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: "Error creating todo", error: err });
  }
};

// Update a todo by id
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      completed
    }, { new: true });
    
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: "Error updating todo", error: err });
  }
};

// Delete a todo by id
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting todo", error: err });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
