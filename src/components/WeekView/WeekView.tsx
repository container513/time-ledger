import DayView from "./DayView";
import Schedule from "../../shared/schedule";
import "./WeekView.css";

const WeekView = ({ week }: { week: Schedule[][] }) => {
  return (
    <div className="planner-week-view">
      {week.map((day, index) => {
        return <DayView key={index} day={day} index={index} />;
      })}
      <div className="planner-week-last-border"></div>
    </div>
  );
};

export default WeekView;
