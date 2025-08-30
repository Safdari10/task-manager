import React from "react";

interface SidePanelProps {
  openTab: string;
  setOpenTab: (tab: string) => void;
}

const SidePanel = ({ openTab, setOpenTab }: SidePanelProps) => {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full py-2 bg-white rounded-3xl shadow-md">
      <div className="flex flex-col items-center justify-center w-full pt-4">
        <div className="flex flex-col items-center justify-center w-full pb-6 border-b-2 border-b-gray-200">
          <h1 className="w-full text-left text-2xl font-bold text-blue-600 px-6">Task Manager</h1>
          <p className="w-full text-left mt-4 text-gray-600 px-6">Manage your tasks efficiently</p>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <button
            onClick={() => setOpenTab("dashboard")}
            className={`w-full text-left text-md font-semibold text-gray-700 py-3 px-6 cursor-pointer border-b-2 border-b-gray-200  ${
              openTab === "dashboard" ? "bg-amber-100" : ""
            }`}>
            Dashboard
          </button>
          <button
            onClick={() => setOpenTab("myTasks")}
            className={`w-full text-left text-md font-semibold text-gray-700 py-3 px-6 cursor-pointer border-b-2 border-b-gray-200  ${
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
