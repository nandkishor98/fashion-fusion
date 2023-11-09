import { useCallback, useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Stack } from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";

const EditUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, updateById } = useUsers();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      payload.id = id;
      const result = await updateById(id, payload);
      if (result.msg === "success") {
        alert("User has been updated successfully");
        navigate("/admin/users");
      }
    } catch (e) {
      alert(e);
    }
  };

  const fetchDetails = useCallback(async () => {
    const result = await getById(id);
    const {
      created_at,
      created_by,
      isActive,
      isArchived,
      isEmailVerified,
      updated_at,
      updated_by,
      roles,
      ...rest
    } = result;
    rest.roles = roles.toString();
    setPayload(rest);
  }, [id, getById]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <h1 className="text-center">Add new User</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                value={payload?.name}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter user email"
                value={payload?.email}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Role</Form.Label>
              <Form.Select
                value={payload?.roles}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, roles: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Form.Select>
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
              <Link to="/admin/users" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditUsers;