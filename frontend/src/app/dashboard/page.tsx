"use client";

import SidePanel from "./components/SidePanel";
import TopBar from "./components/TopBar";

const TaskManager = () => {
  return (
    <div className="flex items-start justify-center w-full h-full bg-gray-100">
      <div className="w-1/4 h-screen py-10 pl-10">
        <SidePanel />
      </div>
      <main className="w-3/4 h-full flex flex-col p-10 gap-6">
        <TopBar />
        {/* Main content goes here */}
      </main>
    </div>
  );
};

export default TaskManager;
