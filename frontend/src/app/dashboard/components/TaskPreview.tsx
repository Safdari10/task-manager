import { FaEllipsisV } from "react-icons/fa";

const TaskPreview = () => {
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
    <div className="w-[25rem] h-[23rem] w-max-content flex flex-col justify-start items-start gap-2 bg-white rounded-3xl shadow-md py-4">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4 px-6">
        <h2 className="text-md font-bold">My Tasks</h2>
        <div className="text-gray-700 cursor-pointer pr-4">
          <FaEllipsisV />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {sampleTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between py-4 px-7 border-b last:border-b-0 border-b-gray-500 w-full">
            <div>
              <input type="checkbox" className="form-checkbox h-5 w-5" />
            </div>
            <div className="text-md">{task.title}</div>
            <div className="text-right text-md">{task.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPreview;
