import type { Task, NewTask } from "@/context/TaskContext";

const TASKS_API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const createTask = async (task: NewTask) => {
  try {
    const response = await fetch(TASKS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export const fetchTasks = async () => {
  try {
    const response = await fetch(TASKS_API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data as Task[];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
