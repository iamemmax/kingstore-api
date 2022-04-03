import React, { Component } from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

function ProtectedRoutes({ component: Component, ...rest }) {
  const navigate = useNavigate();
  console.log(navigate);
  const { user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return navigate("/login");
        }
        return <Component {...props} />;
      }}
    />
  );
}

export default ProtectedRoutes;
