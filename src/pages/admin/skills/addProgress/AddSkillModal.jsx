import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import CustomInput from "../../../../components/customInput/CustomInput";
import styles from "./AddSkillModal.module.css";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";

function AddSkillModal({ showAddSkillModal, setShowAddSkillModal, getskills }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [badName, setBadName] = useState("");
  const [badCategory, setBadCategory] = useState("");
  const [badImage, setBadImage] = useState("");

  const [loading, setLoading] = useState(false);

  const categories = ["frontend", "backend", "language", "database", "other"];

  const validation = () => {
    let validName = true;
    let validCategory = true;
    let validImage = true;

    const validImageExtensions = ["png"];
    const maxSize = 100 * 1024;

    if (name == "") {
      setBadName("Please Enter a Skill Name.");
      validName = false;
    } else if (name != "" && name.length < 2) {
      setBadName("Please Enter a Valid Skill Name.");
      validName = false;
    } else if (name != "" && name.length >= 2) {
      setBadName("");
      validName = true;
    }

    if (category == "") {
      setBadCategory("Please Select a Category.");
      validCategory = false;
    } else {
      setBadCategory("");
      validCategory = true;
    }

    if (!image) {
      setBadImage("Please Select an Image.");
      validImage = false;
    } else {
      const fileExtension = image.name.split(".").pop().toLowerCase();
      if (!validImageExtensions.includes(fileExtension)) {
        setBadImage("Please select a valid image file (.png)");
        validImage = false;
      } else if (image.size > maxSize) {
        setBadImage("File size must be less than or equal 100KB.");
        validImage = false;
      } else {
        setBadImage("");
        validImage = true;
      }
    }

    return validName && validCategory && validImage;
  };

  const handleSubmit = async () => {
    try {
      setShowAddSkillModal(false);
      setLoading(true);

      let formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("image", image);

      const response = await fetch("https://osamaapi.vercel.app/skills", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add skill");
      } else {
        getskills();
        toast.success("Skill added successfully.");
        emptyState();
      }
    } catch (error) {
      console.log("Error submitting skill: ", error);
      setLoading(false);
      toast.error("Failed to add Skill.");
    } finally {
      setLoading(false);
    }
  };

  const emptyState = () => {
    setName("");
    setCategory("");
    setImage("");
    setBadName("");
    setBadCategory("");
    setBadImage("");
  };

  return (
    <>
      {loading && <Loader />}

      <Modal
        show={showAddSkillModal}
        onHide={() => {
          setShowAddSkillModal(false);
          emptyState();
        }}
        backdrop="static"
        keyboard={true}
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
            Add New Skill
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <CustomInput
                  title={"Name"}
                  placeholder={"ex. abc skill"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type={"text"}
                  name={"name"}
                  required={true}
                  bad={badName !== ""}
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
                <div className="dropdown mt-3">
                  <button
                    style={{
                      borderColor: badCategory != "" ? "red" : "#9e9e9e",
                    }}
                    className={`${styles["custom-input"]} dropdown-toggle d-flex justify-content-between align-items-center`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span
                      style={{ color: category == "" ? "#666666" : "#000000" }}
                    >
                      {category != "" ? category : "Select Skill Category"}
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    {categories.map((item, index) => (
                      <li key={index}>
                        <div
                          className={`${styles["item"]} dropdown-item`}
                          onClick={() => setCategory(item)}
                        >
                          {item}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {badCategory && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badCategory}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <input
                  style={{ borderColor: badImage != "" ? "red" : "#ccc" }}
                  type="file"
                  onChange={(event) => setImage(event.target.files[0])}
                  accept="image/png"
                  className={styles["file-input"]}
                  placeholder="Upload Product Image"
                  name="image"
                  required={true}
                />
                {badImage && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badImage}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowAddSkillModal(false);
              emptyState();
            }}
          />
          <BgButton
            text={"Save"}
            onClick={() => {
              if (validation()) {
                handleSubmit();
              }
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSkillModal;
