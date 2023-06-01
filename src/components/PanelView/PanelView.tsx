import Goal from "../../shared/goal";
import SubGoal from "../../shared/subgoal";
import Task from "../../shared/task";
import GoalView from "./GoalView";
import "./PanelView.css";

const PanelView = () => {
  const goal0 = new Goal("NLP Paper Survey", new Date());
  const task1 = new Task("Read paper", goal0);
  const task2 = new Task("Write Proposal", goal0);
  const subgoal1 = new SubGoal("Proposal", goal0, new Date(), [task1, task2]);
  const subgoal0 = new SubGoal("Implementation", goal0, new Date());
  const goal1 = new Goal("NLP Paper Survey", new Date(), [subgoal1, subgoal0]);
  const goal2 = new Goal("ML HW10", new Date());
  const goals: Goal[] = [goal0, goal1, goal2];

  return (
    <div className="panel">
      <div className="panel-logo">TimeLedger</div>
      <div className="panel-title">GOALS</div>
      {goals.map((goal, index) => {
        return <GoalView key={index} {...goal} />;
      })}
    </div>
  );
};

export default PanelView;
