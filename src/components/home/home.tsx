import React from "react";
import styles from "./home.module.css";
import { Header } from "./header";
import { useNavigate } from "react-router-dom";

export function Home() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.todos}>
          <div data-testid="ongoing" className={styles.ongoing}>
            <div className={styles.todoTitle}>
              <h4>Ongoing</h4>
            </div>
            <div className={styles.todoContainer}>Todos....</div>
          </div>
          <div className={styles.completed}>
            <div className={styles.todoTitle}>
              <h4>Completed</h4>
            </div>
            <div className={styles.todoContainer}>Todos.....</div>
          </div>
        </div>
        <button data-testid="addnewbutton" type="button">
          Add new Todo
        </button>
      </div>
    </>
  );
}
