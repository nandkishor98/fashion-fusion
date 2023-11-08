import { useState } from "react";
import { Button, Container, Row, Col, Form, Stack } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useOrders } from "../../../hooks/useOrders";

const AddCat = () => {
  const navigate = useNavigate();
  const { create } = useOrders();
  const [name, setName] = useState("");

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      await create({ name: name });
      navigate("/admin/orders");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <h1 className="text-center">Add new Order</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Order Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Stack gap={1} direction="horizontal">
              <Button
                variant="primary"
                type="submit"
                size="md"
                style={{ width: "8rem" }}
              >
                Add
              </Button>
              <Link to="/admin/orders" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCat;