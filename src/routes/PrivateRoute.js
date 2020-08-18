import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isToken = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default PrivateRoute;
