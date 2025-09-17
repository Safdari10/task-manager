import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";

const MyTasks = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
  return <div>MyTasks</div>;
};

export default MyTasks;
