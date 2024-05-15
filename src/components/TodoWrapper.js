import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import EditTodoForm from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos from the backend API when the component mounts
    axios
      .get("/api/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Fehler beim Abrufen der Todos:", error));
  }, []);

  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    };
    axios
      .post("/api/todos", { task: newTodo.task })
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) =>
        console.error("Fehler beim Hinzufügen des Todos:", error)
      );
  };

  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    axios
      .put(`/api/todos/${id}`, { ...todo, completed: !todo.completed })
      .then((response) =>
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)))
      )
      .catch((error) =>
        console.error("Fehler beim Aktualisieren des Todos:", error)
      );
  };

  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error("Fehler beim Löschen des Todos:", error));
  };

  const editTodo = (id, updatedTask) => {
    axios
      .put(`/api/todos/${id}`, { task: updatedTask })
      .then((response) =>
        setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)))
      )
      .catch((error) =>
        console.error("Fehler beim Bearbeiten des Todos:", error)
      );
  };

  return (
    <div className="TodoWrapper">
      <h1>hast du nichts zu tun?</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTodo} task={todo} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
