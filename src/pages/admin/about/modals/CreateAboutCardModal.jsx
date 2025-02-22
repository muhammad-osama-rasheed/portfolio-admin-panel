import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import CustomInput from "../../../../components/customInput/CustomInput";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import toast from "react-hot-toast";
import styles from ".././About.module.css";
import { SketchPicker } from "react-color";

function CreateAboutCardModal({
  showCreateAboutCardModal,
  setShowCreateAboutCardModal,
  getAboutCards,
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [color, setColor] = useState("");
  const [tempImage, setTempImage] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badImage, setBadImage] = useState("");
  const [badColor, setBadColor] = useState("");

  const [loading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const fileInputRef = useRef(null);

  const stateEmpty = () => {
    setTitle("");
    setImage("");
    setColor("");
    setBadTitle("");
    setBadImage("");
    setBadColor("");
    setShowColorPicker(false);
    setTempImage("");
  };

  const handleRemoveImage = () => {
    setImage("");
    setTempImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validation = () => {
    let validTitle = true;
    let validDesc = true;
    let validImage = true;
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

    const validImageExtensions = ["png"];
    const maxSize = 100 * 1024;

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

    let colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (color === "") {
      setBadColor("Please Enter a Color.");
      validColor = false;
    } else if (color !== "" && !color.match(colorRegex)) {
      setBadColor("Please Enter a Valid Color (Hexadecimal).");
      validColor = false;
    } else {
      setBadColor("");
    }

    return validTitle && validImage && validColor;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let formData = new FormData();
      formData.append("title", title);
      formData.append("color", color);
      formData.append("image", image);

      const response = await fetch(import.meta.env.VITE_API_URL_ABOUT, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getAboutCards();
        toast.success(message || "About card added successfully.");
        stateEmpty();
        setShowCreateAboutCardModal(false);
      } else {
        toast.error(message || "Failed to add the card.");
        stateEmpty();
        setShowCreateAboutCardModal(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the card.");
      stateEmpty();
      setShowCreateAboutCardModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showCreateAboutCardModal}
        onHide={() => {
          setShowCreateAboutCardModal(false);
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
            Add About Card
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
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  title={"Color"}
                  type={"text"}
                  placeholder={"ex. #000000"}
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
                  className="mt-3"
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
                    marginBottom: showColorPicker ? "10px" : "0px",
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
              setShowCreateAboutCardModal(false);
              stateEmpty();
            }}
          />
          <BgButton
            text={"Add Card"}
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

export default CreateAboutCardModal;
