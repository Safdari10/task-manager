"use client";

import SidePanel from "./components/SidePanel";

const TaskManager = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <SidePanel />
      <main className="flex-row align-center justify-center bg-amber-50 max-w-md p-20"></main>
    </div>
  );
};

export default TaskManager;
