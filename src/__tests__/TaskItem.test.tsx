import { render, screen, fireEvent } from "@testing-library/react";
import TaskItem from "../components/TaskItem";

const mockTask = {
  id: 1,
  title: "Test Task",
  dueDate: "2024-09-10",
  completed: false,
};

describe("TaskItem Component", () => {
  test("renders task item with checkbox and buttons", () => {
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const editButton = screen.getByRole("button", { name: /edit/i });

    expect(checkbox).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("2024-09-10")).toBeInTheDocument();
  });

  test("can toggle task completion", () => {
    const onToggleComplete = jest.fn();
    const task = { ...mockTask, completed: false };

    render(
      <TaskItem
        task={task}
        onToggleComplete={onToggleComplete}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onToggleComplete).toHaveBeenCalledTimes(1);
  });

  test("displays line-through when task is completed", () => {
    const completedTask = { ...mockTask, completed: true };

    render(
      <TaskItem
        task={completedTask}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    const taskTitle = screen.getByText("Test Task");
    expect(taskTitle).toHaveClass("line-through");
  });

  test("can delete a task", () => {
    const onDelete = jest.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={jest.fn()}
        onDelete={onDelete}
        onEdit={jest.fn()}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  test("can edit a task", () => {
    const onEdit = jest.fn();

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
        onEdit={onEdit}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockTask.id);
  });
});
