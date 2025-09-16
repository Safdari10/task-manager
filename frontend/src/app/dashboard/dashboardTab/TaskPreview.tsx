import { useEffect } from "react";
import { FaEllipsisV, FaCheck } from "react-icons/fa";
import { useTasks } from "@/hooks/useTasks";

const TaskPreview = () => {
  const { tasks, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const sampleTasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description for Task 1",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description for Task 2",
      status: "completed",
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description for Task 3",
      status: "in-progress",
    },
    {
      id: 4,
      title: "Task 4",
      description: "Description for Task 4",
      status: "completed",
    },
    {
      id: 5,
      title: "Task 5",
      description: "Description for Task 5",
      status: "in-progress",
    },
  ];

  return (
    <div className="w-[22rem] h-[23rem] flex flex-col items-start gap-2 bg-white rounded-3xl shadow-md py-4">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4 px-6">
        <h2 className="text-md font-bold">My Tasks</h2>
        <div className="text-gray-700 cursor-pointer pr-4">
          <FaEllipsisV />
        </div>
      </div>
      <div className="flex flex-col items-stretch w-full">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between py-4 px-7 border-b last:border-b-0 border-b-gray-500 w-full">
            <div className="flex items-center">
              <label className="cursor-pointer relative block w-[1.6rem] h-[1.6rem]">
                <input
                  type="checkbox"
                  id={`task-${task.id}`}
                  className="peer opacity-0 absolute inset-0"
                />
                <span
                  className="w-[1.6rem] h-[1.6rem] rounded-full border-2 border-gray-300 bg-gray-100 flex items-center justify-center peer-checked:bg-amber-300
                transition-colors duration-200 [&>svg]:hidden peer-checked:[&>svg]:block">
                  <FaCheck className="text-black text-sm" />
                </span>
              </label>
            </div>
            <div className="text-base">{task.title}</div>
            <div className="text-right text-base">{task.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPreview;
