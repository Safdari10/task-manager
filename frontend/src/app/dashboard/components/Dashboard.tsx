import Calender from "./Calender";
import Comments from "./Comments";
import MyCategories from "./MyCategories";
import TaskPreview from "./TaskPreview";

const Dashboard = () => {
  return (
    <div className="w-full h-full flex items-start justify-start gap-10 ">
      <Calender />
      <TaskPreview />
      <Comments />
      <MyCategories />
    </div>
  );
};

export default Dashboard;
