import React from "react";
import Dashboard from "./Dashboard";
import MyTasks from "./MyTasks";

const SidePanel = () => {
  return (
    <div>
      <div>
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
          <p className="mt-4 text-gray-600">Manage your tasks efficiently</p>
        </div>
        <Dashboard />
        <MyTasks />
      </div>
      <div>
        <button className="bg-red-500 text-white py-2 px-4 rounded mt-4">Logout</button>
      </div>
    </div>
  );
};

export default SidePanel;
