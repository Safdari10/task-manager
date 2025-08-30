import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white rounded-3xl  shadow-md">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-2/6 bg-gray-200 rounded-lg p-2 text-md"
      />
      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">+ New Task</button>
      </div>
    </div>
  );
};

export default TopBar;
