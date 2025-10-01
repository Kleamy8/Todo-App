import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Header } from "./header";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Header name={"Todo-app"} />

        <button
          data-testid="addnewbutton"
          type="button"
          onClick={() => navigate("/create")}
        >
          Add new Todo
        </button>
      </div>
    </>
  );
}
