import { Link } from "react-router-dom";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { Badge, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useSelector } from "react-redux";

function ENavbar() {
  const { quantity } = useSelector((state) => state.cart);
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-dark">
            Fashion Fusion
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link
              to="/products"
              className="nav-link text-decoration-none text-dark"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="nav-link text-decoration-none text-dark"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="nav-link text-decoration-none text-dark"
            >
              Contact
            </Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Link to="/cart" className="btn btn-light">
            <FiShoppingCart />
            &nbsp;
            <Badge bg="secondary">{quantity ?? 0}</Badge>
          </Link>
          <Link to="/login" className="btn btn-light" href="/login">
            <FiLogIn />
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ENavbar;