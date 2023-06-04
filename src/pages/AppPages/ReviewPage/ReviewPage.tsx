import { useState } from "react";

import ReviewGoalsView, {
  RowData,
} from "../../../components/ReviewGoalsView/ReviewGoalsView";
import PieChartView from "../../../components/PieChartView/PieChartView";

import "./ReviewPage.css";

const ReviewPage = () => {
  const [selectedRowData, setSelectedRowData] = useState<RowData | undefined>(
    undefined
  );

  return (
    <div className="review-page">
      <ReviewGoalsView setSelectedRowData={setSelectedRowData} />
      <PieChartView selectedRowData={selectedRowData} />
    </div>
  );
};

export default ReviewPage;
