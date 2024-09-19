"use client";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [nextId, setNextId] = useState(1);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const addTask = () => {
    if (newTaskTitle && newTaskDueDate) {
      setTasks([
        ...tasks,
        {
          id: nextId,
          title: newTaskTitle,
          dueDate: newTaskDueDate,
          completed: false,
        },
      ]);
      setNextId(nextId + 1);
      setNewTaskTitle("");
      setNewTaskDueDate("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newTitle: string, newDueDate: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, dueDate: newDueDate } : task
      )
    );
  };

  return (
    <div>
      <h1>Task Management</h1>

      <div>
        <label>
          Task Title:
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
          />
        </label>
        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <span className={task.completed ? "line-through" : ""}>
                {task.title} - {task.dueDate}
              </span>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button
                onClick={() =>
                  editTask(
                    task.id,
                    prompt("Edit task title", task.title) || task.title,
                    prompt("Edit due date", task.dueDate) || task.dueDate
                  )
                }
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

