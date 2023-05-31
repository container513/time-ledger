import React, { useState } from "react";
import SubGoal from "../../shared/subgoal";
import TaskView from "./TaskView";

const SubGoalView = (subgoal: SubGoal) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="panel-goal" onClick={() => setToggle(!toggle)}>
        {subgoal.name} {subgoal.deadline.toDateString()}
      </div>
      {toggle &&
        subgoal.tasks.map((task) => {
          return <TaskView {...task} />;
        })}
    </div>
  );
};

export default SubGoalView;