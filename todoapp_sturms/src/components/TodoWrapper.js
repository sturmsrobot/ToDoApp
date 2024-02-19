import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>hast du nichts zu tun?</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo task={todo} key={todo.id} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default TodoWrapper;
