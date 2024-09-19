import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "@/components/Tasklist";

const tasks = [
  { id: 1, title: "Task 1", dueDate: "2024-09-10", completed: false },
  { id: 2, title: "Task 2", dueDate: "2024-09-11", completed: true },
];

describe("TaskList Component", () => {
  test("renders multiple task items", () => {
    render(
      <TaskList
        tasks={tasks}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(2);

    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("2024-09-10")).toBeInTheDocument();
    expect(screen.getByText("2024-09-11")).toBeInTheDocument();
  });

  test("shows message when no tasks are available", () => {
    render(
      <TaskList
        tasks={[]}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    expect(screen.getByText("No tasks available.")).toBeInTheDocument();

    const checkbox = screen.queryByRole("checkbox");
    expect(checkbox).toBeNull();
  });

  test("can toggle task completion", () => {
    const onToggleComplete = jest.fn();
    render(
      <TaskList
        tasks={tasks}
        onToggleComplete={onToggleComplete}
        onDelete={jest.fn()}
        onEdit={jest.fn()}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    expect(onToggleComplete).toHaveBeenCalledWith(1);
  });

  test("can edit a task", () => {
    const onEdit = jest.fn();
    render(
      <TaskList
        tasks={tasks}
        onToggleComplete={jest.fn()}
        onDelete={jest.fn()}
        onEdit={onEdit}
      />
    );

    const editButtons = screen.getAllByRole("button", { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledWith(1);
  });

  test("can delete a task", () => {
    const onDelete = jest.fn();
    render(
      <TaskList
        tasks={tasks}
        onToggleComplete={jest.fn()}
        onDelete={onDelete}
        onEdit={jest.fn()}
      />
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
    fireEvent.click(deleteButtons[1]);

    expect(onDelete).toHaveBeenCalledWith(2);
  });
});
