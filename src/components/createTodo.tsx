import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
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
      <div className="taskContainer">
        <h1>Add new Todo</h1>
        <form onSubmit={handleSubmit}>
          <DatePicker
            customInput={<input data-testid="date-picker" />}
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
          <input
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Task name"
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}
