import type { Task, NewTask } from "@/context/TaskContext";

export const createTask = async (task: NewTask) => {
  try {
    const URL = "http://localhost:8000/api/tasks";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    const data: Task = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
