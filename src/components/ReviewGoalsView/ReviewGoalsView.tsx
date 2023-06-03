import { useContext } from "react";
import { ControlContext } from "../../shared/controlContext";

import "./ReviewGoalsView.css";
import { ReviewView } from "./ReviewView";
import Goal from "../../shared/goal";

const ReviewGoalsView = () => {
  const { state } = useContext(ControlContext);
  const goals = state.ongoingGoals;
  return (
    <div>
      {Object.values(goals).map((goal: Goal, index) => (
        <ReviewView key={index} reviewStat={goal.getReviewStats()} />
      ))}
    </div>
  );
};

export default ReviewGoalsView;
