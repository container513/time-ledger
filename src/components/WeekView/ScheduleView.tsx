import Card from "react-bootstrap/Card";
import Schedule from "../../shared/schedule";
import "./ScheduleView.css";

const ScheduleView = ({ schedule }: { schedule: Schedule }) => {
  return (
    <Card id="schedule-view">
      <Card.Header id="schedule-header">
        <div id="schedule-header-goal">{schedule.goal.name}</div>
        <div id="schedule-header-subgoal">{schedule.subgoal !== undefined && schedule.subgoal.name}</div>
      </Card.Header>
      <Card.Body id="schedule-body">
        <Card.Title id="schedule-title">{schedule.task.name}</Card.Title>
        <Card.Text>
          {schedule.startTime?.toLocaleTimeString()}
          {schedule.endTime?.toLocaleTimeString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ScheduleView;
