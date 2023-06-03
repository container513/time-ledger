import { ReviewStats } from "../../shared/reviewStats";

const ReviewView = ({ reviewStat }: { reviewStat: ReviewStats }) => {
  return (
    <tr>
      <th scope="row">{reviewStat.name}</th>
      <td>{reviewStat.actualEffort.humanize()}</td>
      <td>{reviewStat.actualEffort.humanize()}</td>
      <td>period</td>
      <td>end-date</td>
    </tr>
  );
};

export { ReviewView };
