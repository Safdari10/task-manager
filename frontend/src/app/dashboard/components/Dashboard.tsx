import Calender from "./Calender";
import TaskPreview from "./TaskPreview";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex items-start justify-start gap-10 ">
      <Calender />
      <TaskPreview />
    </div>
  );
};

export default Dashboard;
