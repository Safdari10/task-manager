import { FaEllipsisV } from "react-icons/fa";

const MyCategories = () => {
  return (
    <div className="w-[18rem] h-[23rem] flex flex-col justify-start items-start gap-2 bg-white rounded-3xl shadow-md py-4">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4 px-6">
        <h2 className="text-md font-bold">My Categories</h2>
        <div className="text-gray-700 cursor-pointer pr-4">
          <FaEllipsisV />
        </div>
      </div>
    </div>
  );
};

export default MyCategories;
