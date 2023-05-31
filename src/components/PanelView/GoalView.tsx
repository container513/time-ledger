import React, { useState } from "react";
import SubGoalView from "./SubGoalView";
import TaskView from "./TaskView";
import Goal from "../../shared/goal";
import Narrow from "../../assets/images/narrow.png";
import "./GoalView.css";

const GoalView = (goal: Goal) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="panel-goal" onClick={() => setToggle(!toggle)}>
        <div className="close-box">
          <img src={Narrow} alt="narrow"/>
        </div>
        {goal.name} {goal.deadline.toDateString()}
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
