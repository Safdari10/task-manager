import { useEffect, Fragment, useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import { FaCheck } from "react-icons/fa";
import { formatDate } from "@/utils/dateUtils";

const MyTasks = () => {
  const { tasks, fetchTasks, deleteTask } = useTasks();
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleTaskSelect = (taskId: string) => {
    setSelectedTasks((prevSelected) => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter((id) => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedTasks.map((taskId) => deleteTask(taskId.toString())));
      setSelectedTasks([]);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const tableHeaders = ["Task", "Description", "Status", "Created At", "Updated At"];

  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4 bg-white rounded-3xl shadow-md py-4">
      <div className="w-full h-full grid grid-cols-5">
        {tableHeaders.map((header) => (
          <div
            key={header}
            className={`${
              ["Task", "Description"].includes(header) ? "text-left pl-6" : "text-center"
            } font-semibold border-b-2 border-b-gray-200 w-full pb-4`}>
            {header}
          </div>
        ))}
        {tasks.map((task) => (
          <Fragment key={task.id}>
            <div className="flex items-center text-left pb-4 pl-6">
              <label
                className="cursor-pointer relative block w-[1.4rem] h-[1.4rem] mr-2"
                htmlFor={`task-${task.id}`}>
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  className="peer opacity-0 absolute inset-0"
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleTaskSelect(task.id)}
                />
                <span
                  className="w-[1.4rem] h-[1.4rem] rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center peer-checked:bg-amber-300
                transition-colors duration-200 [&>svg]:hidden peer-checked:[&>svg]:block">
                  <FaCheck className="text-black text-xs" />
                </span>
              </label>
              {task.title}
            </div>
            <div className="text-left pb-4 pl-6">{task.description}</div>
            <div className="text-center pb-4">{task.status}</div>
            <div className="text-center pb-4">{formatDate(task.created_at)}</div>
            <div className="text-center pb-4">{formatDate(task.updated_at)}</div>
          </Fragment>
        ))}
      </div>
      <div className="w-full flex justify-end gap-2 px-6 pb-2">
        {selectedTasks.length > 0 && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 transition">
            Delete Task
          </button>
        )}
      </div>
    </div>
  );
};

export default MyTasks;
