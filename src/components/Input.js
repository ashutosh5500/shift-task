import React from "react";
import "../Styling/Field.scss";
const input = (props) => {
  const {
    text,
    type,
    placeholderValue = "",
    changeType,
    onChange,
    errorFlag,
  } = props;
  return (
    <div className={"input-main"}>
      <div className={"label-field"}>
        <label>{text}</label>
      </div>
      <div className={"input-field"}>
        <input
          {...props}
          type={type}
          placeholder={placeholderValue}
          onChange={(e) => {
            onChange(e, changeType);
          }}
        />
        {errorFlag ? (
          <span className="error-label">This field is required</span>
        ) : null}
      </div>
    </div>
  );
};

export default input;
