import React from "react";

import { Navigate } from "react-router-dom";
import { AppContext } from "../Components/Context";
import { useContext } from "react";
const Private = ({ children }) => {
  const { login, Auth } = useContext(AppContext);
  if (!Auth) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default Private;
