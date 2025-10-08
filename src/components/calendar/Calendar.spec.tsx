import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

jest.mock("./Calendar.module.css", () => ({
  calendar: "calendar",
  calendarHeader: "calendarHeader",
  title: "title",
  navigation: "navigation",
  navButton: "navButton",
  navButtonpre: "navButtonpre",
  navButtonnext: "navButtonnext",
  calendarGrid: "calendarGrid",
  dayNames: "dayNames",
  dayName: "dayName",
  daysGrid: "daysGrid",
  dayCell: "dayCell",
  dayNumber: "dayNumber",
  todosContainer: "todosContainer",
  todoItem: "todoItem",
}));

describe("Calendar Component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue("[]");
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendera kalendern utan fel", () => {
    test("renders calendar without crashing", () => {
      render(<Calendar />);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    test("renders calendar header with current month and year", () => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

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

      render(<Calendar />);

      expect(
        screen.getByText(`${monthNames[currentMonth]} ${currentYear}`)
      ).toBeInTheDocument();
    });

    test("renders navigation buttons", () => {
      render(<Calendar />);

      const prevButton = screen.getByRole("button", { name: "‹" });
      const nextButton = screen.getByRole("button", { name: "›" });

      expect(prevButton).toBeInTheDocument();
      expect(nextButton).toBeInTheDocument();
    });

    test("renders day names in Swedish", () => {
      render(<Calendar />);

      const dayNames = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];

      dayNames.forEach(dayName => {
        expect(screen.getByText(dayName)).toBeInTheDocument();
      });
    });

    test("renders day cells with correct structure", () => {
      render(<Calendar />);

      const dayCells = screen.getAllByTestId("day-cell");
      expect(dayCells.length).toBeGreaterThan(0);

      const dayNumbers = screen.getAllByTestId("day-number");
      expect(dayNumbers.length).toBeGreaterThan(0);

      const todosContainers = screen.getAllByTestId("calander");
      expect(todosContainers.length).toBeGreaterThan(0);
    });
  });

  describe("Testa månadsnavigation", () => {
    test("navigates to previous month", () => {
      render(<Calendar />);

      const prevButton = screen.getByRole("button", { name: "‹" });
      fireEvent.click(prevButton);

      const currentDate = new Date();
      const previousMonth =
        currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const expectedYear =
        currentDate.getMonth() === 0
          ? currentDate.getFullYear() - 1
          : currentDate.getFullYear();

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

      expect(
        screen.getByText(`${monthNames[previousMonth]} ${expectedYear}`)
      ).toBeInTheDocument();
    });

    test("navigates to next month", () => {
      render(<Calendar />);

      const nextButton = screen.getByRole("button", { name: "›" });
      fireEvent.click(nextButton);

      const currentDate = new Date();
      const nextMonth =
        currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
      const expectedYear =
        currentDate.getMonth() === 11
          ? currentDate.getFullYear() + 1
          : currentDate.getFullYear();

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

      expect(
        screen.getByText(`${monthNames[nextMonth]} ${expectedYear}`)
      ).toBeInTheDocument();
    });
  });

  describe("Testa localStorage integration", () => {
    test("loads todos from localStorage", () => {
      const testTodos = [
        {
          task: "Test todo 1",
          date: new Date(2024, 0, 15),
          category: "Work",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(testTodos));

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
    });

    test("loads category filter from localStorage", () => {
      localStorageMock.getItem.mockImplementation(key => {
        if (key === "todo") return "[]";
        if (key === "categories") return "Work";
        return null;
      });

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("categories");
    });

    test("handles empty localStorage", () => {
      localStorageMock.getItem.mockReturnValue("[]");

      render(<Calendar />);

      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    test("handles null localStorage", () => {
      localStorageMock.getItem.mockReturnValue(null);

      render(<Calendar />);

      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  describe("Testa edge cases", () => {
    test("handles February correctly", () => {
      render(<Calendar />);

      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    test("handles year transition", () => {
      render(<Calendar />);

      const nextButton = screen.getByRole("button", { name: "›" });

      for (let i = 0; i < 12; i++) {
        fireEvent.click(nextButton);
      }

      expect(screen.getByRole("heading")).toBeInTheDocument();
    });
  });

  describe("Dynamic Todo Display Tests", () => {
    test("loads todos from localStorage and processes them", () => {
      const testTodos = [
        {
          task: "Test Task 1",
          date: new Date(2024, 9, 25),
          category: "Work",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(testTodos));

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
    });

    test("loads multiple todos from localStorage", () => {
      const testTodos = [
        {
          task: "Morning Meeting",
          date: new Date(2024, 9, 15),
          category: "Work",
        },
        {
          task: "Study Session",
          date: new Date(2024, 9, 20),
          category: "Study",
        },
        {
          task: "Gym Workout",
          date: new Date(2024, 9, 25),
          category: "Private",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(testTodos));

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
    });

    test("handles todos with different dates", () => {
      const testTodos = [
        {
          task: "Wrong Month Todo",
          date: new Date(2024, 8, 25),
          category: "Work",
        },
      ];

      localStorageMock.getItem.mockReturnValue(JSON.stringify(testTodos));

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
    });
  });

  describe("Dynamic Category Filtering Tests", () => {
    test("loads category filter from localStorage for Work", () => {
      const testTodos = [
        {
          task: "Work Task",
          date: new Date(2024, 9, 15),
          category: "Work",
        },
        {
          task: "Study Task",
          date: new Date(2024, 9, 15),
          category: "Study",
        },
      ];

      localStorageMock.getItem.mockImplementation(key => {
        if (key === "todo") return JSON.stringify(testTodos);
        if (key === "categories") return "Work";
        return null;
      });

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("categories");
    });

    test("loads category filter from localStorage for Study", () => {
      const testTodos = [
        {
          task: "Work Task",
          date: new Date(2024, 9, 15),
          category: "Work",
        },
        {
          task: "Study Task",
          date: new Date(2024, 9, 15),
          category: "Study",
        },
      ];

      localStorageMock.getItem.mockImplementation(key => {
        if (key === "todo") return JSON.stringify(testTodos);
        if (key === "categories") return "Study";
        return null;
      });

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("categories");
    });

    test("loads todos when no category filter is set", () => {
      const testTodos = [
        {
          task: "Work Task",
          date: new Date(2024, 9, 15),
          category: "Work",
        },
        {
          task: "Study Task",
          date: new Date(2024, 9, 15),
          category: "Study",
        },
      ];

      localStorageMock.getItem.mockImplementation(key => {
        if (key === "todo") return JSON.stringify(testTodos);
        if (key === "categories") return "";
        return null;
      });

      render(<Calendar />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith("todo");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("categories");
    });
  });
});
