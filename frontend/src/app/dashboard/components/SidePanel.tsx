import React from "react";

interface SidePanelProps {
  openTab: string;
  setOpenTab: (tab: string) => void;
}

const SidePanel = ({ openTab, setOpenTab }: SidePanelProps) => {
  return (
    <div className="flex flex-col items-start justify-between w-full h-full py-2 bg-white rounded-3xl shadow-md">
      <div className="flex flex-col items-start justify-center gap-4 pt-4">
        <div className="mb-6 px-6">
          <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
          <p className="mt-4 text-gray-600">Manage your tasks efficiently</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <button
            onClick={() => setOpenTab("dashboard")}
            className={`w-full text-left py-2 px-6 cursor-pointer ${
              openTab === "dashboard" ? "bg-amber-100" : ""
            }`}>
            Dashboard
          </button>
          <button
            onClick={() => setOpenTab("myTasks")}
            className={`w-full text-left py-2 px-6 cursor-pointer ${
              openTab === "myTasks" ? "bg-amber-100" : ""
            }`}>
            My Tasks
          </button>
        </div>
      </div>
      <div>
        <button className="bg-red-500 text-white py-2 px-4 rounded mt-4">Logout</button>
      </div>
    </div>
  );
};

export default SidePanel;
