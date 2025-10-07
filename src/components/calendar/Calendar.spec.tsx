import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
  caledar: "calendar",
  calendarHeader: "calendarHeader",
  title: "title",
  navigation: "navigation",
  navButton: "navButton",
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
        "Fabruari",
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
        screen.getByText("${monthNames[currentMonth]} ${currentYear}")
      ).toBeInTheDocument();
    });

    test("renders navigation buttons", () => {
      render(<Calendar />);

      const prebButton = screen.getByRole("button", { name: "<" });
      const nextButton = screen.getByRole("button", { name: ">" });

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
  });

  describe("Testa månadsnavigation", () => {
    test("navigates to previous month", () => {
      render(<Calendar />);

      const prevButton = screen.getByRole("button", { name: "<" });
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
        "Fabruari",
        "Mars",
        "April",
        "Maj",
        "Juni",
        "Juli",
        "Augusti",
        "September",
        "Oktober",
        "November",
      ];

      render(<Calendar />);

      expect(
        screen.getByText(`${monthNames[currentMonth]} ${currentYear}`)
      ).toBeInTheDocument();
    });
  });
});
