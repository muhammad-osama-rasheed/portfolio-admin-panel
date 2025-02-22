import React, { useEffect, useRef, useState } from "react";
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
  const [tempImage, setTempImage] = useState("");

  const [badName, setBadName] = useState("");
  const [badCategory, setBadCategory] = useState("");
  const [badImage, setBadImage] = useState("");

  const [loading, setLoading] = useState("");
  const fileInputRef = useRef(null);

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

    if (image === "" && newImg === "") {
      setBadImage("Please Select an Image.");
      validImage = false;
    } else if (newImg && newImg != "") {
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_SKILLS}/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
          body: formData,
        }
      );

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        toast.success(message || "Skill updated successfully.");
        getskills();
        setShowUpdateSkillModal(false);
        stateEmpty();
      } else {
        toast.error(message || "Failed to update a skill.");
        setShowUpdateSkillModal(false);
        stateEmpty();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update: ", error.message);
      setShowUpdateSkillModal(false);
      stateEmpty();
    } finally {
      setLoading(false);
    }
  };

  const stateEmpty = () => {
    setName("");
    setCategory("");
    setImage("");
    setNewImg("");
    setBadName("");
    setBadCategory("");
    setBadImage("");
    setId("");
    setTempImage("");
  };

  const handleRemoveImage = () => {
    setNewImg("");
    setTempImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showUpdateSkillModal}
        onHide={() => {
          setShowUpdateSkillModal(false);
          stateEmpty();
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
            <div style={{ marginBottom: "20px" }} className="row">
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

              <div className="col-12">
                <input
                  style={{ borderColor: badImage != "" ? "red" : "#ccc" }}
                  type="file"
                  onChange={(event) => {
                    setNewImg(event.target.files[0]);
                    setTempImage(URL.createObjectURL(event.target.files[0]));
                    setImage("");
                  }}
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
                {image != "" && image && (
                  <div
                    style={{
                      width: "max-content",
                      position: "relative",
                      marginTop: "15px",
                    }}
                  >
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                        borderRadius: "2px",
                        border: "1px dotted #2C98F0",
                        padding: "5px",
                      }}
                      src={`data:image/png;base64,${image}`}
                      alt="icon"
                    />
                    <img
                      onClick={() => {
                        setImage("");
                      }}
                      style={{
                        width: "18px",
                        height: "18px",
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        border: "1px dotted #2C98F0",
                        padding: "2px",
                        color: "#2C98F0",
                      }}
                      src="/images/junk.png"
                      alt=""
                    />
                  </div>
                )}
                {tempImage != "" && tempImage && (
                  <div
                    style={{
                      width: "max-content",
                      position: "relative",
                      marginTop: "15px",
                    }}
                  >
                    <img
                      style={{
                        width: "35px",
                        height: "35px",
                        objectFit: "cover",
                        borderRadius: "2px",
                        border: "1px dotted #2C98F0",
                        padding: "5px",
                      }}
                      src={tempImage}
                      alt="icon"
                    />
                    <img
                      onClick={handleRemoveImage}
                      style={{
                        width: "18px",
                        height: "18px",
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        cursor: "pointer",
                        backgroundColor: "#fff",
                        borderRadius: "50%",
                        border: "1px dotted #2C98F0",
                        padding: "2px",
                        color: "#2C98F0",
                      }}
                      src="/images/junk.png"
                      alt=""
                    />
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
              stateEmpty();
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
