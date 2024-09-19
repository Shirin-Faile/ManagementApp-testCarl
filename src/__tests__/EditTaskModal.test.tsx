import { render, screen, fireEvent } from "@testing-library/react";
import EditTaskModal from "@/components/EditTaskModal";

const mockTask = {
  id: 1,
  title: "Initial Task Title",
  dueDate: "2024-09-10",
  completed: false,
};

describe("EditTaskModal", () => {
  test("renders task details and allows editing", () => {
    const onEditTask = jest.fn();
    const onClose = jest.fn();

    render(
      <EditTaskModal
        task={mockTask}
        onEditTask={onEditTask}
        onClose={onClose}
      />
    );

    const titleInput = screen.getByLabelText(/task title/i);
    const dueDateInput = screen.getByLabelText(/due date/i);
    const saveButton = screen.getByRole("button", { name: /save changes/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(titleInput).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
    expect(titleInput).toHaveValue("Initial Task Title");
    expect(dueDateInput).toHaveValue("2024-09-10");

    fireEvent.change(titleInput, { target: { value: "Updated Task Title" } });
    fireEvent.change(dueDateInput, { target: { value: "2024-10-10" } });

    fireEvent.click(saveButton);

    expect(onEditTask).toHaveBeenCalledWith(
      1,
      "Updated Task Title",
      "2024-10-10"
    );

    expect(onClose).toHaveBeenCalled();
  });

  test("calls onClose when the cancel button is clicked", () => {
    const onEditTask = jest.fn();
    const onClose = jest.fn();

    render(
      <EditTaskModal
        task={mockTask}
        onEditTask={onEditTask}
        onClose={onClose}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
    expect(onEditTask).not.toHaveBeenCalled();
  });
});
