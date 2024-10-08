import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Signup from "./component/signup/Signup";
import Login from "./component/login/Login";
import Products from "./component/products/Products";
import Product from "./component/products/Product";
import Order from "./component/orders/Order";
import MyOrder from "./component/customer profile/Myorder";
import Cart from "./component/customer profile/Cart";
import ForgotPassword from "./component/forgotpassword/ForgotPassword";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/" element={<Products />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/my-orders" element={<MyOrder />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
