import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./home";
import { Header } from "./header";

describe("HomePage", () => {
  it("should renders a title", () => {
    render(<Home />);

    // act

    const button = screen.getByTestId("addnewbutton");
    // assert
    expect(
      screen.getByRole("button", { name: /add new todo/i })
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("heading", { name: /ongoing|completed/i })
    ).toHaveLength(2);
  });
});
describe("headerPage", () => {
  it("should show the title and navbar", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /todo-app/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
    expect(screen.getByText(/contact us/i)).toBeInTheDocument();
  });
});
