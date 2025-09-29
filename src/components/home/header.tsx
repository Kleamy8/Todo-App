import React from "react";
import styles from "./home.module.css";
export function Header() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Todo-app</h1>
        </div>
        <div className={styles.navbar}>
          <p>About us</p>
          <p>Contact us</p>
        </div>
      </div>
    </>
  );
}
