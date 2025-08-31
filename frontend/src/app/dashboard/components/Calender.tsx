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
      <h2 className="text-lg">
        {months[currentMonth]} {currentYear}
      </h2>
    </div>
  );
};

export default Calender;
