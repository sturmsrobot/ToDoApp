import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, toggleComplete, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    if (editedTask.trim() !== "") {
      task.task = editedTask;
      setEditing(false);
    }
  };

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  if (!task) return null;

  return (
    <div className="Todo">
      {editing ? (
        <input
          type="text"
          value={editedTask}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveEdit}
          autoFocus
          className="todo-input"
          style={{ padding: 5, margin: 0 }}
        />
      ) : (
        <p
          onClick={handleToggleComplete}
          className={task.completed ? "completed" : ""}
        >
          {task.task}
        </p>
      )}
      <div>
        <FontAwesomeIcon icon={faPenToSquare} onClick={handleEdit} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};

export default Todo;
