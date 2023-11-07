import { useState } from "react";
import { Button, Container, Row, Col, Form, Stack } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

const AddCat = () => {
  const navigate = useNavigate();
  const { create } = useCategories();
  const [name, setName] = useState("");

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      await create({ name: name });
      navigate("/admin/categories");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <h1 className="text-center">Add new Category</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
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
              <Link to="/admin/categories" className="btn btn-danger">
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