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
    <div className="w-[20rem] w-max-content flex flex-col justify-start items-start gap-2 bg-white rounded-3xl shadow-md py-4">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4">
        <h2 className="text-lg font-semibold px-6">My Tasks</h2>
        <div className="text-gray-700 cursor-pointer px-6">
          <FaEllipsisV />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        {sampleTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between py-3 px-6 border-b last:border-b-0 border-b-gray-500 w-full">
            <div>
              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
            </div>
            <div className="">{task.title}</div>
            <div className="text-right">{task.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskPreview;
