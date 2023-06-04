import * as d3 from "d3";
import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";

import { RowData } from "../ReviewGoalsView/ReviewGoalsView";

// Create a color scale using the categorical color scheme
const colorScale = scaleOrdinal(schemeSet3);

type DataItem = {
  name: string;
  value: number;
};

type PieChartProps = {
  width: number;
  height: number;
  data: DataItem[];
};

const colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"];

const PieChart = ({ width, height, data }: PieChartProps) => {
  const pieGenerator = d3.pie<DataItem>().value((d) => d.value);
  const angles = pieGenerator(data);
  const arcPathGenerator = d3.arc();
  const arcs = angles.map((ang, i) => ({
    path: arcPathGenerator({
      innerRadius: 0,
      outerRadius: 150,
      startAngle: ang.startAngle,
      endAngle: ang.endAngle,
    }),
    color: colorScale(i.toString()),
  }));

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs
            .filter((arc) => arc != null)
            .map((arc, i) => {
              return <path key={i} d={arc.path!.toString()} fill={arc.color} />;
            })}
        </g>
      </svg>
    </div>
  );
};

const PieChartView = ({
  selectedRowData,
}: {
  selectedRowData: RowData | undefined;
}) => {
  const data: DataItem[] =
    selectedRowData === undefined
      ? []
      : selectedRowData.subRows.map((subrow) => {
          return {
            name: subrow.reviewStats.name,
            value: subrow.reviewStats.actualEffort.as("ms"),
          };
        });

  return (
    <div>
      <PieChart width={300} height={300} data={data} />
    </div>
  );
};

export default PieChartView;
