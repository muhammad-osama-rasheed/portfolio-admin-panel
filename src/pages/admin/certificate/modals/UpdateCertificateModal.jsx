import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import CustomInput from "../../../../components/customInput/CustomInput";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import styles from ".././Certificate.module.css";
import toast from "react-hot-toast";
function UpdateCertificateModal({
  showUpdateCertificateModal,
  setShowUpdateCertificateModal,
  item,
  getCertificate,
}) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [newImg, setNewImg] = useState("");
  const [id, setId] = useState("");
  const [tempImage, setTempImage] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badCompany, setBadCompany] = useState("");
  const [badUrl, setBadUrl] = useState("");
  const [badIssueDate, setBadIssueDate] = useState("");
  const [badImage, setBadImage] = useState("");
  const [badImageUrl, setBadImageUrl] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (showUpdateCertificateModal && item) {
      setId(item._id);
      setTitle(item.title);
      setCompany(item.company);
      setUrl(item.url);
      setIssueDate(item.issue_date);
      setImage(item.image);
      setImageUrl(item.imageUrl);
    } else {
      setTitle("");
      setCompany("");
      setUrl("");
      setIssueDate("");
      setImage("");
      setImageUrl("");
    }
  }, [showUpdateCertificateModal, item]);

  const stateEmpty = () => {
    setId("");
    setTitle("");
    setCompany("");
    setUrl("");
    setIssueDate("");
    setImage("");
    setImageUrl("");
    setBadTitle("");
    setBadCompany("");
    setBadUrl("");
    setBadIssueDate("");
    setBadImage("");
    setNewImg("");
    setBadImageUrl("");
    setTempImage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const validation = () => {
    let validTitle = true;
    let validCompany = true;
    let validUrl = true;
    let validIssueDate = true;
    let validImage = true;
    let validImageUrl = true;

    if (title === "") {
      setBadTitle("Please enter a title.");
      validTitle = false;
    } else if (title.length < 2) {
      setBadTitle("Title must be at least 2 characters long.");
      validTitle = false;
    } else {
      setBadTitle("");
    }

    if (company === "") {
      setBadCompany("Please enter a company name.");
      validCompany = false;
    } else if (company.length < 2) {
      setBadCompany("Company name must be at least 2 characters long.");
      validCompany = false;
    } else {
      setBadCompany("");
    }

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (url === "") {
      setBadUrl("Please enter a URL.");
      validUrl = false;
    } else if (!url.match(urlRegex)) {
      setBadUrl("Please enter a valid URL.");
      validUrl = false;
    } else {
      setBadUrl("");
    }

    if (issueDate === "") {
      setBadIssueDate("Please enter an issue date.");
      validIssueDate = false;
    } else {
      setBadIssueDate("");
    }

    const validImageExtensions = ["png", "jpg", "jpeg"];
    const maxSize = 100 * 1024;

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
      validCompany &&
      validUrl &&
      validIssueDate &&
      (validImage || validImageUrl)
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("company", company);
      formData.append("url", url);
      formData.append("issue_date", issueDate);
      formData.append("imageUrl", imageUrl ? imageUrl : "");

      if (image === "" && imageUrl !== "") {
        formData.append("image", "");
      }

      if (newImg && newImg != "") {
        formData.append("new_image", newImg);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_CERTIFICATE}/${id}`,
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
        getCertificate();
        stateEmpty();
        setShowUpdateCertificateModal(false);
      } else {
        toast.error(message || "Failed to Update Record.");
        stateEmpty();
        setShowUpdateCertificateModal(false);
      }
    } catch (error) {
      toast.error("Error: ", error.message);
      stateEmpty();
      setShowUpdateCertificateModal(false);
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
      fileInputRef.current.value = null;
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showUpdateCertificateModal}
        onHide={() => {
          setShowUpdateCertificateModal(false);
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
              {title != "" ? title : "Certificate"}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div style={{ marginBottom: "20px" }} className="row">
              <div className="col-12">
                <CustomInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  title={"Title"}
                  type={"text"}
                  placeholder={"ex. Development"}
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
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  title={"Company"}
                  type={"text"}
                  placeholder={"ex. abc company"}
                  name={"company"}
                  required={true}
                  bad={badCompany !== ""}
                />
                {badCompany && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badCompany}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  title={"Issue Date"}
                  type={"text"}
                  placeholder={"ex. #000000"}
                  name={"issue_date"}
                  required={true}
                  bad={badIssueDate !== ""}
                />
                {badIssueDate && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badIssueDate}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  title={"URL"}
                  type={"text"}
                  placeholder={"ex. https://example.com"}
                  name={"url"}
                  required={true}
                  bad={badUrl !== ""}
                />
                {badUrl && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badUrl}</div>
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"cancel"}
            onClick={() => {
              setShowUpdateCertificateModal(false);
              stateEmpty();
            }}
          />
          <BgButton
            text={"Update Certificate"}
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

export default UpdateCertificateModal;
