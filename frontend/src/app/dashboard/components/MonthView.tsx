interface MonthViewProps {
  currentMonth: number;
  currentYear: number;
}

const MonthView = ({ currentMonth, currentYear }: MonthViewProps) => {
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = (firstDayIndex + 6) % 7;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalDays = Array.from({ length: daysInMonth });
  const currentDate = new Date().getDate();

  return (
    <div className="grid grid-cols-7 gap-2 w-full p-2 place-items-center">
      {Array.from({ length: firstDayIndex }).map((_, index) => (
        <div key={index}></div>
      ))}
      {totalDays.map((_, index) => (
        <div
          key={index}
          className={`text-center ${
            currentDate === index + 1
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
