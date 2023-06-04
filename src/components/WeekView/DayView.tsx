import { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { Moment } from "moment";

import Schedule from "../../shared/schedule";
import ScheduleView from "./ScheduleView";
import Goal from "../../shared/goal";
import Task from "../../shared/task";
import Subgoal from "../../shared/subgoal";
import {
  fetchScheduleOfDate,
  storeSchedule,
  storeTask,
} from "../../shared/firestore";
import { ControlContext } from "../../shared/controlContext";
import { DragItemTypes } from "../../shared/DragItemTypes";
import "./DayView.css";

const DayView = ({ index, curDate }: { index: number; curDate: Moment }) => {
  const { state, setState } = useContext(ControlContext);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const dayOfTheWeek: string[] = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  const [, dropRef] = useDrop({
    accept: DragItemTypes.Task,
    drop: (item: { type: string; task: Task }) => {
      let goal: Goal, subgoal: Subgoal | undefined;
      if ("subgoals" in { ...item.task.parent }) {
        goal = item.task.parent as Goal;
        subgoal = undefined;
      } else {
        subgoal = item.task.parent as Subgoal;
        goal = subgoal!.goal;
      }
      const sched = new Schedule(goal, subgoal, item.task, curDate);
      const newOngoingGoals = { ...state.ongoingGoals };
      item.task.schedules[sched.id] = sched;
      setState({ ongoingGoals: newOngoingGoals });
      setSchedules([...schedules, sched]);
      storeSchedule(state.user!.uid, sched);
      storeTask(state.user!.uid, item.task);
    },
  });

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
          console.log(error);
        });
    }
  }, [curDate, state.user, state.ongoingGoals]);

  return (
    <div className="planner-day-view" ref={dropRef}>
      <div className="day-of-week">{dayOfTheWeek[index]}</div>
      <div className="day-view-date">{curDate.date()}</div>
      {schedules.map((schedule, idx) => {
        return <ScheduleView key={idx} schedule={schedule} />;
      })}
    </div>
  );
};

export default DayView;
