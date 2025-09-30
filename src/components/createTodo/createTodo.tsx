import React, { useState, useEffect } from "react";
import style from "./create.module.css";

import DatePicker from "react-datepicker";
import { Header } from "../home/header";
interface Todo {
  task: string;
  date: Date | null;
}

export function CreateTodo() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTodo: Todo = { task, date: startDate };
    const updatedTasks = [...tasks, newTodo];
    setTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    alert("task added");
    setTask("");
    setStartDate(new Date());
  };

  return (
    <>
      <Header name={"Add-todo"} />
      <div className={style.taskContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Deadline:</label>
          <DatePicker
            className={style.datepicker}
            customInput={<input data-testid="date-picker" />}
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
          <input
            className={style.inputs}
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Task name"
          />
          <button type="submit" className={style.addbutton}>
            Add
          </button>
        </form>
      </div>
    </>
  );
}
