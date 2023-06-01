import { AiOutlineSchedule, AiOutlineLogout } from "react-icons/ai";
// import 
import Goal from "../../shared/goal";
import SubGoal from "../../shared/subgoal";
import Task from "../../shared/task";
import GoalView from "./GoalView";
import "./PanelView.css";

const PanelView = () => {
  const task1 = new Task("Read paper", "123456");
  const task2 = new Task("Write Proposal", "123456");
  const subgoal1 = new SubGoal("Proposal", "123456", new Date(), [
    task1,
    task2,
  ]);
  const subgoal2 = new SubGoal("Implementation", "123456", new Date());
  const goal1 = new Goal("NLP Paper Survey", new Date(), [subgoal1, subgoal2]);
  const goal2 = new Goal("NLP Paper Survey", new Date());
  const goal3 = new Goal("ML HW10", new Date());
  const goals: Goal[] = [goal1, goal2, goal3];

  return (
    <div className="panel">
      <div className="panel-logo">TimeLedger</div>
      <div className="panel-title">GOALS</div>
      <div className="panel-goals">
        {goals.map((goal, index) => {
          return <GoalView key={index} {...goal} />;
        })}
      </div>
      <div className="user-interface">
        <div className="user-photo">

        </div>
        <div className="user-name">Shao-Yu Chu</div>
        <button className="panel-button">
          <AiOutlineSchedule className="review-icon" />
        </button>
        <button className="panel-button">
          <AiOutlineLogout className="logout-icon" />
        </button>
      </div>
    </div>
  );
};

export default PanelView;
