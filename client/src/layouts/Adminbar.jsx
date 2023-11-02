import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/session";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../slices/authSlice";

function AdminNavbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setLogOut());
    removeToken();
    navigate("/");
  };

  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link
            to="/admin/dashboard"
            className="text-decoration-none text-dark"
          >
            Fashion Fusion Admin
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link
              to="/admin/categories"
              className="nav-link text-decoration-none text-dark"
            >
              Categories
            </Link>
            <Link
              to="/admin/products"
              className="nav-link text-decoration-none text-dark"
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="nav-link text-decoration-none text-dark"
            >
              Orders
            </Link>
            <Link
              to="/admin/users"
              className="nav-link text-decoration-none text-dark"
            >
              Users
            </Link>
          </Nav>
          <Nav className="mr-2">
            <div>
              Welcome <strong>{user?.name}</strong>
            </div>
          </Nav>
          <button className="btn btn-light" onClick={() => handleLogout()}>
            <FiLogOut />
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;