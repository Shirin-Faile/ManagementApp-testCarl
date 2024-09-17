import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../app/page";

test("adds a new task and displays it in the list", () => {
  render(<HomePage />);

  const taskTitleInput = screen.getByLabelText(/task title/i);
  const dueDateInput = screen.getByLabelText(/due date/i);
  const addButton = screen.getByRole("button", { name: /add task/i });

  fireEvent.change(taskTitleInput, { target: { value: "New Task" } });
  fireEvent.change(dueDateInput, { target: { value: "2024-09-12" } });

  fireEvent.click(addButton);

  expect(screen.getByText("New Task")).toBeInTheDocument();
  expect(screen.getByText("2024-09-12")).toBeInTheDocument();
});
("");
