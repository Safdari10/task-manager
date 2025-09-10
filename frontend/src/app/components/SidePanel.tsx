import { removeToken } from "@/utils/tokenStorage";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";

interface SidePanelProps {
  openTab: string;
  setOpenTab: (tab: string) => void;
}

const SidePanel = ({ openTab, setOpenTab }: SidePanelProps) => {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/");
  };

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
      <div className="w-full flex items-center justify-start mb-3 pt-3 px-6 border-t-2 border-t-gray-200">
        <button className="text-xl text-gray-600 py-2 px-4 rounded" onClick={handleLogout}>
          <FaSignOutAlt className="inline mr-2 text-2xl" />
          Log out
        </button>
      </div>
    </div>
  );
};

export default SidePanel;
