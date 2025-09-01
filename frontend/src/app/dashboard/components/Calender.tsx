import React, { useState } from "react";
import MonthView from "./MonthView";

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

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

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
    <div className="w-[20rem] h-max-content flex flex-col justify-start items-start gap-2 bg-white rounded-3xl shadow-md p-6">
      <div className="flex items-center justify-between w-full border-b-2 border-b-gray-200 pb-4">
        <h2 className="text-lg">
          {months[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-2">
          <button className="text-lg" onClick={() => handleMonthChange("<")}>
            {"<"}
          </button>
          <button className="text-lg" onClick={() => handleMonthChange(">")}>
            {">"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 w-full p-2 place-items-center">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <MonthView currentMonth={currentMonth} currentYear={currentYear} />
    </div>
  );
};

export default Calender;
