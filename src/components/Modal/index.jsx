import { bool, element } from "prop-types";
import styles from "./Modal.module.css";
export const Modal = ({ isVisible, children }) => {
  return (
    <div
      className={`${styles.modal} ${isVisible ? styles["modal-active"] : ""}`}
    >
      {children}
    </div>
  );
};

Modal.propTypes = {
  isVisible: bool,
  children: element,
};
