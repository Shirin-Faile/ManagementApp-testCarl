"use client";
import { useState } from "react";
import EditTaskModal from "@/components/EditTaskModal";
import FilterButtons from "@/components/FilterButtons";
import TaskList from "@/components/Tasklist";

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
  const [currentFilter, setCurrentFilter] = useState("all");
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const startEditing = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTaskToEdit(taskToEdit);
      setIsEditing(true);
    }
  };

  const handleEditTask = (id: number, newTitle: string, newDueDate: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, dueDate: newDueDate } : task
      )
    );
    setIsEditing(false);
    setTaskToEdit(null);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setTaskToEdit(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === "completed") return task.completed;
    if (currentFilter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-6">Task Management</h1>

      <div className="mb-6">
        <label className="block mb-3 text-lg font-medium">
          Task Title:
          <input
            type="text"
            className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </label>
        <label className="block mb-3 text-lg font-medium">
          Due Date:
          <input
            type="date"
            className="border-2 border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
          />
        </label>
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      <FilterButtons
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onToggleComplete={toggleComplete}
        onDelete={deleteTask}
        onEdit={startEditing}
      />

      {isEditing && taskToEdit && (
        <EditTaskModal
          task={taskToEdit}
          onEditTask={handleEditTask}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}


