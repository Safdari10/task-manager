interface MonthViewProps {
  currentMonth: number;
  currentYear: number;
}

const MonthView = ({ currentMonth, currentYear }: MonthViewProps) => {
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = (firstDayIndex + 6) % 7;

  const daysToShowFromLast = () => {
    const lastMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    return firstDayIndex === 0
      ? []
      : Array.from({ length: firstDayIndex }, (_, i) => lastMonthDays - firstDayIndex + i + 1);
  };

  const thisMonthDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  const currentDate = () => {
    const todayMonth = new Date().getMonth();
    const todayYear = new Date().getFullYear();
    return todayMonth === currentMonth && todayYear === currentYear ? new Date().getDate() : null;
  };

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
    </div>
  );
};

export default MonthView;
