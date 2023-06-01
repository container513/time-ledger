import React, { useState } from "react";
import SubGoalView from "./SubGoalView";
import TaskView from "./TaskView";
import Goal from "../../shared/goal";
import NarrowRight from "../../assets/images/narrow-right.png";
import NarrowDown from "../../assets/images/narrow-down.png";
import "./GoalView.css";

Date.prototype.toDateString = function () {
  const format = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  };
  var year = this.getFullYear();
  var month = (this.getMonth() + 1).toLocaleString("en-US", format);
  var day = this.getDate().toLocaleString("en-US", format);
  return `${year}.${month}.${day}`;
};

const GoalView = (goal: Goal) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="panel-goal" onClick={() => setToggle(!toggle)}>
        <div className="panel-goal-narrow">
          {!toggle ? (
            <img
              className="panel-goal-narrow-right"
              src={NarrowRight}
              alt="narrow"
            />
          ) : (
            <img
              className="panel-goal-narrow-down"
              src={NarrowDown}
              alt="narrow"
            />
          )}
        </div>
        <div className="panel-goal-title">{goal.name}</div>
        <div className="panel-goal-date">{goal.deadline.toDateString()}</div>
      </div>
      <div className="panel-goal-child">
        {toggle &&
          goal.subgoals.map((subgoal, index) => {
            return <SubGoalView key={index} {...subgoal} />;
          })}
        {toggle &&
          goal.tasks.map((task, index) => {
            return <TaskView key={index} {...task} />;
          })}
      </div>
    </div>
  );
};

export default GoalView;
