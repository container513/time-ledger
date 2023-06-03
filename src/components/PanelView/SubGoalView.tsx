import { useState, useContext } from "react";
import { IoAddCircleOutline } from "react-icons/io5";

import SubGoal from "../../shared/subgoal";
import Task, { taskForm } from "../../shared/task";
import TaskView from "./TaskView";
import ModalTemplate from "./ModalTemplate";
import NarrowRight from "../../assets/images/narrow-right.png";
import NarrowDown from "../../assets/images/narrow-down.png";
import { ControlContext } from "../../shared/controlContext";
import { dateFormatStr } from "../../shared/utils";

import "./SubGoalView.css";

interface VisibilityState {
  visibility: "visible" | "hidden";
}

const SubGoalView = (subgoal: SubGoal) => {
  const { state, setState } = useContext(ControlContext);
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState<VisibilityState>({
    visibility: "hidden",
  });

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
          onClick={() => setShowModal(true)}
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
      <ModalTemplate
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        handleSubmit={() => {
          const task = Task.createFromFormResult(state.formResult, subgoal);
          const newOngoingGoals = { ...state.ongoingGoals };
          newOngoingGoals[subgoal.goal.id].subgoals[subgoal.id].tasks[task.id] =
            task;
          setState({ ongoingGoals: newOngoingGoals });
          setState({ formResult: {} });
          setShowModal(false);
        }}
        data={taskForm}
        title="Add New Task"
      />
    </div>
  );
};

export default SubGoalView;
