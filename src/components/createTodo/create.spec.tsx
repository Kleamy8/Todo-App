import { fireEvent, render, screen } from "@testing-library/react";
import { CreateTodo } from "./createTodo";

let mockedSetItem: jest.Mock;

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();

  mockedSetItem = jest.spyOn(Storage.prototype, "setItem") as jest.Mock;
});

describe("CreateTodo component", () => {
  test("add new todo and save to localStorage", () => {
    render(<CreateTodo />);

    const input = screen.getByPlaceholderText("Task name");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "test task" } });
    const dateInput = screen.getByTestId("date-picker");
    fireEvent.click(dateInput);

    const dayButton = screen.getByText("15");
    fireEvent.click(dayButton);
    const select = screen.getByTestId("options");
    fireEvent.change(select, { target: { value: "Work" } });

    fireEvent.click(button);

    expect(input).toHaveValue("");

    expect(mockedSetItem).toHaveBeenCalledTimes(1);

    const savedTodos = JSON.parse(mockedSetItem.mock.calls[0][1]);
    expect(savedTodos.length).toBe(1);
    expect(savedTodos[0].task).toBe("test task");
    expect(new Date(savedTodos[0].date).getDate()).toBe(15);
    expect(savedTodos[0].category).toBe("Work");
  });
  test("adds multiple todos correctly", () => {
    render(<CreateTodo />);

    const input = screen.getByPlaceholderText("Task name");
    const addButton = screen.getByText("Add");
    const dateInput = screen.getByTestId("date-picker");
    const select = screen.getByTestId("options");

    // === Task 1 ===
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(dateInput);
    const dayButton = screen.getByText("17");
    fireEvent.click(dayButton);
    fireEvent.change(select, { target: { value: "Work" } }); //
    fireEvent.click(addButton);

    // === Task 2 ===
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(dateInput);
    const day2Button = screen.getByText("18");
    fireEvent.click(day2Button);
    fireEvent.change(select, { target: { value: "Work" } });
    fireEvent.click(addButton);

    const savedTodos = JSON.parse(mockedSetItem.mock.calls[1][1]);
    expect(savedTodos.length).toBe(2);
    expect(savedTodos[0].task).toBe("Task 1");
    expect(new Date(savedTodos[0].date).getDate()).toBe(17);
    expect(savedTodos[0].category).toBe("Work");
    expect(savedTodos[1].task).toBe("Task 2");
    expect(new Date(savedTodos[1].date).getDate()).toBe(18);
    expect(savedTodos[1].category).toBe("Work");
  });

  test("does not save empty task", () => {
    render(<CreateTodo />);
    const addButton = screen.getByText("Add");

    fireEvent.click(addButton);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
