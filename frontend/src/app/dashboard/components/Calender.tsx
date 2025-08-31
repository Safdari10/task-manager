import React, { useState } from "react";

const Calender = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="w-[20rem] h-[20rem] flex flex-col justify-start items-center gap-2 bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg">
          {months[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-2">
          <button className="text-lg" onClick={() => setCurrentMonth(currentMonth - 1)}>
            {"<"}
          </button>
          <button className="text-lg" onClick={() => setCurrentMonth(currentMonth + 1)}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calender;
