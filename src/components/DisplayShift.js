import React, { Component } from "react";
import "../Styling/Display.scss";
export class DisplayShift extends Component {
  constructor(props) {
    super(props);
  }

  clearList = () => {
    localStorage.setItem("shiftList", JSON.stringify([]));
    this.props.back();
  };

  render() {
    const shiftList = JSON.parse(localStorage.getItem("shiftList"));
    const { back } = this.props;
    return (
      <React.Fragment>
        <div className="mainDisplay">
          <button onClick={back}>
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
          </button>
        </div>
        <div className="form-cmp displayShiftWrapper">
          <table>
            <tr>
              <th>Start Date</th>
              <th>Select Repeat Type</th>
              <th>Select Shift</th>
              <th>Select Start Time</th>
              <th>Select End Time </th>
              <th>Week Day</th>
              <th>Week Day Only</th>
            </tr>
            {shiftList.map((shiftListItem) => {
              const {
                startDate,
                startTime,
                endTime,
                repeatType,
                shiftValue,
                weekdayOnly,
                weekdays,
              } = JSON.parse(shiftListItem);
              const { back } = this.props;
              const selectedWeekdays = weekdays.filter((item) => item.value);
              return (
                <tr>
                  <td>{startDate}</td>
                  <td>{repeatType}</td>
                  <td>{shiftValue}</td>
                  <td>{startTime}</td>
                  <td>{endTime}</td>
                  <td>
                    {selectedWeekdays.map((item) => (
                      <div className="weekdayItem">
                        {item.text.substring(0, 3)}
                      </div>
                    ))}
                  </td>
                  <td>{weekdayOnly ? "Yes" : "No"}</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="createShift">
          <div className={"add-btn"}>
            <button onClick={back}>Create Shift +</button>
          </div>{" "}
          <div className={"add-btn"}>
            <button onClick={this.clearList}>Clear All Shift</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DisplayShift;

const transform = (obj) => {
  return {
    start_date: obj.startDate,
    arrival_time: obj.startTime,
    departure_time: obj.endTime,
    repeat: obj.repeatType,
    shift_availablity: obj.startDate,
  };
};
