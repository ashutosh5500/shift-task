import React from "react";
import "../Styling/Field.scss";

const select = (props) => {
  const { text, onChange, value, optionsArray = [], errorFlag } = props;
  return (
    <div className={"input-main"}>
      <div className={"label-field"}>
        <label>{text}</label>
      </div>
      <div className="select-input-wrapper">
        <select className={"input-field"} onChange={onChange} {...props}>
          {optionsArray.map((item) => {
            return <option value={item.value}>{item.optionText}</option>;
          })}
        </select>
        {errorFlag ? (
          <span className="error-label">This field is required</span>
        ) : null}
      </div>
    </div>
  );
};

export default select;
