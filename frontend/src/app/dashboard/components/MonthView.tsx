interface MonthViewProps {
  currentMonth: number;
  currentYear: number;
}

const MonthView = ({ currentMonth, currentYear }: MonthViewProps) => {
  // Calculate the weekday index for the 1st day of the month (Monday = 0)
  let firstWeekdayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  firstWeekdayOfMonth = (firstWeekdayOfMonth + 6) % 7;

  // Previous month's last days to fill the first week
  const getPrevMonthDays = () => {
    const prevMonthTotalDays = new Date(currentYear, currentMonth, 0).getDate();
    return firstWeekdayOfMonth === 0
      ? []
      : Array.from(
          { length: firstWeekdayOfMonth },
          (_, i) => prevMonthTotalDays - firstWeekdayOfMonth + i + 1
        );
  };

  // Current month's days
  const getCurrentMonthDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // Today's date (only if in current month/year)
  const getToday = () => {
    const today = new Date();
    return today.getMonth() === currentMonth && today.getFullYear() === currentYear
      ? today.getDate()
      : null;
  };

  // Next month's first days to fill the last week(s)
  const getNextMonthDays = () => {
    const totalGridCells = 42; // 6 weeks x 7 days
    const prevDays = getPrevMonthDays().length;
    const currentDays = getCurrentMonthDays().length;
    const nextDays = totalGridCells - (prevDays + currentDays);
    return Array.from({ length: nextDays }, (_, i) => i + 1);
  };

  const prevMonthDays = getPrevMonthDays();
  const currentMonthDays = getCurrentMonthDays();
  const nextMonthDays = getNextMonthDays();
  const today = getToday();

  return (
    <div className="grid grid-cols-7 gap-2 w-full p-2 place-items-center">
      {daysToShowFromLast().map((day, index) => (
        <div key={index} className="text-gray-400">
          {day}
        </div>
      ))}
      {thisMonthDays().map((_, index) => (
        <div
          key={index}
          className={`text-center text-sm ${
            currentDate() === index + 1
              ? "w-full font-bold bg-amber-300 rounded-full border border-gray-500"
              : ""
          }`}>
          {index + 1}
        </div>
      ))}
      {nextMonthDays().map((day, index) => (
        <div key={index} className="text-gray-400">
          {day}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
