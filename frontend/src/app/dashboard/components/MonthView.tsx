interface MonthViewProps {
  currentMonth: number;
  currentYear: number;
}

const MonthView = ({ currentMonth, currentYear }: MonthViewProps) => {
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = (firstDayIndex + 6) % 7;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const totalDays = Array.from({ length: daysInMonth });

  return (
    <div>
      {Array.from({ length: firstDayIndex }).map((_, index) => (
        <div key={index}></div>
      ))}
      {totalDays.map((_, index) => (
        <div key={index}>{index + 1}</div>
      ))}
    </div>
  );
};

export default MonthView;
