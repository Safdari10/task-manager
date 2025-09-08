import { FaUserCircle, FaPlus } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-3xl  shadow-md">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-2/6 bg-gray-200 rounded-lg p-2 text-md"
      />
      <div className="flex items-center">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center">
          <FaPlus className="mr-2" /> New Task
        </button>
        <button className="bg-gray-200 text-gray-800 p-2 rounded-full ml-4">
          <FaUserCircle className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
