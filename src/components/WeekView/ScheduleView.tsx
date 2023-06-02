import Card from "react-bootstrap/Card";
import Schedule from "../../shared/schedule";

import { timeFormatStr } from "../../shared/utils";
import "./ScheduleView.css";

const ScheduleView = ({ schedule }: { schedule: Schedule }) => {
  return (
    <Card id="schedule-view">
      <Card.Body id="schedule-body">
          <div id="schedule-header-goal">{schedule.goal.name}</div>
          <div id="schedule-header-subgoal">
            {schedule.subgoal !== undefined && schedule.subgoal.name}
          </div>
        <Card.Title id="schedule-title">{schedule.task.name}</Card.Title>
        <Card.Text id="schedule-text">
          {schedule.startTime?.format(timeFormatStr)}
          {" - "}
          {schedule.endTime?.format(timeFormatStr)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ScheduleView;
