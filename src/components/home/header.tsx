import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";
export function Header({ name }: { name: string }) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState(
    () => localStorage.getItem("categories") || ""
  );
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("categories", category);
    window.dispatchEvent(new Event("storage")); // 🔥 trigger event so Calendar updates
  }, [category]);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>{name}</h1>
        </div>
        <div className={styles.navbar}>
          <button
            data-testid="addnewbutton"
            type="button"
            onClick={() => navigate("/create")}
          >
            Add new Todo
          </button>
          <div
            className={styles.category}
            style={{
              backgroundColor:
                category == "Work"
                  ? "blue"
                  : category == "Study"
                  ? "green"
                  : category == "Private"
                  ? "red"
                  : "#1a73e8",
            }}
          >
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
                  style={{ background: "green" }}
                  onClick={() => {
                    setCategory("Study");
                    setShow(false);
                  }}
                >
                  Study
                </li>

                <li
                  style={{ background: "blue" }}
                  onClick={() => {
                    setCategory("Work");
                    setShow(false);
                  }}
                >
                  Work
                </li>
                <li
                  style={{ background: "red" }}
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
        </div>
      </div>
    </>
  );
}
