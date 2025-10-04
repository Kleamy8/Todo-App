import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Header } from "./header";
import { useNavigate } from "react-router-dom";
import { Calendar } from "../calendar/Calendar/Calendar";

export function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <Header name={"Todo-app"} />
        <Calendar />
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
