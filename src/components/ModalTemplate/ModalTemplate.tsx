import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import FieldView from "./FieldView";
import { GoalForm } from "../../shared/goal";
import { SubgoalForm } from "../../shared/subgoal";
import { TaskForm } from "../../shared/task";
import { ScheduleForm } from "../../shared/schedule";
import { ControlContext } from "../../shared/controlContext";

import "./ModalTemplate.css";

interface ModalTemplateProps {
  modals: ModalFormProps[];
  show: boolean;
  handleClose: () => void;
}

interface ModalFormProps {
  handleSubmit: () => void;
  data: GoalForm | TaskForm | SubgoalForm | ScheduleForm;
  tabTitle: string;
  title: string;
}

const ModalTemplate = ({ modals, show, handleClose }: ModalTemplateProps) => {
  const [id, setId] = useState(0);
  const { state } = useContext(ControlContext);
  const handleDisable = () => {
    const formResult = state.formResult;
    const data = modals[id].data;
    for (const key in data) {
      if (formResult[key] === undefined || formResult[key] === "") {
        return true;
      }
    }
    return false;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div className="modal-nav-bar">
        {modals.map((modal, index) => {
          return (
            <div
              className={[
                "modal-nav-item",
                id === index ? "selected" : "",
                modals.length === index + 1 ? "last" : "",
              ].join(" ")}
              key={index}
              onClick={() => setId(index)}
            >
              {modal.tabTitle}
            </div>
          );
        })}
      </div>
      <Modal.Header closeButton>
        <Modal.Title>{modals[id].title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.entries(modals[id].data).map(([key, type], index) => {
            return <FieldView fieldName={key} type={type} key={index} />;
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => modals[id].handleSubmit()}
          disabled={handleDisable()}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTemplate;
export type { ModalFormProps };
