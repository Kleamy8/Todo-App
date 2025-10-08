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

    fireEvent.change(input, { target: { value: "test task " } });
    fireEvent.change(select, { target: { value: "Study" } });

    fireEvent.click(button);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });

  test("adds multiple todos correctly", async () => {
    render(<CreateTodo />);

    const input = screen.getByPlaceholderText("Task name");
    const addButton = screen.getByRole("button", { name: "Add Task" });
    const dateInput = screen.getByTestId("date-picker");
    const select = screen.getByTestId("options");

    fireEvent.change(input, { target: { value: "first task" } });
    fireEvent.change(select, { target: { value: "Work" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    fireEvent.change(input, { target: { value: "second task" } });
    fireEvent.change(select, { target: { value: "Private" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });
  });

  test("does not save empty task", () => {
    render(<CreateTodo />);
    const addButton = screen.getByRole("button", { name: "Add Task" });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
  });
});
