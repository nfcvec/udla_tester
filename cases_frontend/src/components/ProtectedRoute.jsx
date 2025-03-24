import React from "react";
import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

const ProtectedRoute = ({ children, role }) => {
  const { accounts } = useMsal();
  const user = accounts[0];
  const roles = user?.idTokenClaims?.roles || [];

  if (!roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
