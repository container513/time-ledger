import { useContext } from "react";
import { ControlContext } from "../../shared/controlContext";
import { Table } from "reactstrap";

import "./ReviewGoalsView.css";
import { ReviewView } from "./ReviewView";
import Goal from "../../shared/goal";

const ReviewGoalsView = () => {
  const { state } = useContext(ControlContext);
  const goals = state.ongoingGoals;
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Actual Effort</th>
            <th>Period</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(goals).map((goal: Goal, index) => {
            return (
              <ReviewView key={index} reviewStat={goal.getReviewStats()} />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ReviewGoalsView;
