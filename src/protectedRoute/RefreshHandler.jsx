import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RefreshHandler({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  return children;
}

export default RefreshHandler;
