import { FaEllipsisV } from "react-icons/fa";

const TaskPreview = () => {
  return (
    <div className="w-[20rem] w-max-content flex flex-col justify-start items-start gap-2 bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4">
        <h2 className="text-lg font-semibold">My Tasks</h2>
        <FaEllipsisV />
      </div>
    </div>
  );
};

export default TaskPreview;
