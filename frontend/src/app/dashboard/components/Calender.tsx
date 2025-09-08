import React, { useState } from "react";
import MonthView from "./MonthView";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  const handleMonthChange = (direction: ">" | "<") => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === ">") {
      if (newMonth === 11) {
        newMonth = 0;
        newYear = currentYear + 1;
      } else {
        newMonth = currentMonth + 1;
      }
    } else {
      if (newMonth === 0) {
        newMonth = 11;
        newYear = currentYear - 1;
      } else {
        newMonth = currentMonth - 1;
      }
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };
  return (
    <div className="w-[18rem] h-[23rem] flex flex-col justify-start items-start gap-2 bg-white rounded-3xl shadow-md py-4">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4 px-6">
        <h2 className="text-base font-bold">
          {months[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-4 pr-4">
          <button className="text-gray-700 cursor-pointer" onClick={() => handleMonthChange("<")}>
            <FaChevronLeft />
          </button>
          <button className="text-gray-700 cursor-pointer" onClick={() => handleMonthChange(">")}>
            <FaChevronRight />
          </button>
        </div>
      </div>
      <MonthView currentMonth={currentMonth} currentYear={currentYear} />
    </div>
  );
};

export default Calender;
