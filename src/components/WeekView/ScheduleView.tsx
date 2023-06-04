import { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Schedule, { scheduleForm } from "../../shared/schedule";
import { Moment } from "moment";

import { timeFormatStr } from "../../shared/utils";
import { ControlContext } from "../../shared/controlContext";
import ModalTemplate, { ModalFormProps } from "../ModalTemplate/ModalTemplate";
import "./ScheduleView.css";
import { storeSchedule, storeTask } from "../../shared/firestore";

const ScheduleView = ({ schedule, curDate }: { schedule: Schedule, curDate: Moment }) => {
  const { state } = useContext(ControlContext);
  const [showModal, setShowModal] = useState(false);
  const modals: ModalFormProps[] = [
    {
      handleSubmit: () => {
        const newSchedule = Schedule.createFromFormResult(
          state.formResult,
          curDate,
          schedule
        );
        storeSchedule(state.user!.uid, newSchedule);
        storeTask(state.user!.uid, newSchedule.task);
        setShowModal(false);
      },
      data: scheduleForm,
      tabTitle: "Edit Schedule",
      title: "Edit Schedule",
    },
  ];
  return (
    <div>
      <Card id="schedule-view" onClick={() => setShowModal(true)}>
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
      <ModalTemplate
        modals={modals}
        show={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default ScheduleView;
