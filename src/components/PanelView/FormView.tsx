import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

interface FormViewProps {
  fieldName: string;
  type: string;
}

const FormView = ({ fieldName, type }: FormViewProps) => {
  return (
    <Form.Group as={Row} className="mb-3" controlId={fieldName}>
      <Form.Label column sm="2">
        {fieldName}
      </Form.Label>
      <Col sm="10">
        <Form.Control type="text" />
      </Col>
    </Form.Group>
  );
};

export default FormView;
