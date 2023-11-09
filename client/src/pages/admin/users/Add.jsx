import { useState } from "react";
import { Button, Container, Row, Col, Form, Stack } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../../../hooks/useUsers";

const AddUsers = () => {
  const navigate = useNavigate();
  const { create } = useUsers();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleSubmit = async (evnt) => {
    try {
      evnt.preventDefault();
      const result = await create(payload);
      if (result.msg === "success") {
        alert("User has been added successfully");
        navigate("/admin/users");
      }
    } catch (e) {
      alert(e);
    } finally {
      setPayload({
        name: "",
        email: "",
        password: "",
        roles: "",
      });
    }
  };
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                value={payload?.password}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, password: e.target.value };
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
                Update
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

export default AddUsers;