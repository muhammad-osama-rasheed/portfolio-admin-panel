import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import styles from "./../../Common.module.css";
import CustomInput from "../../../../components/customInput/CustomInput";
import { SketchPicker } from "react-color";
import Loader from "../../../../components/loader/Loader";

function AddProgressModal({ getProgress, showAddModal, setShowAddModal }) {
  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const [title, setTitle] = useState("");
  const [perc, setPerc] = useState("");
  const [color, setColor] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badPerc, setBadPerc] = useState("");
  const [badColor, setBadColor] = useState("");

  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_PROGRESS_BAR, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, percentage: perc, color }),
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getProgress();
        setShowAddModal(false);
        emptyState();
        toast.success(message || "Progress bar added successfully.");
      } else {
        toast.error(message || "Failed to add Progress bar.");
        setShowAddModal(false);
        emptyState();
      }
    } catch (error) {
      console.error("Error adding progress: ", error);
      toast.error("Failed to add progress bar.");
      setShowAddModal(false);
      emptyState();
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    let validTitle = true;
    let validPerc = true;
    let validColor = true;

    if (title === "") {
      setBadTitle("Please Enter a Title.");
      validTitle = false;
    } else if (title !== "" && title.length < 2) {
      setBadTitle("Please Enter a Valid Title.");
      validTitle = false;
    } else {
      setBadTitle("");
    }

    let percRegex = /^\d+$/;
    // Convert perc to a string if it's not already a string
    if (perc === "") {
      setBadPerc("Please Enter a Percentage.");
      validPerc = false;
    } else if (perc !== "" && (perc < 1 || perc > 100)) {
      setBadPerc("Please Enter Percentage between (1-100).");
      validPerc = false;
    } else if (
      perc !== "" &&
      perc >= 1 &&
      perc <= 100 &&
      !String(perc).match(percRegex) // Convert perc to string
    ) {
      setBadPerc("Please Enter a Valid Percentage.");
      validPerc = false;
    } else {
      setBadPerc("");
    }

    let colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (color === "") {
      setBadColor("Please Enter a Color.");
      validColor = false;
    } else if (color !== "" && !color.match(colorRegex)) {
      // Use color.match instead of colorRegex.match
      setBadColor("Please Enter a Valid Color (Hexadecimal).");
      validColor = false;
    } else {
      setBadColor("");
    }

    return validTitle && validPerc && validColor;
  };

  const emptyState = () => {
    setTitle("");
    setPerc("");
    setColor("");
    setBadTitle("");
    setBadPerc("");
    setBadColor("");
    setShowColorPicker(false);
  };

  return (
    <>
      {loading && <Loader />}

      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          emptyState();
        }}
        keyboard={true}
        backdrop="static"
        // centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              fontSize: "16px",
              color: "#666666",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Add New Progress Bar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div style={{ marginBottom: "10px" }} className="row">
              <div className="col-12">
                <CustomInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type={"text"}
                  title={"Title"}
                  placeholder={"Title"}
                  name={"title"}
                  required={true}
                  bad={badTitle !== ""}
                />
                {badTitle && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badTitle}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={perc}
                  onChange={(e) => setPerc(e.target.value)}
                  type={"number"}
                  title={"Percentage"}
                  placeholder={"Percentage"}
                  name={"percentage"}
                  required={true}
                  bad={badPerc !== ""}
                />
                {badPerc && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badPerc}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  type={"text"}
                  title={"Color"}
                  placeholder={"Color"}
                  name={"color"}
                  required={true}
                  bad={badColor !== ""}
                />
                {badColor && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badColor}</div>
                  </div>
                )}

                <div
                  className="my-3"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    width: "100%",
                    backgroundColor: "#F2F2F2",
                    padding: "5px 10px",
                    borderRadius: "2px",
                  }}
                >
                  <span
                    style={{
                      color: "#000000B3",
                      fontFamily: "Quicksand, Arial, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    Color Picker
                  </span>
                  <img
                    style={{
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      backgroundColor: "#2C98F0",
                      padding: "4px",
                    }}
                    src={
                      showColorPicker
                        ? "/images/minus.png"
                        : "/images/upload.png"
                    }
                    alt="icon"
                  />
                </div>

                {showColorPicker && (
                  <SketchPicker
                    color={color}
                    onChangeComplete={(color) => setColor(color.hex)}
                    disableAlpha={true}
                    styles={{
                      default: {
                        picker: {
                          width: "120px",
                          height: "120px",
                          overflow: "auto",
                          borderRadius: "2px",
                          margin: "0 auto",
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowAddModal(false);
              emptyState();
            }}
          />
          <BgButton
            text={"Save"}
            onClick={() => {
              if (validation()) {
                handleSave();
              }
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProgressModal;
