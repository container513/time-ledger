import { useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import moment from "moment";

import WeekView from "../../../components/WeekView/WeekView";
import "./PlannerPage.css";

const PlannerPage = () => {
  const [curDate, setcurDate] = useState(moment());

  const numToMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handleLeftBtnClick = () => {
    setcurDate(curDate.clone().subtract(1, "weeks"));
  };

  const handleRightBtnClick = () => {
    setcurDate(curDate.clone().add(1, "weeks"));
  };

  const week = [0,1,2,3,4,5,6];

  return (
    <div className="planner-page">
      <div className="planner-panel">
        <div
          className="planner-left-btn planner-bnt"
          onClick={() => handleLeftBtnClick()}
        >
          <AiFillCaretLeft className="planner-left-icon" />
        </div>
        <div className="planner-current-date">
          {curDate.year()} {numToMonth[curDate.month()]}
        </div>
        <div
          className="planner-right-btn planner-bnt"
          onClick={() => handleRightBtnClick()}
        >
          <AiFillCaretRight className="planner-left-icon" />
        </div>
      </div>
      <WeekView week={week} curDate={curDate} />
    </div>
  );
};

export default PlannerPage;
