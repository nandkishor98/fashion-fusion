import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <main className="flex-shrink-0 vh-100">
          <div className="container">
            <Routes>
              <Route path="/" element=<Home /> />
              <Route path="/cart" element=<Cart /> />
              <Route path="/contact" element=<Contact /> />
              <Route path="/login" element=<Login /> />
              <Route path="/products" element=<Products /> />
              <Route path="/products/:id" element=<ProductDetail /> />
              <Route path="*" element=<ErrorPage /> />
            </Routes>
            <Footer />
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;