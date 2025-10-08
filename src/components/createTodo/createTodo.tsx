import React, { useState, useEffect } from "react";
import style from "./create.module.css";

import DatePicker from "react-datepicker";
import { Header } from "../home/header";
interface Todo {
  task: string;
  date: Date | null;
  category: string;
}

export function CreateTodo() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.trim()) return;
    const newTodo: Todo = { task, date: startDate, category };
    const updatedTasks = [...tasks, newTodo];
    setTasks(updatedTasks);
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    setTask("");
    setStartDate(new Date());
    console.log(updatedTasks);
  };

  return (
    <>
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
            required
          />
          <select
            className={style.category}
            value={category}
            onChange={e => setCategory(e.target.value)}
            data-testid="options"
          >
            <option value="">Select a category</option>
            <option value="Study" style={{ color: "blue" }}>
              Study
            </option>
            <option value="Work" style={{ color: "green" }}>
              Work
            </option>
            <option value="Private" style={{ color: "red" }}>
              Private
            </option>
          </select>

          <button type="submit" className={style.addbutton}>
            Add Task
          </button>
        </form>
      </div>
    </>
  );
}
