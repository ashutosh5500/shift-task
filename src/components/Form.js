import React, { Component } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Day from "./Day";
import "../Styling/Form.scss";
import { cloneDeep } from "lodash";
import DisplayShift from "./DisplayShift";
class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: "",
      endTime: "",
      startDate: "",
      repeatType: "",
      weekdays: [
        {
          id: 1,
          text: "Monday",
          value: true,
          apiValue: 1,
        },
        {
          id: 2,
          text: "Tuesday",
          value: false,
          apiValue: 2,
        },
        {
          id: 3,
          text: "Wednesday",
          value: false,
          apiValue: 3,
        },
        {
          id: 4,
          text: "Thursday",
          value: false,
          apiValue: 4,
        },
        {
          id: 5,
          text: "Friday",
          value: false,
          apiValue: 5,
        },
        {
          id: 6,
          text: "Saturday",
          value: false,
          apiValue: 6,
        },
        {
          id: 7,
          text: "Sunday",
          value: false,
          apiValue: 0,
        },
      ],
      shiftValue: "",
      weekdayOnly: { id: 1, text: "Weekdays", value: false },
      submit: false,
      isValid: true,
    };
  }

  handleInputField = (event, type) => {
    const value = event.target.value;
    if (type === "startTime") {
      this.setState({
        startTime: value,
      });
    } else if (type === "endTime") {
      this.setState({
        endTime: value,
      });
    } else if (type === "startDate") {
      this.setState({
        startDate: value,
      });
    }
  };

  handleRepeatType = (event) => {
    this.setState({
      repeatType: event.target.value,
    });
  };

  handleShift = (event) => {
    if (event.target.value) {
      this.setState({
        shiftValue: event.target.value,
      });
    }
  };

  onDaySelect = (id) => {
    const copiedState = cloneDeep(this.state);
    const { weekdays } = copiedState;
    weekdays.filter((day) => {
      if (id === day.id) {
        day.value = !day.value;
      }
    });
    this.setState({ weekdays: weekdays });
  };

  onWeekSelect = (id) => {
    const copiedState = cloneDeep(this.state);
    const { weekdayOnly } = copiedState;
    this.setState({
      weekdayOnly: {
        ...weekdayOnly,
        value: !weekdayOnly.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { startTime, startDate } = this.state;
    if (!startDate) {
      this.setState({ isValid: false });
      return;
    }
    this.setState({ isValid: true }, () => {
      this.setState({ submit: true }, () => {
        const shiftList = JSON.parse(localStorage.getItem("shiftList")) || [];
        shiftList.push(JSON.stringify(this.state));
        localStorage.setItem("shiftList", JSON.stringify(shiftList));
      });
    });
  };

  back = () => {
    this.setState({ submit: false });
  };

  render() {
    const optionValue = [
      {
        value: "none",
        optionText: "None",
      },
      {
        value: "daily",
        optionText: "Daily",
      },
      {
        value: "weekly",
        optionText: "Weekly",
      },
    ];

    const shiftArray = [
      {
        value: "",
        optionText: "",
      },
      {
        value: "Morning Shift - 5am to 9am",
        optionText: "Morning Shift - 5am to 9am",
      },
    ];
    const {
      weekdays,
      weekdayOnly,
      startTime,
      endTime,
      submit,
      isValid,
      startDate,
      repeatType,
      shiftValue,
    } = this.state;
    return (
      <React.Fragment>
        {!submit ? (
          <form className="form-cmp" onSubmit={this.handleSubmit}>
            <div className="head">
              <h4>Select Start date or Shift Times</h4>
              <p>Each row represent a shift</p>
            </div>
            <div className="input-wrapper">
              <Input
                text={"Select Start Date"}
                type={"date"}
                placeholderValue="MM/DD/YYYY"
                onChange={this.handleInputField}
                changeType="startDate"
                errorFlag={!isValid && !startDate.length}
              />
              <Select
                optionsArray={optionValue}
                onChange={this.handleRepeatType}
                text={"Select Repeat type"}
                errorFlag={!isValid && !repeatType.length}
              />
              <Select
                optionsArray={shiftArray}
                onChange={this.handleShift}
                text={"Select Shift"}
                errorFlag={!isValid && !shiftValue.length}
              />
              <Input
                text={"Select Start Time"}
                type={"time"}
                onChange={this.handleInputField}
                changeType="startTime"
                errorFlag={!isValid && !startTime.length}
              />
              <Input
                text={"Select End Time"}
                type={"time"}
                onChange={this.handleInputField}
                changeType="endTime"
                errorFlag={!isValid && !endTime.length}
                readOnly={!startTime}
              />
              <div className="days-main">
                <h4>Please select the day of the week </h4>
                <div className="days-wrapper">
                  {weekdays.map((day) => {
                    return <Day data={day} onSelectEvent={this.onDaySelect} />;
                  })}
                </div>
              </div>

              <div className="week-main">
                <div className="days-wrapper">
                  {<Day data={weekdayOnly} onSelectEvent={this.onWeekSelect} />}
                </div>
              </div>
            </div>
            <div className={"add-btn"}>
              <button type="submit">ADD +</button>
            </div>
          </form>
        ) : (
          <DisplayShift back={this.back} />
        )}
      </React.Fragment>
    );
  }
}

export default Form;
