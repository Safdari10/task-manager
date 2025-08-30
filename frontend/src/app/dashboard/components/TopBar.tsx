import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-white shadow-md">
      <input type="text" placeholder="Search tasks..." />
      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">+ New Task</button>
      </div>
    </div>
  );
};

export default TopBar;
