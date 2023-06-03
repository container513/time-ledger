import { ReviewStats } from "../../shared/reviewStats";

const ReviewView = ({ reviewStat }: { reviewStat: ReviewStats }) => {
  return <div>{reviewStat.name}</div>;
};

export { ReviewView };
