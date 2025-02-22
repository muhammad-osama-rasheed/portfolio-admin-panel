import React, { useRef, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { Modal } from "react-bootstrap";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import CustomInput from "../../../../components/customInput/CustomInput";
import styles from "./../Projects.module.css";
import toast from "react-hot-toast";

function CreateProjectModal({
  showCreateProjectModal,
  setShowCreateProjectModal,
  getProjects,
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [tempImage, setTempImage] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badDesc, setBadDesc] = useState("");
  const [badImage, setBadImage] = useState("");
  const [badImageUrl, setBadImageUrl] = useState("");
  const [badGithub, setBadGithub] = useState("");
  const [badDemo, setBadDemo] = useState("");

  const fileInputRef = useRef(null);

  const stateEmpty = () => {
    setTitle("");
    setDesc("");
    setImage("");
    setImageUrl("");
    setGithub("");
    setDemo("");
    setTempImage("");
    setBadTitle("");
    setBadDesc("");
    setBadImage("");
    setBadImageUrl("");
    setBadGithub("");
    setBadDemo("");
  };

  const validation = () => {
    let validTitle = true;
    let validDesc = true;
    let validGithub = true;
    let validDemo = true;
    let validImage = true;
    let validImageUrl = true;

    if (title.trim() === "") {
      setBadTitle("Please enter a title.");
      validTitle = false;
    } else if (title.length < 2) {
      setBadTitle("Title must be at least 2 characters long.");
      validTitle = false;
    } else {
      setBadTitle("");
    }

    if (desc.trim() === "") {
      setBadDesc("Please enter a description.");
      validDesc = false;
    } else if (desc.length < 10) {
      setBadDesc("Description must be at least 10 characters long.");
      validDesc = false;
    } else {
      setBadDesc("");
    }

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (github.trim() === "") {
      setBadGithub("Please enter a GitHub repository URL.");
      validGithub = false;
    } else if (!github.match(urlRegex)) {
      setBadGithub("Please enter a valid URL.");
      validGithub = false;
    } else {
      setBadGithub("");
    }

    if (demo.trim() === "") {
      setBadDemo("Please enter a demo URL.");
      validDemo = false;
    } else if (!demo.match(urlRegex)) {
      setBadDemo("Please enter a valid URL.");
      validDemo = false;
    } else {
      setBadDemo("");
    }

    const validImageExtensions = [
      "png",
      "jpg",
      "jpeg",
      "webp",
      "gif",
      "bmp",
      "svg",
    ];
    const maxSize = 500 * 1024;

    if (image === "" && imageUrl === "") {
      setBadImage("Please upload an image or provide an image URL.");
      setBadImageUrl("Please upload an image or provide an image URL.");
      validImage = false;
      validImageUrl = false;
    } else if (image !== "" && imageUrl !== "") {
      setBadImage("Upload an image or enter a URL, not both.");
      setBadImageUrl("Upload an image or enter a URL, not both.");
      validImage = false;
      validImageUrl = false;
    } else {
      setBadImage("");
      setBadImageUrl("");

      if (image) {
        const fileExtension = image.name.split(".").pop().toLowerCase();
        if (!validImageExtensions.includes(fileExtension)) {
          setBadImage(
            "Only PNG, JPG, JPEG, WEBP, GIF, BMP, and SVG are allowed."
          );
          validImage = false;
        } else if (image.size > maxSize) {
          setBadImage("File size must be less than or equal to 500KB.");
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
      validDesc &&
      validGithub &&
      validDemo &&
      (validImage || validImageUrl)
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("github", github);
      formData.append("demo", demo);
      formData.append("imageUrl", imageUrl !== "" ? imageUrl : "");
      formData.append("image", image !== "" ? image : "");

      const response = await fetch(import.meta.env.VITE_API_URL_PROJECTS, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getProjects();
        toast.success(message || "Project added successfully.");
        stateEmpty();
        setShowCreateProjectModal(false);
      } else {
        toast.error(message || "Failed to add project.");
        stateEmpty();
        setShowCreateProjectModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the project.");
      stateEmpty();
      setShowCreateProjectModal(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setTempImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showCreateProjectModal}
        onHide={() => {
          setShowCreateProjectModal(false);
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
            Add your Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div style={{ marginBottom: "20px" }} className="row">
              <div className="col-12">
                <CustomInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  title={"Title"}
                  type={"text"}
                  placeholder={"ex. Name your project"}
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
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  title={"Description"}
                  type={"textarea"}
                  placeholder={"ex. Briefly describe your project"}
                  name={"desc"}
                  required={true}
                  bad={badDesc !== ""}
                />
                {badDesc && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badDesc}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  title={"GitHub"}
                  type={"text"}
                  placeholder={"ex. Github repository url"}
                  name={"github"}
                  required={true}
                  bad={badGithub !== ""}
                />
                {badGithub && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badGithub}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <CustomInput
                  value={demo}
                  onChange={(e) => setDemo(e.target.value)}
                  title={"Demo"}
                  type={"text"}
                  placeholder={"ex. Demo url"}
                  name={"demo"}
                  required={true}
                  bad={badDemo !== ""}
                />
                {badDemo && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badDemo}</div>
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
                  name={"image_url"}
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
                {imageUrl != "" && imageUrl && (
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
                    setImage(event.target.files[0]);
                    setTempImage(URL.createObjectURL(event.target.files[0]));
                  }}
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
            text={"Cancel"}
            onClick={() => {
              setShowCreateProjectModal(false);
              stateEmpty();
            }}
          />
          <BgButton
            text={"Add Project"}
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

export default CreateProjectModal;
