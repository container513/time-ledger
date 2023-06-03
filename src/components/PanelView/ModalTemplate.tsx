import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import FieldView from "./FieldView";
import { GoalForm } from "../../shared/goal";
import { SubgoalForm } from "../../shared/subgoal";
import { TaskForm } from "../../shared/task";
import { ControlContext } from "../../shared/controlContext";

interface ModalTemplateProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  data: GoalForm | TaskForm | SubgoalForm;
  title: string;
}

const ModalTemplate = ({
  show,
  handleClose,
  handleSubmit,
  data,
  title,
}: ModalTemplateProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {Object.entries(data).map(([key, type], index) => {
            return <FieldView fieldName={key} type={type} key={index} />;
          })}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTemplate;
