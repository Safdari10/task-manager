import { createContext } from "react";
interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

TaskContext.displayName = "TaskContext";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
};
