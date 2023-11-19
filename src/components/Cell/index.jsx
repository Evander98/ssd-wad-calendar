import { CalendarEvents } from "../CalendarEvents";
import { number, bool, string, func, array } from "prop-types";
import styles from "./Cell.module.css";

export const Cell = ({
  dayNumber,
  weekend,
  date,
  eventsOnDay,
  setVisibility,
  isEmpty,
}) => {
  const toggleModal = (urlKey, state) => {
    history.replaceState(state, "", urlKey);
    setVisibility();
  };
  const onCellClicked = (key, isToggleModal = false) => {
    if (isToggleModal) {
      toggleModal(key);
    } else {
      alert("You cannot add more event on this day!");
    }
  };
  if (isEmpty) return <div className={styles["empty-cell"]} />;
  return (
    <div
      className={`${styles.cell} ${weekend ? styles.weekend : ""}`}
      onClick={() => onCellClicked(date, eventsOnDay?.length < 3)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onCellClicked(date, eventsOnDay?.length < 3);
        }
      }}
      tabIndex={0}
    >
      <b>{dayNumber}</b>
      {eventsOnDay?.map(
        ({ name, invitees, time, styles: eventStyles }, index) => (
          <CalendarEvents
            key={`event-${index}`}
            name={name}
            invitees={invitees}
            time={time}
            eventStyles={eventStyles}
            date={date}
            index={index}
            toggleModal={toggleModal}
          />
        )
      )}
    </div>
  );
};

Cell.propTypes = {
  dayNumber: number,
  weekend: bool,
  date: string,
  eventsOnDay: array,
  setVisibility: func,
  isEmpty: bool,
};
