import React, { useState, useEffect } from "react";
import styles from "./Calendar.module.css";

interface Todo {
  task: string;
  date: Date | null;
  category: string;
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("todo");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getTodosForDay = (day: Date) => {
    return todos.filter(todo => {
      if (!todo.date) return false;
      const todoDate = new Date(todo.date);
      return todoDate.toDateString() === day.toDateString();
    });
  };

  const monthNames = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  const dayNames = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];

  const days = getDaysInMonth();

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <h1 className={styles.title}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h1>
        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
          >
            ‹
          </button>
          <button
            className={styles.navButton}
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
          >
            ›
          </button>
        </div>
      </div>

      <div className={styles.calendarGrid}>
        <div className={styles.dayNames}>
          {dayNames.map(dayName => (
            <div key={dayName} className={styles.dayName}>
              {dayName}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {days.map((day, index) => (
            <div key={index} className={styles.dayCell}>
              {day && (
                <>
                  <div className={styles.dayNumber}>{day.getDate()}</div>
                  <div className={styles.todosContainer}>
                    {getTodosForDay(day).map((todo, todoIndex) => (
                      <div key={todoIndex} className={styles.todoItem}>
                        {todo.task}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
