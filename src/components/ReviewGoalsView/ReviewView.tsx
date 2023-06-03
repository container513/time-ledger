import moment from "moment";

import { ReviewStats } from "../../shared/reviewStats";

const ReviewView = ({ reviewStat }: { reviewStat: ReviewStats }) => {
  const title = reviewStat.name;
  const actualEffort = reviewStat.actualEffort;
  const actualEffortStr =
    actualEffort.milliseconds() === 0 ? "0" : actualEffort.humanize();
  const period =
    reviewStat.startDate && reviewStat.endDate
      ? moment.duration(reviewStat.endDate.diff(reviewStat.startDate))
      : moment.duration(0);
  const periodStr = period.milliseconds() === 0 ? "0" : period.humanize();
  const endDate = reviewStat.isClosed
    ? reviewStat.endDate!.format("YYYY-MM-DD")
    : "Ongoing";

  return (
    <tr>
      <th scope="row">{title}</th>
      <td>{actualEffortStr}</td>
      <td>{periodStr}</td>
      <td>{endDate}</td>
    </tr>
  );
};

export { ReviewView };
