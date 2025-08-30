"use client";

import SidePanel from "./components/SidePanel";
import TopBar from "./components/TopBar";

const TaskManager = () => {
  return (
    <div className="flex items-center justify-between w-full bg-gray-100">
      <div className="w-1/4 bg-white h-screen p-6 shadow-md">
        <SidePanel />
      </div>
      <main className="w-3/4 flex align-center justify-center bg-amber-50 mx-10">
        <TopBar />
        {/* Main content goes here */}
      </main>
    </div>
  );
};

export default TaskManager;
