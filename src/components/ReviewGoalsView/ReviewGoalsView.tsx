import { useContext, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import moment from "moment";

import { ControlContext } from "../../shared/controlContext";
import { fetchGoals } from "../../shared/firestore";
import { ReviewStats } from "../../shared/reviewStats";
import "./ReviewGoalsView.css";

interface RowData {
  reviewStats: ReviewStats;
  subRows?: RowData[];
}

const getRows = async (uid: string | undefined) => {
  // return an empty array if the user is invalid
  if (uid === undefined) return [];

  const goals = await fetchGoals(uid, false);
  const rows: RowData[] = [];
  for (const goal of Object.values(goals)) {
    const subgoalRows: RowData[] = [];
    const taskRows: RowData[] = [];
    for (const subgoal of Object.values(goal.subgoals)) {
      const _taskRows: RowData[] = [];
      for (const task of Object.values(subgoal.tasks)) {
        _taskRows.push({ reviewStats: task.getReviewStats() });
      }
      subgoalRows.push({
        reviewStats: subgoal.getReviewStats(),
        subRows: _taskRows,
      });
    }
    for (const task of Object.values(goal.tasks)) {
      taskRows.push({ reviewStats: task.getReviewStats() });
    }
    rows.push({
      reviewStats: goal.getReviewStats(),
      subRows: subgoalRows.concat(taskRows),
    });
  }
  return rows;
};

const columns: MRT_ColumnDef<RowData>[] = [
  {
    header: "Title",
    accessorFn: (originalRow: RowData) => originalRow.reviewStats.name,
  },
  {
    header: "Actual Effort",
    accessorFn: (originalRow: RowData) =>
      originalRow.reviewStats.actualEffort.humanize(),
  },
  {
    header: "Period",
    accessorFn: (originalRow: RowData) =>
      originalRow.reviewStats.endDate && originalRow.reviewStats.startDate
        ? moment
            .duration(
              originalRow.reviewStats.endDate.diff(
                originalRow.reviewStats.startDate
              )
            )
            .humanize()
        : "0",
  },
  {
    header: "End Date",
    accessorFn: (originalRow: RowData) =>
      originalRow.reviewStats.isClosed
        ? originalRow.reviewStats.endDate?.format("YYYY-MM-DD")
        : "Ongoing",
  },
];

const ReviewGoalsView = () => {
  const { state } = useContext(ControlContext);
  const [rows, setRows] = useState<RowData[]>([]);
  useEffect(() => {
    const fetchRows = async () => {
      setRows(await getRows(state.user?.uid));
    };
    fetchRows();
  }, [state.user?.uid]);
  return (
    <MaterialReactTable
      columns={columns}
      data={rows}
      enableExpanding
      enableExpandAll={false}
    />
  );
};

export default ReviewGoalsView;
