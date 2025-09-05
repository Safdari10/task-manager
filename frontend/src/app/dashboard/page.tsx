"use client";

import { useState } from "react";
import SidePanel from "./components/SidePanel";
import TopBar from "./components/TopBar";
import Dashboard from "./components/Dashboard";
import MyTasks from "./components/MyTasks";

const TaskManager = () => {
  const [openTab, setOpenTab] = useState("dashboard");

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <div className="flex items-start justify-center w-full h-full max-w-screen-xl m-8 bg-amber-50 rounded-3xl">
        <div className="w-1/4 h-screen py-10 pl-10">
          <SidePanel openTab={openTab} setOpenTab={setOpenTab} />
        </div>
        <main className="w-3/4 h-full flex flex-col p-10 gap-6">
          <TopBar />
          {openTab === "dashboard" && <Dashboard />}
          {openTab === "myTasks" && <MyTasks />}
        </main>
      </div>
    </div>
  );
};

export default TaskManager;
