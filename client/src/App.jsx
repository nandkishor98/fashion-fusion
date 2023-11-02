import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./layouts/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import Checkout from "./pages/Checkout";
import { AdminRoute, PrivateRoute } from "./components/Routes";
import { CheckoutPageStatus } from "./components/CheckoutStatus";
import Dashboard from "./pages/admin/Dashboard";
import AdminNavbar from "./layouts/Adminbar";

import { useSelector } from "react-redux";

const adminRoutes = [
  { path: "/categories", component: <AdminProducts />, role: "admin" },
  { path: "/dashboard", component: <Dashboard />, role: "admin" },
  { path: "/products", component: <AdminProducts />, role: "admin" },
  { path: "/products/add", component: <AddProduct />, role: "admin" },
  { path: "/orders", component: <AdminProducts />, role: "admin" },
  { path: "/users", component: <AdminProducts />, role: "admin" },
];

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div className="">
      <BrowserRouter>
        {isLoggedIn ? <AdminNavbar /> : <Navbar />}

        <main className="flex-shrink-0 d-flex flex-column min-vh-100">
          <div className="container mt-2 mb-5">
            <Routes>
              <Route path="/" element=<Home /> />
              {adminRoutes.length > 0 &&
                adminRoutes.map((route, index) => (
                  <Route
                    key={index}
                    path={`/admin${route?.path}`}
                    element={
                      <AdminRoute role={route?.role}>
                        {route?.component}
                      </AdminRoute>
                    }
                  />
                ))}
              <Route path="/about" element=<About /> />
              <Route path="/cart" element=<Cart /> />
              <Route path="/checkout" element=<Checkout /> />
              <Route path="/checkout/success" element=<CheckoutPageStatus /> />
              <Route
                path="/checkout/failed"
                element=<CheckoutPageStatus
                  type="failure"
                  msg="Something went wrong. Try Again"
                  msgHeader="Transaction Failed"
                />
              />
              <Route path="/contact" element=<Contact /> />
              <Route
                path="/login"
                element={
                  <PrivateRoute>
                    <Login />
                  </PrivateRoute>
                }
              />
              <Route path="/products" element=<Products /> />
              <Route path="/products/:id" element=<ProductDetail /> />

              <Route path="*" element=<ErrorPage /> />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;