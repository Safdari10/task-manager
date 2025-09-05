import Calender from "./Calender";
import Comments from "./Comments";
import MyCategories from "./MyCategories";
import TaskPreview from "./TaskPreview";

const Dashboard = () => {
  return (
    <div className="w-full h-full grid [grid-template-columns:18rem_22rem_10rem] gap-10">
      <Calender />
      <TaskPreview />
      <Comments />
      <MyCategories />
    </div>
  );
};

export default Dashboard;
