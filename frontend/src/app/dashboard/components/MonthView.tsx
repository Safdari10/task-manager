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

  const getGridCells = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const requiredCells = firstWeekdayOfMonth + daysInMonth;
    const numRows = Math.ceil(requiredCells / 7);
    return numRows * 7;
  };

  // Next month's first days to fill the last week(s)
  const getNextMonthDays = () => {
    const prevDays = getPrevMonthDays().length;
    const currentDays = getCurrentMonthDays().length;
    const nextDays = getGridCells() - (prevDays + currentDays);
    return Array.from({ length: nextDays }, (_, i) => i + 1);
  };

  const prevMonthDays = getPrevMonthDays();
  const currentMonthDays = getCurrentMonthDays();
  const nextMonthDays = getNextMonthDays();
  const today = getToday();

  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div className="grid grid-cols-7 gap-4 w-full p-2 place-items-center">
      {weekDays.map((day) => (
        <div key={day} className="text-center font-semibold">
          {day}
        </div>
      ))}
      {prevMonthDays.map((day, idx) => (
        <div key={`prev-${day}-${idx}`} className="text-gray-400">
          {day}
        </div>
      ))}
      {currentMonthDays.map((day) => (
        <div
          key={`current-${day}`}
          className={`text-center text-md ${
            today === day ? "w-full font-bold bg-amber-300 rounded-full border border-gray-500" : ""
          }`}>
          {day}
        </div>
      ))}
      {nextMonthDays.map((day, idx) => (
        <div key={`next-${day}-${idx}`} className="text-gray-400">
          {day}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
