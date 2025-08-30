"use client";

import SidePanel from "./components/SidePanel";

const TaskManager = () => {
  return (
    <div className="flex items-center justify-between bg-gray-100">
      <div className="w-1/4 bg-white h-screen p-6 shadow-md">
        <SidePanel />
      </div>
      <main className="flex-row align-center justify-center bg-amber-50"></main>
    </div>
  );
};

export default TaskManager;
