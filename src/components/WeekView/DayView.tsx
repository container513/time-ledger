import Schedule from "../../shared/schedule";
import ScheduleView from "./ScheduleView";
import "./DayView.css";

const DayView = ({day, index}: { day: Schedule[], index: number }) => {
  const dayOfTheWeek: String[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return (
    <div className="planner-day-view">
      <div className="day-of-week">{dayOfTheWeek[index]}</div>
      {day.map((schedule, index) => {
        return <ScheduleView key={index} schedule={schedule} />;
      })}
    </div>
  );
};

export default DayView;
