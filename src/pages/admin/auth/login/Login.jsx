import React, { useState } from "react";
import styles from "./Login.module.css";
import CustomInput from "../../../../components/customInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [badEmail, setBadEmail] = useState("");
  const [badPassword, setBadPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = () => {
    let validEmail = true;
    let validPassword = true;

    if (email === "") {
      setBadEmail("Please Enter your Email.");
      validEmail = false;
    } else if (
      email !== "" &&
      !/^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|aol\.com)$/.test(
        email
      )
    ) {
      setBadEmail("Please Enter a Valid Email.");
      validEmail = false;
    } else {
      setBadEmail("");
      validEmail = true;
    }

    if (password === "") {
      setBadPassword("Please Enter your Password.");
      validPassword = false;
    } else if (password.length < 6) {
      setBadPassword("Password should be at least 6 characters long.");
      validPassword = false;
    } else {
      setBadPassword("");
      validPassword = true;
    }

    return validEmail && validPassword;
  };

  const emptyState = () => {
    setEmail("");
    setPassword("");
    setBadEmail("");
    setBadPassword("");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      const { success, message, jwtToken, name, error } = result;

      if (success) {
        if (result.email === import.meta.env.VITE_EMAIL) {
          toast.success(message || "Login! successfully.", {
            style: {
              border: "1px solid #2C98F0",
              padding: "12px",
              color: "#2C98F0",
            },
            iconTheme: {
              primary: "#2C98F0",
              secondary: "#fff",
            },
          });
        } else {
          toast.error("You are not authorized to access.");
          return navigate("/login");
        }

        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("adminName", name);
        localStorage.setItem("adminEmail", result.email);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="row">
          <div className="col-12">
            <div className={styles["main-conatiner"]}>
              <p className={styles["heading-section"]}>LOGIN</p>

              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <CustomInput
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      name="email"
                      required={true}
                      type={"text"}
                      title={"Email"}
                      placeholder={"ex. example@example.com"}
                      bad={badEmail !== ""}
                    />
                    {badEmail && (
                      <div className="d-flex align-items-center">
                        <div className="me-1">
                          <img
                            src="/images/error.png"
                            alt="error-image"
                            style={{ width: "12px", height: "12px" }}
                          />
                        </div>
                        <div className={styles.errorMessage}>{badEmail}</div>
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <CustomInput
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      name="password"
                      required={true}
                      type={"password"}
                      title={"Password"}
                      placeholder={"ex. password123"}
                      bad={badPassword !== ""}
                    />
                    {badPassword && (
                      <div className="d-flex align-items-center">
                        <div className="me-1">
                          <img
                            src="/images/error.png"
                            alt="error-image"
                            style={{ width: "12px", height: "12px" }}
                          />
                        </div>
                        <div className={styles.errorMessage}>{badPassword}</div>
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <div
                      onClick={() => {
                        if (validation()) {
                          handleSubmit();
                          emptyState();
                        }
                      }}
                      className={styles["bg-button"]}
                    >
                      LOGIN
                    </div>
                  </div>

                  <div className="col-12">
                    <p className={`mb-0 ${styles["signup-text"]}`}>
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        style={{
                          color: "#2C98F0",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        Signup
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
