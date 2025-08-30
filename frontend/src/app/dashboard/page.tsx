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
      <div className="flex items-start justify-center w-full h-full max-w-[1280px] bg-amber-50 ">
        <div className="w-[20%] h-screen py-10 pl-10">
          <SidePanel setOpenTab={setOpenTab} />
        </div>
        <main className="w-[80%] h-full flex flex-col p-10 gap-6">
          <TopBar />
          {openTab === "dashboard" && <Dashboard />}
          {openTab === "myTasks" && <MyTasks />}
        </main>
      </div>
    </div>
  );
};

export default TaskManager;
