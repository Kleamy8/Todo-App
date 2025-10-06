import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
export function Header({ name }: { name: string }) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("category", category);
  }, [category]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{name}</h1>
        </div>
        <div className={styles.navbar}>
          <div>
            <p onClick={() => setShow(!show)}>
              {category !== "" ? category : "Category"}
            </p>
            {show && (
              <ul>
                <li
                  onClick={() => {
                    setCategory("");
                    setShow(false);
                  }}
                >
                  All
                </li>
                <li
                  onClick={() => {
                    setCategory("Study");
                    setShow(false);
                  }}
                >
                  Study
                </li>
                <li
                  onClick={() => {
                    setCategory("Work");
                    setShow(false);
                  }}
                >
                  Work
                </li>
                <li
                  onClick={() => {
                    setCategory("Private");
                    setShow(false);
                  }}
                >
                  Private
                </li>
              </ul>
            )}
          </div>
          <p>Contact us</p>
        </div>
      </div>
    </>
  );
}
