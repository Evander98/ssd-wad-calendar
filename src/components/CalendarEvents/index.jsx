import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { string, number, object, func } from "prop-types";
import { useEventUpdate } from "../../contexts/EventContext";
import styles from "./CalendarEvents.module.css";

export const CalendarEvents = ({
  name,
  invitees,
  time,
  eventStyles,
  date,
  index,
  toggleModal,
}) => {
  const setEvents = useEventUpdate();

  const handleDelete = (e) => {
    e.stopPropagation();
    setEvents((prevEvents) => {
      let newEvents = prevEvents[date].toSpliced(index, 1);
      return { ...prevEvents, [date]: newEvents };
    });
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    toggleModal(`${date}?edit=${index}`, {
      name,
      invitees,
      time,
      styles: eventStyles,
    });
  };

  return (
    <div className={styles.events} style={eventStyles}>
      <div className={styles["events-header"]}>
        <p>{name}</p>
        <div>
          <BsTrash onClick={handleDelete} />
          <BsPencilSquare onClick={handleEdit} />
        </div>
      </div>
      <p>{invitees}</p>
      <p>{time}</p>
    </div>
  );
};

CalendarEvents.propTypes = {
  name: string.isRequired,
  invitees: string.isRequired,
  time: string.isRequired,
  eventStyles: object.isRequired,
  date: string.isRequired,
  index: number.isRequired,
  toggleModal: func.isRequired,
};
