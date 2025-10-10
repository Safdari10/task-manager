"use client";

import { createContext, useState, ReactNode, useCallback } from "react";
import {
  createTask as createTaskApi,
  fetchTasks as fetchTasksApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "@/utils/taskService";
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface NewTask {
  title: string;
  description: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  createTask: (task: NewTask) => void;
  fetchTasks: () => void;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

TaskContext.displayName = "TaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = async (task: NewTask) => {
    try {
      const newTask = await createTaskApi(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const fetchTasks = useCallback(async () => {
    try {
      const fetchedTasks = await fetchTasksApi();
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, []);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const task = await updateTaskApi(updatedTask);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? task : t)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const task = await deleteTaskApi(taskId);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, createTask, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
