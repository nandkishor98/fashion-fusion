import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { loginByEmail } from "../slices/authSlice";

import useSignUp from "../hooks/useSignUp";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          <LoginForm
            dispatch={dispatch}
            login={loginByEmail}
            navigate={navigate}
          />
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUpForm />
        </Tab>
      </Tabs>
    </div>
  );
};

const SignUpForm = () => {
  const { email, register, successfulRegistration } = useSignUp();
  const [validated, setValidated] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const checkFormValidity = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ payload });
  };

  return (
    <>
      {email && successfulRegistration && (
        <>
          <Verify email={email} />
        </>
      )}
      {!successfulRegistration && (
        <Form
          className="d-grid gap-2"
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
          onChange={checkFormValidity}
        >
          <Form.Group
            as={Col}
            md="12"
            className="mb-3"
            controlId="validationCustom01"
          >
            <Form.Label>Full name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full name"
              value={payload.name}
              onChange={(e) => {
                setPayload((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            md="12"
            className="mb-3"
            controlId="validationCustom02"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Your Valid Email"
              value={payload.email}
              onChange={(e) => {
                setPayload((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                value={payload.password}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
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
          <Button type="submit" size="lg" disabled={email ? true : false}>
            Register
          </Button>
        </Form>
      )}
    </>
  );
};

const LoginForm = ({ dispatch, login, navigate }) => {
  const [signIn, setSignIn] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(login(signIn));
      if (data.payload.msg === "success") {
        navigate("/admin/dashboard");
      } else {
        setError(data.payload.msg);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };
  return (
    <Form className="d-grid gap-2">
      {error && <label className="text-center text-danger">{error}</label>}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={setSignIn.email}
          onChange={(e) => {
            setSignIn((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={setSignIn.password}
          onChange={(e) => {
            setSignIn((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        size="lg"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Login
      </Button>
    </Form>
  );
};

const Verify = ({ email }) => {
  const { verify, regenerate } = useSignUp();
  const [msg, setMsg] = useState("");
  const [verification, setVerification] = useState({ email: email, token: "" });
  const handleTokenSubmit = async (e) => {
    e.preventDefault();
    const data = await verify({ payload: verification });
    if (data.data.msg === "success") setMsg("Your email has been verified");
    else {
      setMsg("Something went wrong...");
    }
  };
  const handleResendToken = async (e) => {
    e.preventDefault();
    const data = await regenerate({ payload: { email } });
    if (data.data.msg === "success") setMsg("Your email has been sent");
    else {
      setMsg("Something went wrong...");
    }
  };
  return (
    <>
      <Form className="d-grid gap-2">
        {msg && <label className="text-center text-success">{msg}</label>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            readOnly={true}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Token</Form.Label>
          <Form.Control
            type="text"
            placeholder="Token"
            value={verification?.token}
            onChange={(e) => {
              setVerification((prev) => {
                return { ...prev, token: e.target.value };
              });
            }}
          />
          <div className="flex d-flex justify-content-between">
            <Form.Text className="text-muted">
              Check your email for Token
            </Form.Text>
            <Form.Text className="text-muted">
              <button
                className="btn btn-link text-decoration-none"
                onClick={(e) => {
                  handleResendToken(e);
                }}
              >
                Regenerate Token
              </button>
            </Form.Text>
          </div>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          onClick={(e) => {
            handleTokenSubmit(e);
          }}
        >
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;