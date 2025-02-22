import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { replace, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Loader from "../../components/loader/Loader";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setName(localStorage.getItem("adminName"));
    setEmail(localStorage.getItem("adminEmail"));
  }, []);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("jwtToken");

    toast.success("Logout! Successfully.", {
      style: {
        border: "1px solid #2C98F0",
        padding: "16px",
        color: "#2C98F0",
      },
      iconTheme: {
        primary: "#2C98F0",
        secondary: "#fff",
      },
    });

    setLoading(false);
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <>
      {loading && <Loader />}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p className={styles["main-heading"]}>Welcome Admin!</p>
        <p style={{ color: "#2C98F0" }} className={styles["main-heading"]}>
          {name ? name : ""}
        </p>
        <div
          onClick={() => navigate("/admin")}
          className={`mt-2 ${styles["border-button"]}`}
        >
          MANAGE DASHBOARD
        </div>
        <div
          onClick={() => handleLogout()}
          className={`mt-1 ${styles["bg-button"]}`}
        >
          LOGOUT
        </div>
      </div>
    </>
  );
}

export default Home;
