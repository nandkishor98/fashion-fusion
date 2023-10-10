import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children, role }) => {
  return <>{isAdmin(role) ? children : <Navigate to={"/login"} />}</>;
};

const isAdmin = (role) => {
  // CHECK JWT TOKEN (Private)
  // Role check (Protected)
  return true;
};