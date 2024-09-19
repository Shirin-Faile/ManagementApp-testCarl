import React from "react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }: TaskItemProps) => {
  return (
    <div className="task-item">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <div className={`ml-2 ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
          <p className="text-lg font-semibold">{task.title}</p>
          <p className="text-sm text-gray-600">{task.dueDate}</p>
        </div>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onEdit(task.id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;


