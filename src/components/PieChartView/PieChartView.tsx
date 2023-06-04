import * as d3 from "d3";
import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";
import { FaCircle } from "react-icons/fa";

import { RowData } from "../ReviewGoalsView/ReviewGoalsView";
import "./PieChartView.css";

// use color theme defined in https://github.com/d3/d3-scale-chromatic
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

const LegendsView = ({
  selectedRowData,
}: {
  selectedRowData: RowData | undefined;
}) => {
  return (
    <div className="pie-chart-legend-list">
      {selectedRowData?.subRows.map((subrow, index) => {
        return (
          <div className="pie-chart-legend" key={index}>
            <FaCircle color={colorScale(index.toString())} />
            <div>{subrow.reviewStats.name}</div>
          </div>
        );
      })}
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
    <div className="pie-chart-panel">
      <PieChart width={300} height={300} data={data} />
      <LegendsView selectedRowData={selectedRowData} />
    </div>
  );
};

export default PieChartView;
