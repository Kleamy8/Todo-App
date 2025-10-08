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
  const [category, setCategory] = useState(
    localStorage.getItem("categories") || ""
  );
  console.log(category);
  useEffect(() => {
    const saved = localStorage.getItem("todo");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    const handleStorageChange = () => {
      setCategory(localStorage.getItem("categories") || "");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
  console.log("Calendar render start");

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <div className={styles.navigation}>
          {(() => {
            console.log("Navigation visible");
            return null;
          })()}
          <button
            className={styles.navButtonpre}
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
          <h1 className={styles.title}>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>
          <button
            className={styles.navButtonnext}
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
            <div key={index} className={styles.dayCell} data-testid="day-cell">
              {day && (
                <>
                  <div className={styles.dayNumber} data-testid="day-number">
                    {day.getDate()}
                  </div>
                  <div className={styles.todosContainer} data-testid="calander">
                    {getTodosForDay(day)
                      .filter(todo => !category || todo.category === category)
                      .map((todo, todoIndex) => (
                        <div
                          style={{
                            backgroundColor:
                              todo.category == "Work"
                                ? "blue"
                                : todo.category == "Study"
                                ? "green"
                                : todo.category == "Private"
                                ? "red"
                                : "transparent",
                            color: "white",
                          }}
                          key={todoIndex}
                          className={styles.todoItem}
                          data-testid="todoItem"
                        >
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
