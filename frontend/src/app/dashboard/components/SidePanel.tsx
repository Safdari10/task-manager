import React from "react";
import Dashboard from "./Dashboard";

const SidePanel = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
        <p className="mt-4 text-gray-600">Manage your tasks efficiently</p>
      </div>
      <Dashboard />
    </div>
  );
};

export default SidePanel;
