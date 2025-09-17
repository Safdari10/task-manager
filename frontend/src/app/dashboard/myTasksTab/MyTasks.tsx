import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";

const MyTasks = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tableHeaders = ["Task", "Description", "Status", "Created At", "Updated At"];

  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4 bg-white rounded-3xl shadow-md p-4">
      <div className="w-full h-full grid grid-cols-5">
        {tableHeaders.map((header) => (
          <div key={header} className="text-center font-semibold">
            {header}
          </div>
        ))}
        {tasks.map((task) => (
          <>
            <div className="text-center">{task.title}</div>
            <div className="text-center">{task.description}</div>
            <div className="text-center">{task.status}</div>
            <div className="text-center">{task.created_at}</div>
            <div className="text-center">{task.updated_at}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
