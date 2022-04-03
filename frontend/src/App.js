import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Verify from "./pages/Verify";
import { Container, ThemeProvider } from "@mui/material";

import { theme } from "./component/config/theme";
import Addproduct from "./pages/products/Addproduct";
import Cart from "./pages/cart/Cart";
import UnProtectedRoutes from "./HOC/UnProtectedRoutes";
import ProtectedRoutes from "./HOC/ProtectedRoutes";
import React from "react";
import SingleProduct from "./pages/singleProduct/SingleProduct";
// import slugify from ""
function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:title" element={<SingleProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/api/user/verify/:id/:token"
                  element={<Verify />}
                />
                <Route path="/product/new" element={<Addproduct />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
          <ToastContainer closeOnClick autoClose={3000} />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
