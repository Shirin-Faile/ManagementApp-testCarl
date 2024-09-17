import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage Integration Tests", () => {
  test("adds a task and updates the task list state", () => {
    render(<HomePage />);

    const taskTitleInput = screen.getByPlaceholderText(/task title/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(taskTitleInput, { target: { value: "New Task" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("2024-09-12")).toBeInTheDocument();
  });

  test("toggles task completion and updates the task state", () => {
    render(<HomePage />);

    const taskTitleInput = screen.getByPlaceholderText(/task title/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.change(taskTitleInput, { target: { value: "Task to Complete" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText("Task to Complete")).toHaveClass("line-through");
  });

  test("deletes a task and updates the task list state", () => {
    render(<HomePage />);

    const taskTitleInput = screen.getByPlaceholderText(/task title/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });
    fireEvent.change(taskTitleInput, { target: { value: "Task to Delete" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
  });
});
