import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import { AdminRoute, PrivateRoute } from "./components/Routes";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

// Default routes
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import { CheckoutPageStatus } from "./components/CheckoutStatus";

// Admin routes
import Dashboard from "./pages/admin/Dashboard";
import { AdminProducts, AddProduct, EditProduct } from "./pages/admin/products";
import { AddCat, EditCat, ListCat } from "./pages/admin/categories";
import { AddOrders, EditOrders, ListOrders } from "./pages/admin/orders";
import { AddUsers, EditUsers, ListUsers } from "./pages/admin/users";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutPageStatus />} />
            <Route
              path="/checkout/failed"
              element={
                <CheckoutPageStatus
                  type="failure"
                  msg="Something went wrong. Try Again"
                  msgHeader="Transaction Failed"
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute role="admin">
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute role="admin">
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <AdminRoute role="admin">
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminRoute role="admin">
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute role="admin">
                  <ListCat />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories/add"
              element={
                <AdminRoute role="admin">
                  <AddCat />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories/:id"
              element={
                <AdminRoute role="admin">
                  <EditCat />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute role="admin">
                  <ListOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/add"
              element={
                <AdminRoute role="admin">
                  <AddOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders/:id"
              element={
                <AdminRoute role="admin">
                  <EditOrders />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute role="admin">
                  <ListUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/add"
              element={
                <AdminRoute role="admin">
                  <AddUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <AdminRoute role="admin">
                  <EditUsers />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;