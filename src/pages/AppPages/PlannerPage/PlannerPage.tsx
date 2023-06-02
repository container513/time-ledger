import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import WeekView from "../../../components/WeekView/WeekView";
import Schedule from "../../../shared/schedule";
import Goal from "../../../shared/goal";
import SubGoal from "../../../shared/subgoal";
import Task from "../../../shared/task";
import "./PlannerPage.css";

const PlannerPage = () => {
  // let week: Array<Array<Schedule>> = new Array<Array<Schedule>>(7);
  const goal0 = new Goal("NLP Paper Survey", new Date());
  const task1 = new Task("Read paper", goal0);
  const task2 = new Task("Write Proposal", goal0);
  const subgoal1 = new SubGoal("Proposal", goal0, new Date(), [task1, task2]);
  const subgoal0 = new SubGoal("Implementation", goal0, new Date());
  const goal1 = new Goal("NLP Paper Survey", new Date(), [subgoal1, subgoal0]);
  const schedule1: Schedule = new Schedule(goal1, subgoal1, task1, new Date(), new Date(), new Date());
  const schedule2: Schedule = new Schedule(goal1, subgoal1, task2, new Date(), new Date(), new Date());
  
  const week: Schedule[][] = [[schedule1, schedule2], [schedule1], [schedule1], [schedule1], [], [], []];

  return (
    <div className="planner-page">
      <div className="planner-panel">
        <div className="planner-left-btn">
          <AiFillCaretLeft className="planner-left-icon"/>
        </div>
        <div className="planner-current-date">2023 May</div>
        <div className="planner-right-btn">
        <AiFillCaretRight className="planner-left-icon"/>
        </div>
      </div>
      <WeekView week={week}/>
    </div>
  );
};

export default PlannerPage;
