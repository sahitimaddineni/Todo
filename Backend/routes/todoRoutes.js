// routes/todoRoutes.js
const express = require("express");
const router = express.Router();

const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todocontrollesr");

router.get("/", getAllTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
