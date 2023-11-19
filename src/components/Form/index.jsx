import { bool, func } from "prop-types";
import { useEffect, useState } from "react";
import { Modal } from "../Modal";
import { useEventUpdate } from "../../contexts/EventContext";
import styles from "./Form.module.css";
// ------------ defined colors ------------
import { COLORS } from "../../constants";
// ------------ random colors ------------
// import { generateBackgroundTextColor } from "../../utils";

export const Form = ({ isVisible, setVisibility }) => {
  const key = location.pathname.split("/").at(-1);
  const setEvents = useEventUpdate();
  // ------------ random colors ------------
  // const eventStyles = useMemo(generateBackgroundTextColor, []);

  const [formData, setFormData] = useState({
    name: "",
    invitees: "",
    time: "",
    // ------------ random colors ------------
    // styles: eventStyles,
  });

  const handleCancel = () => {
    setFormData({
      name: "",
      invitees: "",
      time: "",
      // ------------ random colors ------------
      // styles: generateBackgroundTextColor(),
    });
    history.replaceState(null, null, "/");
    setVisibility(false);
  };

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const index = new URLSearchParams(location.search).get("edit");

    // ------------ random colors ------------
    // setEvents((prevEvents) => {
    //   let updatedEvents;
    //   if (index) {
    //     updatedEvents = prevEvents[key].toSpliced(index, 1, formData);
    //   } else {
    //     updatedEvents =
    //       key in prevEvents ? [...prevEvents[key], formData] : [formData];
    //   }

    //   return { ...prevEvents, [key]: updatedEvents };
    // });

    // ------------ defined colors ------------
    setEvents((prevEvents) => {
      const updatedEvents = [...(prevEvents[key] || [])];
      if (index) {
        updatedEvents.splice(parseInt(index), 1, formData);
      } else {
        const unusedColors = COLORS.filter(
          (color) =>
            !updatedEvents.some(
              ({ styles }) => styles.backgroundColor === color.backgroundColor
            )
        );
        updatedEvents.push({
          ...formData,
          styles: unusedColors[0],
        });
      }

      return { ...prevEvents, [key]: updatedEvents };
    });

    handleCancel();
  };

  useEffect(() => {
    if (isVisible && history.state) {
      setFormData({ ...history.state });
    }
  }, [isVisible]);

  return (
    <Modal isVisible={isVisible}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="invitees">Invitees by email:</label>
          <input
            type="email"
            id="invitees"
            name="invitees"
            value={formData.invitees}
            onChange={handleInputChange}
            multiple
            required
          />
        </div>

        <div>
          <label htmlFor="time">Time (12-hour format):</label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            pattern="^(0?[1-9]|1[0-2]):[0-5][0-9] ?[APMapm]{2}$"
            placeholder="hh:mm AM/PM"
            title="Please enter a valid time in 12-hour format"
            required
          />
        </div>

        <div className={styles["button-container"]}>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

Form.propTypes = {
  isVisible: bool,
  setVisibility: func,
};
