"use client";

import { createContext, useState, ReactNode } from "react";
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface NewTask {
  title: string;
  description: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  newTask: NewTask[];
  setTasks: (tasks: Task[]) => void;
  createTask: (task: NewTask) => void;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

TaskContext.displayName = "TaskContext";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
