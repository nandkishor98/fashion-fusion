import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { getToken } from "../utils/session";

export const AdminRoute = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && isAdmin(role) ? (
        children
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </>
  );
};

export const PrivateRoute = ({ children }) => {
  return (
    <>
      {isLoggedIn() ? <Navigate replace to={"/admin/dashboard"} /> : children}
    </>
  );
};

const isAdmin = (role) => {
  // CHECK JWT TOKEN (Private)
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { data } = jwtDecode(token);
  const isValid = data.roles.includes(role);
  return isValid;
};

const isLoggedIn = () => {
  // check for access token
  const token = getToken();
  if (!token) return false;
  // check for access token duration
  const { exp } = jwtDecode(token);
  const now = new Date().valueOf();
  const isValid = new Date(now).getTime() > new Date(exp).getTime();
  return isValid;
};