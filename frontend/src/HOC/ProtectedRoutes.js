import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
