import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Make sure this is correctly imported

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [editingTodo, setEditingTodo] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.log("Error fetching todos:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/todos", { title, description })
      .then((response) => {
        setTodos([...todos, response.data]);
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.log("Error creating todo:", error));
  };

  const handleToggleCompletion = (id, completed) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}`, { completed: !completed })
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((error) => console.log("Error updating todo:", error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((error) => console.log("Error deleting todo:", error));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewTitle(todo.title);
    setNewDescription(todo.description);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/todos/${editingTodo._id}`, {
        title: newTitle,
        description: newDescription,
      })
      .then((response) => {
        setTodos(
          todos.map((todo) =>
            todo._id === editingTodo._id ? response.data : todo
          )
        );
        setEditingTodo(null);
        setNewTitle("");
        setNewDescription("");
      })
      .catch((error) => console.log("Error updating todo:", error));
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>

      {editingTodo ? (
        <div>
          <h2>Edit Todo</h2>
          <form onSubmit={handleUpdate}>
            <div>
              <input
                type="text"
                placeholder="New Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="New Description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>
            <button type="submit">Update Todo</button>
            <button type="button" onClick={() => setEditingTodo(null)} className="cancel">
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" disabled={!title}>
            Add Todo
          </button>
        </form>
      )}

      <h2>All Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? "completed" : ""}>
            <div>
              <strong>{todo.title}</strong>
              <p>{todo.description}</p>
            </div>
            <div>
              <button
                onClick={() => handleToggleCompletion(todo._id, todo.completed)}
              >
                {todo.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button onClick={() => handleDelete(todo._id)}>Delete</button>
              <button onClick={() => handleEdit(todo)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
