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
import UpdateProfile from "./pages/users/UpdateProfile";
import Orders from "./pages/users/Orders";
import Password from "./pages/users/Password";
import Dashboard from "./pages/users/Dashboard";
import RecentViewed from "./pages/users/RecentViewed";
import Inbox from "./pages/users/Inbox";
import { useSelector } from "react-redux";

// import slugify from ""
function App() {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const { user}  = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:title" element={<SingleProduct />} />
                <Route
                  path="/api/user/verify/:id/:token"
                  element={<Verify />}
                />
                {/* <ProtectedRoutes > */}
                <Route element={<UnProtectedRoutes  user={user?.user}/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                </Route>

                <Route element={<ProtectedRoutes  user={user?.user}/>}>
                    <Route path="/product/new" element={<Addproduct />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* users dashboard */}
                    <Route path="/users/update/:id" element={<UpdateProfile />} />
                    <Route path="/users/orders/:id" element={<Orders />} />
                    <Route path="/users/account" element={<Dashboard />} />
                    <Route path="/users/recent-view" element={<RecentViewed />} />
                    <Route
                      path="/users/change-password/:id"
                      element={<Password />}
                    />
                    <Route path="/users/inbox" element={<Inbox />} />
                </Route>
                {/* </ProtectedRoutes> */}
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
