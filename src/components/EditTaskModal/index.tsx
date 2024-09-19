import React, { useState } from "react";

interface EditTaskModalProps {
  task: {
    id: number;
    title: string;
    dueDate: string;
    completed: boolean;
  };
  onEditTask: (id: number, newTitle: string, newDueDate: string) => void;
  onClose: () => void;
}

const EditTaskModal = ({ task, onEditTask, onClose }: EditTaskModalProps) => {
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSave = () => {
    onEditTask(task.id, title, dueDate);
    onClose();
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form>
        <div>
          <label htmlFor="task-title">Task Title</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="due-date">Due Date</label>
          <input
            id="due-date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;
