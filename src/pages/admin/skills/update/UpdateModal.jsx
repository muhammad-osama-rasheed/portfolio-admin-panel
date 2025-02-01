import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import CustomInput from "../../../../components/customInput/CustomInput";
import styles from "./../../Common.module.css";
import { toast } from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";

function UpdateModal({
  showUpdateModal,
  setShowUpdateModal,
  item,
  getProgress,
}) {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [perc, setPerc] = useState("");
  const [color, setColor] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badPerc, setBadPerc] = useState("");
  const [badColor, setBadColor] = useState("");

  useEffect(() => {
    if (item) {
      setId(item._id);
      setTitle(item.title);
      setPerc(item.percentage);
      setColor(item.color);
    } else {
      setId("");
      setTitle("");
      setPerc("");
      setColor("");
    }
  }, [item]);

  const updateProgress = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://osamaapi.vercel.app/progress/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, percentage: parseInt(perc), color }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update progress bar");
      }
      setShowUpdateModal(false);

      // window.location.reload();
      getProgress();
      setLoading(false);
      toast.success("Progress Bar Updated Successfully!");
    } catch (error) {
      console.log("Error updating progress bar: ", error);
      setLoading(false);
      toast.error("Failed to update progress bar!");
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
    setTitle(item ? item.title : "");
    setPerc(item ? item.percentage : "");
    setColor(item ? item.color : "");
    setBadTitle("");
    setBadPerc("");
    setBadColor("");
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
          emptyState();
        }}
        keyboard={false}
        backdrop="static"
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
            Update Progress Bar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            onClick={() => {
              setShowUpdateModal(false);
              emptyState();
            }}
            text={"Cancel"}
          />
          <BgButton
            onClick={() => {
              if (validation()) {
                updateProgress();
                emptyState();
              }
            }}
            text={"Update"}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;
