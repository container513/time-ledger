import { useState } from "react";
import { dateFormatStr } from "../../shared/utils";
import { IoAddCircleOutline } from "react-icons/io5";

import SubGoalView from "./SubGoalView";
import TaskView from "./TaskView";
import Goal from "../../shared/goal";
import NarrowRight from "../../assets/images/narrow-right.png";
import NarrowDown from "../../assets/images/narrow-down.png";
import "./GoalView.css";

interface VisibilityState {
  visibility: "visible" | "hidden";
}

const GoalView = (goal: Goal) => {
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState<VisibilityState>({
    visibility: "hidden",
  });

  const addNewSubgoal = () => {
    console.log("add new Subgoal");
  };

  return (
    <div className="panel-goal-view">
      <div
        className="panel-goal-toggle"
        onMouseEnter={() => {
          setVisible({ visibility: "visible" });
        }}
        onMouseLeave={() => {
          setVisible({ visibility: "hidden" });
        }}
      >
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
          <div className="panel-goal-date">
            {goal.deadline.format(dateFormatStr)}
          </div>
        </div>
        <div
          className="panel-goal-add"
          style={visible}
          onClick={() => addNewSubgoal()}
        >
          <IoAddCircleOutline className="add-icon" />
        </div>
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
