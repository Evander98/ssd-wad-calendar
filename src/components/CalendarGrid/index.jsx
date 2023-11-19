import { useEvent } from "../../contexts/EventContext";
import { getDayName, getIsWeekend } from "../../utils";
import { number, func } from "prop-types";
import { Cell } from "../Cell";

export const CalendarGrid = ({ year, month, setVisibility }) => {
  const events = useEvent();

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const emptyCells = [...Array(firstDayOfMonth)].map((_item, i) => (
    <Cell key={`empty-${i}`} isEmpty={true} />
  ));

  const calendarCells = [...Array(totalDaysInMonth)].map((_item, i) => {
    const dayNumber = i + 1;
    const dayName = getDayName(year, month, dayNumber);
    const weekend = getIsWeekend(dayName);
    const date = `${year}${month}${dayNumber}`;
    const eventsOnDay = events[date] ?? [];

    return (
      <Cell
        key={`day-${dayNumber}`}
        dayNumber={dayNumber}
        weekend={weekend}
        date={date}
        eventsOnDay={eventsOnDay}
        setVisibility={setVisibility}
      />
    );
  });
  return (
    <main className="calendar-grid">{emptyCells.concat(calendarCells)}</main>
  );
};

CalendarGrid.defaultProps = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  setVisibility: () => {},
};

CalendarGrid.propTypes = { year: number, month: number, setVisibility: func };
