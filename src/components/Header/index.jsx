import { MONTH_LIST } from "../../constants";
import { number } from "prop-types";
import styles from "./Header.module.css";

export const Header = ({ year, month }) => {
  return (
    <div className={styles.header}>
      <b>{MONTH_LIST[month]}</b>
      <b>{year}</b>
    </div>
  );
};

Header.propTypes = {
  year: number,
  month: number,
};
