import Schedule from "../../shared/schedule";
import ScheduleView from "./ScheduleView";
import "./DayView.css";

const DayView = ({ day, index }: { day: Schedule[]; index: number }) => {
  const dayOfTheWeek: string[] = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];
  return (
    <div className="planner-day-view">
      <div className="day-of-week">{dayOfTheWeek[index]}</div>
      {day.map((schedule, idx) => {
        return <ScheduleView key={idx} schedule={schedule} />;
      })}
    </div>
  );
};

export default DayView;
