import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CreateTodo } from "./createTodo";

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("CreateTodo component", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue("[]");
    localStorageMock.setItem.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("add new todo and save to localStorage", async () => {
    render(<CreateTodo />);

    const input = screen.getByPlaceholderText("Task name");
    const button = screen.getByRole("button", { name: "Add Task" });
    const dateInput = screen.getByTestId("date-picker");
    const select = screen.getByTestId("options");
  fireEvent.change(dateInput, { target: { value: new Date("2025-10-22") } });

    fireEvent.change(input, { target: { value: "test task " } });
    fireEvent.change(select, { target: { value: "Study" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });


  test("does not save empty task", () => {
    render(<CreateTodo />);
    const addButton = screen.getByRole("button", { name: "Add Task" });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
