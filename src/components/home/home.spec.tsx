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
  });
});
