import React from "react";
import { Todo } from "../../../types/todo";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
}) => {
  return (
    <div
      className={`${styles.todoItem} ${todo.completed ? styles.completed : ""}`}
    >
      <div className={styles.todoContent}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={styles.checkbox}
        />
        <div className={styles.todoText}>
          <h3 className={styles.title}>{todo.title}</h3>
          {todo.description && (
            <p className={styles.description}>{todo.description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
        aria-label="Delete todo"
      >
        ×
      </button>
    </div>
  );
};
