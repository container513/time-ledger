import ReviewGoalsView from "../../../components/ReviewGoalsView/ReviewGoalsView";
import PieChartView from "../../../components/PieChartView/PieChartView";
import "./ReviewPage.css";

const ReviewPage = () => {
  return (
    <div className="review-page">
      <ReviewGoalsView />
      <PieChartView />
    </div>
  );
};

export default ReviewPage;
