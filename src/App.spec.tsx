import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Routes: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Route: ({ element }: { element: React.ReactNode }) => <div>{element}</div>,
  useNavigate: () => jest.fn(),
}));

describe("App Component", () => {
  test("renders without crashing", () => {
    render(<App />);
    expect(screen.getByText("Todo-app")).toBeInTheDocument();
  });

  test("renders home route by default", () => {
    render(<App />);
    expect(screen.getByText("Todo-app")).toBeInTheDocument();
  });
});
