import React from "react";
import TaskItem from "../TaskItem";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }: TaskListProps) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;

