import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import toast from "react-hot-toast";
import CustomInput from "../../../../components/customInput/CustomInput";
import Loader from "../../../../components/loader/Loader";
import styles from "./UpdateSkillModal.module.css";

function UpdateSkillModal({
  showUpdateSkillModal,
  setShowUpdateSkillModal,
  item,
  getskills,
}) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [newImg, setNewImg] = useState("");

  const [badName, setBadName] = useState("");
  const [badCategory, setBadCategory] = useState("");
  const [badImage, setBadImage] = useState("");

  const [loading, setLoading] = useState("");

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
      setBadName("Please Enter a Valid Product Name.");
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

    if (newImg && newImg != "") {
      const fileExtension = newImg.name.split(".").pop().toLowerCase();
      if (!validImageExtensions.includes(fileExtension)) {
        setBadImage("Please select a valid image file (.png)");
        validImage = false;
      } else if (newImg.size > maxSize) {
        setBadImage("File size must be less than or equal 100KB.");
        validImage = false;
      } else {
        setBadImage("");
        validImage = true;
      }
    }

    return validName && validCategory && validImage;
  };

  // useEffect(() => {
  //   setId(item ? item._id : "");
  //   setName(item ? item.name : "");
  //   setCategory(item ? item.category : "");
  //   setImage(item ? item.image : "");
  // }, [item]);

  useEffect(() => {
    if (showUpdateSkillModal) {
      setId(item ? item._id : "");
      setName(item ? item.name : "");
      setCategory(item ? item.category : "");
      setImage(item ? item.image : "");
      setNewImg("");
      setBadName("");
      setBadCategory("");
      setBadImage("");
    }
  }, [showUpdateSkillModal, item]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      if (newImg && newImg != "") {
        formData.append("newimage", newImg);
      }
      const response = await fetch(`https://osamaapi.vercel.app/skills/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update skill.");
      }

      setShowUpdateSkillModal(false);
      getskills();
      toast.success("Skill updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showUpdateSkillModal}
        centered
        onHide={() => {
          setShowUpdateSkillModal(false);
        }}
        keyboard={true}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              fontSize: "14px",
              color: "#666666",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Update{" "}
            <span style={{ color: "#2C98F0" }}>{name ? name : "Skill"}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <CustomInput
                  type={"text"}
                  title={"Name"}
                  placeholder={"ex. abc skill"}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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

              {image != "" && image && (
                <div className="col-12 mt-3">
                  <div className="d-flex align-items-center">
                    <img
                      style={{ width: "30px", height: "30px" }}
                      src={`data:image/png;base64,${image}`}
                      alt="icon"
                    />
                    <p
                      style={{
                        color: "#2C98F0",
                        fontSize: "14px",
                        fontWeight: "500",
                        fontFamily: "Quicksand, Arial, sans-serif",
                      }}
                      className="mb-0 ms-2"
                    >
                      Current Icon
                    </p>
                  </div>
                </div>
              )}

              <div className="col-12">
                <input
                  style={{ borderColor: badImage != "" ? "red" : "#ccc" }}
                  type="file"
                  onChange={(event) => setNewImg(event.target.files[0])}
                  accept="image/png"
                  className={styles["file-input"]}
                  placeholder="Upload Product Image"
                  name={"newimage"}
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
            text={"cancel"}
            onClick={() => {
              setShowUpdateSkillModal(false);
            }}
          />
          <BgButton
            text={"Update"}
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

export default UpdateSkillModal;
