import Goal from "../../shared/goal";
import SubGoal from "../../shared/subgoal";
import GoalView from "./GoalView";
import "./PanelView.css";

const PanelView = () => {
  const subgoal1 = new SubGoal("Subgoal 1", "123456", new Date());
  const goal1 = new Goal("NLP Paper Survey", new Date(), [subgoal1]);
  const goal2 = new Goal("NLP Paper Survey", new Date());
  const goal3 = new Goal("ML HW10", new Date());
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
