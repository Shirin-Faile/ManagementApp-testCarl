import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../app/page";

describe("HomePage", () => {
  test("can add a new task", () => {
    render(<HomePage />);

    const taskInput = screen.getByPlaceholderText(/task title/i);
    const dateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(taskInput, { target: { value: "New Task" } });
    fireEvent.change(dateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("2024-09-12")).toBeInTheDocument();
  });

  test("can delete a task", () => {
    render(<HomePage />);

    const taskInput = screen.getByPlaceholderText(/task title/i);
    const dateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(taskInput, { target: { value: "Task to Delete" } });
    fireEvent.change(dateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
  });

  test("can mark a task as completed", () => {
    render(<HomePage />);

    const taskInput = screen.getByPlaceholderText(/task title/i);
    const dateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(taskInput, { target: { value: "Task to Complete" } });
    fireEvent.change(dateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("can edit a task", () => {
    render(<HomePage />);

    const taskInput = screen.getByPlaceholderText(/task title/i);
    const dateInput = screen.getByLabelText(/due date/i);
    const addButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(taskInput, { target: { value: "Task to Edit" } });
    fireEvent.change(dateInput, { target: { value: "2024-09-12" } });
    fireEvent.click(addButton);

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    const editTaskInput = screen.getByDisplayValue("Task to Edit");
    const editDateInput = screen.getByDisplayValue("2024-09-12");

    fireEvent.change(editTaskInput, { target: { value: "Edited Task" } });
    fireEvent.change(editDateInput, { target: { value: "2024-10-10" } });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(saveButton);

    expect(screen.getByText("Edited Task")).toBeInTheDocument();
    expect(screen.getByText("2024-10-10")).toBeInTheDocument();
  });
});
