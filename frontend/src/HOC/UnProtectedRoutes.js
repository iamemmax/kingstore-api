import React from "react";
import { useSelector } from "react-redux";
import { Route, useNavigate } from "react-router-dom";

function UnProtectedRoutes({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) => {
          if (user) {
            return navigate("/");
          }
          return <Component {...props} />;
        }}
      />
    </React.Fragment>
  );
}

export default UnProtectedRoutes;
