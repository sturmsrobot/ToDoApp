import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState(""); // useState gibt den aktuellen Zustand und eine Funktion zum Aktualisieren dieses Zustands zurück

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue(""); // Wert zurücksetzen
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Wie lautet die Aufgabe?"
        value={value} // Wert des Eingabefelds auf den aktuellen Zustand setzen
        onChange={(e) => setValue(e.target.value)} // Aktualisieren des Zustands bei Änderungen
      />
      <button type="submit" className="todo-btn">
        Aufgabe hinzufügen!
      </button>
    </form>
  );
};

export default TodoForm;
