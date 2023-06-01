import React, { useState } from "react";
import SubGoal from "../../shared/subgoal";
import TaskView from "./TaskView";
import NarrowRight from "../../assets/images/narrow-right.png";
import NarrowDown from "../../assets/images/narrow-down.png";

import "./SubGoalView.css";

const SubGoalView = (subgoal: SubGoal) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="panel-subgoal" onClick={() => setToggle(!toggle)}>
        <div className="panel-subgoal-narrow">
          {!toggle ? (
            <img
              className="panel-subgoal-narrow-right"
              src={NarrowRight}
              alt="narrow"
            />
          ) : (
            <img
              className="panel-subgoal-narrow-down"
              src={NarrowDown}
              alt="narrow"
            />
          )}
        </div>
        <div className="panel-subgoal-title">{subgoal.name}</div>
        <div className="panel-subgoal-date">
          {subgoal.deadline.toDateString()}
        </div>
      </div>
      <div className="panel-subgoal-child">
        {toggle &&
          subgoal.tasks.map((task, index) => {
            return <TaskView key={index} {...task} />;
          })}
      </div>
    </div>
  );
};

export default SubGoalView;
