import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Bug Tracker App", () => {
  test("renders initial message correctly", () => {
    render(<App />);
    const messageElement = screen.getByText(/No bugs reported yet/i);
    expect(messageElement).toBeInTheDocument();
  });

  test("adds a new bug successfully", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter bug title/i);
    const button = screen.getByText(/Add Bug/i);
    fireEvent.change(input, { target: { value: "Login error" } });
    fireEvent.click(button);
    const newBug = screen.getByText(/Login error/i);
    expect(newBug).toBeInTheDocument();
  });

  test("does not add empty bug titles", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter bug title/i);
    const button = screen.getByText(/Add Bug/i);

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    const messageElement = screen.getByText(/No bugs reported yet/i);
    expect(messageElement).toBeInTheDocument();
  });
});