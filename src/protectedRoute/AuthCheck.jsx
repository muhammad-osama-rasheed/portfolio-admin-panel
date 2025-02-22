import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("adminName");
          localStorage.removeItem("adminEmail");
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("adminName");
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("jwtToken");
        navigate("/login", { replace: true });
      }
    }
  }, [navigate]);

  return null;
}

export default AuthCheck;
