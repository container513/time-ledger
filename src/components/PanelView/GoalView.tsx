import React, { useState } from "react";
import SubGoalView from "./SubGoalView";
import TaskView from "./TaskView";
import Goal from "../../shared/goal";
import Narrow from "../../assets/images/narrow.png";
import "./GoalView.css";

Date.prototype.toDateString = function () {
  const format = {
    minimumIntegerDigits: 2,
    useGrouping: false
  }
  var year = this.getFullYear();
  var month = (this.getMonth() + 1).toLocaleString('en-US', format);
  var day = this.getDate().toLocaleString('en-US', format);
  return `${year}.${month}.${day}`;
};

const GoalView = (goal: Goal) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="panel-goal" onClick={() => setToggle(!toggle)}>
        <div className="close-narrow">
          <img src={Narrow} alt="narrow" />
        </div>
        <div className="panel-goal-title">{goal.name}</div>
        <div className="panel-goal-date">{goal.deadline.toDateString()}</div>
      </div>
      {toggle &&
        goal.subgoals.map((subgoal) => {
          return <SubGoalView {...subgoal} />;
        })}
      {toggle &&
        goal.tasks.map((task) => {
          return <TaskView {...task} />;
        })}
    </div>
  );
};

export default GoalView;
