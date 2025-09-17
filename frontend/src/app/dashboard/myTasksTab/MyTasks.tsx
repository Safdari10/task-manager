import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";

const MyTasks = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4 bg-white rounded-3xl shadow-md p-4">
      <div className="grid grid-cols-4"></div>
    </div>
  );
};

export default MyTasks;
