import { useTasks } from "@/hooks/useTasks";

const MyTasks = () => {
  const { tasks, fetchTasks } = useTasks();

  return <div>MyTasks</div>;
};

export default MyTasks;
