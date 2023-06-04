import { useContext, useEffect, useState } from "react";
import { Moment } from "moment";

import Schedule from "../../shared/schedule";
import ScheduleView from "./ScheduleView";
import { fetchScheduleOfDate } from "../../shared/firestore";
import { ControlContext } from "../../shared/controlContext";
import "./DayView.css";

const DayView = ({
  index,
  curDate,
}: {
  index: number;
  curDate: Moment;
}) => {
  const { state } = useContext(ControlContext);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    if (state.user === undefined) {
      setSchedules([]);
      return;
    } else {
      fetchScheduleOfDate(state.user!.uid, curDate, state.ongoingGoals)
        .then((schds) => {
          setSchedules(schds);
        })
        .catch((error) => {
        });
    }
  }, [curDate, state.user, state.ongoingGoals]);

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
      <div className="day-view-date">{curDate.date()}</div>
      {schedules.map((schedule, idx) => {
        return <ScheduleView key={idx} schedule={schedule} />;
      })}
    </div>
  );
};

export default DayView;
