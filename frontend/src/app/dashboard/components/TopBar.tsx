import React from "react";

const TopBar = () => {
  return (
    <div>
      <div>
        <input type="text" placeholder="Search tasks..." />
      </div>
      <div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">+ New Task</button>
      </div>
    </div>
  );
};

export default TopBar;
