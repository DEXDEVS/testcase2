import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  if (!isLoggedIn) return <>{children}</>;
  return <Navigate to="/" />;
};

export default PublicRoute;
