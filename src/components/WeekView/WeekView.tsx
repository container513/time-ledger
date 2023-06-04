import { Moment } from "moment";

import DayView from "./DayView";
import "./WeekView.css";

const WeekView = ({ week, curDate }: { week: number[]; curDate: Moment }) => {
  return (
    <div className="planner-week-view">
      {week.map((index) => {
        return (
          <DayView
            key={index}
            index={index}
            curDate={curDate.clone().day(index)}
          />
        );
      })}
      <div className="planner-week-last-border"></div>
    </div>
  );
};

export default WeekView;
