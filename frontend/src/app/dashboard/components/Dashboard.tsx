import Calender from "./Calender";
import MyCategories from "./MyCategories";
import TaskPreview from "./TaskPreview";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex items-start justify-start gap-10 ">
      <Calender />
      <TaskPreview />
      <MyCategories />
    </div>
  );
};

export default Dashboard;
