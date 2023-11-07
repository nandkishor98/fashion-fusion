import { useCallback, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Stack } from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategories";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, updateById } = useCategories();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      await updateById(id, { name: name });
      navigate("/admin/categories");
    } catch (e) {
      alert(e);
    }
  };

  const fetchDetails = useCallback(async () => {
    const result = await getById(id);
    setName(result?.name);
    setSlug(result?.slug);
  }, [id, getById]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category Name"
                value={slug}
                disabled
              />
            </Form.Group>
            <Stack gap={1} direction="horizontal">
              <Button
                variant="primary"
                type="submit"
                size="md"
                style={{ width: "8rem" }}
              >
                Update
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

export default Edit;