import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

import { ControlContext } from "../../shared/controlContext";
import { capitalizeFirstLetter } from "../../shared/utils";

interface FieldViewProps {
  fieldName: string;
  type: string;
}

const FieldView = ({ fieldName, type }: FieldViewProps) => {
  const { state, setState } = useContext(ControlContext);

  const [value, setValue] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    const newformResult = { ...state.formResult };
    newformResult[fieldName] = e.target.value;
    setState({ formResult: newformResult });
  };
  return (
    <Form.Group as={Row} className="mb-3" controlId={fieldName}>
      <Form.Label column sm="2">
        {capitalizeFirstLetter(fieldName)}
      </Form.Label>
      <Col sm="10">
        <Form.Control type={type} onChange={handleChange} value={value} />
      </Col>
    </Form.Group>
  );
};

export default FieldView;
