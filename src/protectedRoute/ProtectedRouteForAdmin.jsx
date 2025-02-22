import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutedForAdmin({ children }) {
  const AdminEmail = localStorage.getItem("adminEmail");

  if (!AdminEmail || AdminEmail !== import.meta.env.VITE_EMAIL) {
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("jwtToken");
    return <Navigate to={"/login"} replace={true} />;
  }

  return children;
}

export default ProtectedRoutedForAdmin;
