import { useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";

const Login = () => {
  const [key, setKey] = useState("login");
  return (
    <div className="container w-50">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 "
      >
        <Tab eventKey="login" title="Login">
          <LoginForm />
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUpForm />
        </Tab>
      </Tabs>
    </div>
  );
};

const SignUpForm = () => {
  const [validated, setValidated] = useState(false);

  const checkFormValidity = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log({ valid: form.checkValidity() });
    setValidated(true);
  };

  const handleSubmit = () => {};

  return (
    <>
      <Form
        className="d-grid gap-2"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onChange={checkFormValidity}
      >
        <Form.Group
          as={Col}
          md="12"
          className="mb-3"
          controlId="validationCustom01"
        >
          <Form.Label>Full name</Form.Label>
          <Form.Control required type="text" placeholder="Full name" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          as={Col}
          md="12"
          className="mb-3"
          controlId="validationCustom02"
        >
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Your Valid Email" />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Password" />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Confirm Password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit" size="lg">
          Register
        </Button>
      </Form>
    </>
  );
};

const LoginForm = () => {
  return (
    <Form className="d-grid gap-2">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit" size="lg">
        Login
      </Button>
    </Form>
  );
};

export default Login;