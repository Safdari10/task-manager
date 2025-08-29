import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (response.ok) {
        const data = await response.json();
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <main className="flex-row align-center justify-center bg-amber-50 max-w-md p-20">
        <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
        <p className="mt-4 text-gray-600">Manage your tasks efficiently</p>{" "}
      </main>
    </div>
  );
};

export default taskManager;
