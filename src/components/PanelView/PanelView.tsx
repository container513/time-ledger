import { useState } from "react";
import "./PanelView.css";
import Goal from "../../shared/goal";

const GoalView = (goal: Goal) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div onClick={() => setToggle(!toggle)}>{goal.name}</div>
      {toggle &&
        goal.subgoals.map((subgoal) => {
          return <div>{subgoal.name}</div>;
        })}
    </div>
  );
};

const PanelView = () => {
  const goal1 = new Goal("Goal 1", new Date());
  const goal2 = new Goal("Goal 2", new Date());
  const goal3 = new Goal("Goal 3", new Date());
  const goals: Goal[] = [goal1, goal2, goal3];

  return (
    <div className="panel">
      <div className="panel-logo">TimeLedger</div>
      <div className="panel-title">GOALS</div>
      {goals.map((goal) => {
        return <GoalView {...goal} />;
      })}
    </div>
  );
};

export default PanelView;
