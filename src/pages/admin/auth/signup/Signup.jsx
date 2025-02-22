import React, { useState } from "react";
import styles from "./Signup.module.css";
import CustomInput from "../../../../components/customInput/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [badName, setBadName] = useState("");
  const [badEmail, setBadEmail] = useState("");
  const [badPassword, setBadPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validation = () => {
    let validName = true;
    let validEmail = true;
    let validPassword = true;

    if (name === "") {
      setBadName("Please Enter your Name.");
      validName = false;
    } else if (name !== "" && name.length < 3) {
      setBadName("Name should be at least 3 characters long.");
      validName = false;
    } else {
      setBadName("");
      validName = true;
    }

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

    return validName && validEmail && validPassword;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(import.meta.env.VITE_API_URL_SIGNUP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        toast.success(message || "Signup successfully!", {
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
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        toast.error(details);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Failed to Signup.");
    } finally {
      setLoading(false);
    }
  };

  const emptyState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setBadName("");
    setBadEmail("");
    setBadPassword("");
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
              <p className={styles["heading-section"]}>SIGN UP</p>

              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <CustomInput
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      name={"name"}
                      type={"text"}
                      title={"Name"}
                      placeholder={"ex. abcd"}
                      bad={badName !== ""}
                      required={true}
                    />
                    {badName && (
                      <div className="d-flex align-items-center">
                        <div className="me-1">
                          <img
                            src="/images/error.png"
                            alt="error-image"
                            style={{ width: "12px", height: "12px" }}
                          />
                        </div>
                        <div className={styles.errorMessage}>{badName}</div>
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <CustomInput
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      name={"email"}
                      type={"text"}
                      title={"Email"}
                      placeholder={"ex. example@example.com"}
                      bad={badEmail !== ""}
                      required={true}
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
                      name={"password"}
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
                      Signup
                    </div>
                  </div>

                  <div className="col-12">
                    <p className={`mb-0 ${styles["signup-text"]}`}>
                      Don't have an account?{" "}
                      <Link
                        to="/login"
                        style={{
                          color: "#2C98F0",
                          textDecoration: "none",
                          fontWeight: "500",
                        }}
                      >
                        Login
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

export default Signup;
