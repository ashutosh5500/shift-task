import React from "react";
import "../Styling/Day.scss";
const day = (props) => {
  const { data, onSelectEvent } = props;
  const { id, text, value } = data;
  return (
    <div className="day">
      <div>{text}</div>
      <div
        className={`circle ${value ? "active" : ""}`}
        onClick={() => {
          onSelectEvent(id)
        }}
      ></div>
    </div>
  );
};

export default day;
