import { useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";

const MyTasks = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tableHeaders = ["Title", "Description", "Status", "Created At", "Updated At"];

  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4 bg-white rounded-3xl shadow-md p-4">
      <div className="grid grid-cols-4">
        {tableHeaders.map((header) => (
          <div key={header} className="text-center font-semibold">
            {header}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
