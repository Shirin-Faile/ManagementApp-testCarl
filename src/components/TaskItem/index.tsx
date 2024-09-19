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
    <div className="task-item flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <div className={`ml-2 ${task.completed ? "line-through" : ""}`}>
          <p>{task.title}</p>
          <p>{task.dueDate}</p>
        </div>
      </div>
      <div>
        <button onClick={() => onEdit(task.id)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
