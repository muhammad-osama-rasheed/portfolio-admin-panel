import React, { useEffect, useRef, useState } from "react";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import CustomInput from "../../../../components/customInput/CustomInput";
import styles from ".././Education.module.css";
import toast from "react-hot-toast";

function UpdateEducationModal({
  showUpdateEducationModal,
  setShowUpdateEducationModal,
  item,
  getEducation,
}) {
  const [title, setTitle] = useState("");
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [grade, setGrade] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isOngoing, setIsOngoing] = useState(false);
  const [image, setImage] = useState("");
  const [newImg, setNewImg] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tempImage, setTempImage] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badInstitute, setBadInstitute] = useState("");
  const [badDegree, setBadDegree] = useState("");
  const [badGrade, setBadGrade] = useState("");
  const [badStartDate, setBadStartDate] = useState("");
  const [badEndDate, setBadEndDate] = useState("");
  const [badIsOngoing, setBadIsOngoing] = useState("");
  const [badImage, setBadImage] = useState("");
  const [badImageUrl, setBadImageUrl] = useState("");

  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (showUpdateEducationModal && item) {
      setId(item._id);
      setTitle(item.title);
      setInstitute(item.institute);
      setDegree(item.degree);
      setGrade(item.grade);
      setStartDate(item.startDate);
      setEndDate(item.endDate);
      setIsOngoing(item.isOngoing ? true : false);
      setImage(item.image);
      setImageUrl(item.imageUrl);
    } else {
      setTitle("");
      setInstitute("");
      setDegree("");
      setGrade("");
      setStartDate("");
      setEndDate("");
      setIsOngoing(false);
      setImage("");
      setBadTitle("");
      setBadInstitute("");
      setBadDegree("");
      setBadGrade("");
      setBadStartDate("");
      setBadEndDate("");
      setBadIsOngoing("");
      setBadImage("");
      setBadImageUrl("");
    }
  }, [showUpdateEducationModal, item]);

  const validation = () => {
    let validTitle = true;
    let validInstitute = true;
    let validDegree = true;
    let validGrade = true;
    let validStartDate = true;
    let validEndDate = true;
    let validIsOngoing = true;
    let validImage = true;
    let validImageUrl = true;

    if (title === "") {
      setBadTitle("Title is required.");
      validTitle = false;
    } else {
      setBadTitle("");
      validTitle = true;
    }

    if (institute === "") {
      setBadInstitute("Institute is required.");
      validInstitute = false;
    } else {
      setBadInstitute("");
      validInstitute = true;
    }

    if (degree === "") {
      setBadDegree("Degree is required.");
      validDegree = false;
    } else {
      setBadDegree("");
      validDegree = true;
    }

    if (grade === "") {
      setBadGrade("Grade is required.");
      validGrade = false;
    } else {
      setBadGrade("");
      validGrade = true;
    }

    if (startDate === "") {
      setBadStartDate("Start date is required.");
      validStartDate = false;
    } else {
      setBadStartDate("");
      validStartDate = true;
    }

    if (!isOngoing && endDate === "") {
      setBadEndDate("End date is required for non-ongoing education.");
      validEndDate = false;
    } else {
      setBadEndDate("");
      validEndDate = true;
    }

    const validImageExtensions = ["png", "jpg", "jpeg"];
    const maxSize = 100 * 1024;
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if ((image || newImg) === "" && imageUrl === "") {
      setBadImage("Please upload an image or provide an image URL.");
      setBadImageUrl("Please upload an image or provide an image URL.");
      validImage = false;
      validImageUrl = false;
    } else if ((image || newImg) !== "" && imageUrl !== "") {
      setBadImage("Upload an image or enter a URL, not both.");
      setBadImageUrl("Upload an image or enter a URL, not both.");
      validImage = false;
      validImageUrl = false;
    } else {
      setBadImage("");
      setBadImageUrl("");

      if (newImg && newImg != "") {
        const fileExtension = newImg.name.split(".").pop().toLowerCase();
        if (!validImageExtensions.includes(fileExtension)) {
          setBadImage("Only JPG, JPEG, and PNG images are allowed.");
          validImage = false;
        } else if (newImg.size > maxSize) {
          setBadImage("File size must be less than or equal to 100KB.");
          validImage = false;
        }
      }

      if (imageUrl.trim() && !imageUrl.match(urlRegex)) {
        setBadImageUrl("Please enter a valid image URL.");
        validImageUrl = false;
      }
    }

    return (
      validTitle &&
      validInstitute &&
      validDegree &&
      validGrade &&
      validStartDate &&
      validEndDate &&
      validIsOngoing &&
      (validImage || validImageUrl)
    );
  };

  const stateEmpty = () => {
    setId("");
    setTitle("");
    setInstitute("");
    setDegree("");
    setGrade("");
    setStartDate("");
    setEndDate("");
    setIsOngoing(false);
    setImage("");
    setImageUrl("");
    setBadTitle("");
    setBadInstitute("");
    setBadDegree("");
    setBadGrade("");
    setBadStartDate("");
    setBadEndDate("");
    setBadIsOngoing("");
    setBadImage("");
    setNewImg("");
    setBadImageUrl("");
    setTempImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("institute", institute);
      formData.append("degree", degree);
      formData.append("grade", grade);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("isOngoing", isOngoing);
      formData.append("imageUrl", imageUrl ? imageUrl : "");

      if (image === "" && imageUrl !== "") {
        formData.append("image", "");
      }

      if (newImg && newImg != "") {
        formData.append("new_image", newImg);
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_EDUCATION}/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        toast.success(message || "Record Updated Successfully.");
        getEducation();
        stateEmpty();
        setShowUpdateEducationModal(false);
      } else {
        toast.error(message || "Failed to Update Record.");
        stateEmpty();
        setShowUpdateEducationModal(false);
      }
    } catch (error) {
      toast.error("Error: ", error);
      stateEmpty();
      setShowUpdateEducationModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setNewImg("");
    setTempImage("");
    setBadImage("");
    setBadImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showUpdateEducationModal}
        onHide={() => {
          setShowUpdateEducationModal(false);
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
              letterSpacing: "1px",
            }}
          >
            Update{" "}
            <span style={{ color: "#2C98F0" }}>
              {title != "" ? title : "Service"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div style={{ marginBottom: "20px" }} className="row">
              <div className="col-6">
                <CustomInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  title={"Title"}
                  type={"text"}
                  placeholder={"ex. school"}
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

              <div className="col-6">
                <CustomInput
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  title={"Institute"}
                  type={"text"}
                  placeholder={"ex. abc school..."}
                  name={"institute"}
                  required={true}
                  bad={badInstitute !== ""}
                />
                {badInstitute && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badInstitute}</div>
                  </div>
                )}
              </div>

              <div className="col-6">
                <CustomInput
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  title={"Degree"}
                  type={"text"}
                  placeholder={"ex. computer science"}
                  name={"degree"}
                  required={true}
                  bad={badDegree !== ""}
                />
                {badDegree && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badDegree}</div>
                  </div>
                )}
              </div>

              <div className="col-6">
                <CustomInput
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  title={"Grade"}
                  type={"text"}
                  placeholder={"ex. A-1"}
                  name={"grade"}
                  required={true}
                  bad={badGrade !== ""}
                />
                {badGrade && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badGrade}</div>
                  </div>
                )}
              </div>

              <div className="col-6">
                <CustomInput
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  title={"Start Date"}
                  type={"text"}
                  placeholder={"ex. Mar 2008"}
                  name={"startDate"}
                  required={true}
                  bad={badStartDate !== ""}
                />
                {badStartDate && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badStartDate}</div>
                  </div>
                )}
              </div>

              <div className="col-6">
                <CustomInput
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  title={"End Date"}
                  type={"text"}
                  placeholder={"ex. Mar 2018"}
                  name={"endDate"}
                  required={true}
                  bad={badEndDate !== ""}
                />
                {badEndDate && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badEndDate}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  title={"Image Url"}
                  type={"text"}
                  placeholder={"ex. project iamge url"}
                  name={"imageUrl"}
                  required={true}
                  bad={badImageUrl !== ""}
                />
                {badImageUrl && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badImageUrl}</div>
                  </div>
                )}
                {imageUrl && imageUrl != "" && (
                  <div
                    style={{
                      width: "max-content",
                      position: "relative",
                      marginTop: "15px",
                    }}
                  >
                    <img
                      style={{
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "2px",
                        border: "1px dotted #2C98F0",
                        padding: "5px",
                      }}
                      src={imageUrl}
                      alt="icon"
                    />
                    <img
                      onClick={() => {
                        setImageUrl("");
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
              </div>

              <div className="col-12">
                <input
                  style={{ borderColor: badImage != "" ? "red" : "#ccc" }}
                  type="file"
                  ref={fileInputRef}
                  onChange={(event) => {
                    setNewImg(event.target.files[0]);
                    setTempImage(URL.createObjectURL(event.target.files[0]));
                  }}
                  className={styles["file-input"]}
                  name={"new_image"}
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
                        width: "45px",
                        height: "45px",
                        objectFit: "cover",
                        borderRadius: "2px",
                        border: "1px dotted #2C98F0",
                        padding: "5px",
                      }}
                      src={`data:image/png;base64,${image}`}
                      alt="image"
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
                {tempImage && tempImage != "" && (
                  <div
                    style={{
                      width: "max-content",
                      position: "relative",
                      marginTop: "15px",
                    }}
                  >
                    <img
                      style={{
                        width: "45px",
                        height: "45px",
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

              <div className="col-12">
                <div
                  style={{
                    background: "#F2F3F7",
                    borderRadius: "2px",
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    border: "1px dotted #2C98F0",
                  }}
                  className="form-check form-switch d-flex justify-content-between align-items-center"
                >
                  <label
                    className={styles["switch-label"]}
                    htmlFor="flexSwitchCheckChecked"
                  >
                    {isOngoing ? "onGoing" : "Completed"}
                  </label>

                  <input
                    className={`form-check-input ${styles["form-check-input"]}`}
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    checked={isOngoing}
                    onChange={() => setIsOngoing(!isOngoing)}
                    style={{
                      width: "35px",
                      height: "15px",
                      backgroundColor: isOngoing ? "#2C98F0" : "#ccc",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      border: "none",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"cancel"}
            onClick={() => {
              setShowUpdateEducationModal(false);
              stateEmpty();
            }}
          />
          <BgButton
            text={"Update Education"}
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

export default UpdateEducationModal;
