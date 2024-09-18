import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<{ title: string; dueDate: string }[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (taskTitle && dueDate) {
      setTasks((prevTasks) => [...prevTasks, { title: taskTitle, dueDate }]);
      setTaskTitle("");
      setDueDate("");
    }
  };

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl font-bold">Task Manager</h1>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="taskTitle" className="block mb-2">Task Title</label>
          <input
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            aria-label="task title"
            className="border p-2"
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block mb-2">Due Date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="due date"
            className="border p-2"
          />
        </div>
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2">
          Add Task
        </button>
      </div>

      <ul className="mt-8">
        {tasks.map((task, index) => (
          <li key={index} className="border-b py-2">
            <span>{task.title}</span> - <span>{task.dueDate}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
