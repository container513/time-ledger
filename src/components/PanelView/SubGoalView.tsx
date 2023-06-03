import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

import SubGoal from "../../shared/subgoal";
import TaskView from "./TaskView";
import NarrowRight from "../../assets/images/narrow-right.png";
import NarrowDown from "../../assets/images/narrow-down.png";

import "./SubGoalView.css";
import { dateFormatStr } from "../../shared/utils";

interface VisibilityState {
  visibility: "visible" | "hidden";
}

const SubGoalView = (subgoal: SubGoal) => {
  const [toggle, setToggle] = useState(false);
  const [visible, setVisible] = useState<VisibilityState>({
    visibility: "hidden",
  });

  const addNewTask = () => {
    console.log("add new task");
  };

  return (
    <div>
      <div
        className="panel-subgoal-toggle"
        onMouseEnter={() => {
          setVisible({ visibility: "visible" });
        }}
        onMouseLeave={() => {
          setVisible({ visibility: "hidden" });
        }}
      >
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
            {subgoal.deadline.format(dateFormatStr)}
          </div>
        </div>
        <div
          className="panel-subgoal-add"
          style={visible}
          onClick={() => addNewTask()}
        >
          <IoAddCircleOutline className="add-icon" />
        </div>
      </div>
      <div className="panel-subgoal-child">
        {toggle &&
          Object.values(subgoal.tasks).map((task, index) => {
            return <TaskView key={index} {...task} />;
          })}
      </div>
    </div>
  );
};

export default SubGoalView;
