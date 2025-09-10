import { useState } from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import CreateTask from "./CreateTask";

const TopBar = () => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleNewTaskClick = () => {
    setIsCreateTaskModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-4 bg-white rounded-3xl  shadow-md">
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-2/6 bg-gray-200 rounded-lg p-2 text-md"
        />
        <div className="flex items-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center cursor-pointer"
            onClick={handleNewTaskClick}>
            <FaPlus className="mr-2" /> New Task
          </button>
          <button className="bg-amber-200 text-black p-2 rounded-full ml-4 cursor-pointer">
            <FaUserCircle className="text-2xl" />
          </button>
        </div>
      </div>
      {isCreateTaskModalOpen && <CreateTask />}
    </>
  );
};

export default TopBar;
