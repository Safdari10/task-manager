interface MonthViewProps {
  currentMonth: number;
  currentYear: number;
}

const MonthView = ({ currentMonth, currentYear }: MonthViewProps) => {
  let firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  firstDayIndex = (firstDayIndex + 6) % 7;

  return (
    <div>
      {Array.from({ length: firstDayIndex }).map((_, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};

export default MonthView;
