import { DAY_LIST } from "../../constants";
export const Days = () => {
  return (
    <div className="days-container">
      {DAY_LIST.map((day) => (
        <p key={day}>{day}</p>
      ))}
    </div>
  );
};
