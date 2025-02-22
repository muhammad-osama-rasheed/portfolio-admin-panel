import React, { useEffect, useState } from "react";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import styles from "./../Blogs.module.css";
import CustomInput from "../../../../components/customInput/CustomInput";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";

function UpdateBlogModal({
  showUpdateBlogModal,
  setShowUpdateBlogModal,
  item,
  getBlogs,
}) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [id, setId] = useState("");

  const [badTitle, setBadTitle] = useState("");
  const [badContent, setBadContent] = useState("");
  const [badIsPublished, setBadIsPublished] = useState("");

  const status = ["Publish", "Not Publish"];

  useEffect(() => {
    if (showUpdateBlogModal && item) {
      setId(item._id);
      setTitle(item.title);
      setContent(item.content);
      setIsPublished(item.isPublished);
    } else {
      setId("");
      setTitle("");
      setContent("");
      setIsPublished(false);
    }
  }, [showUpdateBlogModal, item]);

  const stateEmpty = () => {
    setTitle("");
    setContent("");
    setIsPublished(false);
    setBadTitle("");
    setBadContent("");
    setBadIsPublished(false);
  };

  const validation = () => {
    let validTitle = true;
    let validContent = true;

    if (title === "") {
      setBadTitle("Please enter a blog title.");
      validTitle = false;
    } else if (title.length < 3) {
      setBadTitle("Title should be at least 3 characters long.");
      validTitle = false;
    } else {
      setBadTitle("");
      validTitle = true;
    }

    if (content === "") {
      setBadContent("Please enter blog content.");
      validContent = false;
    } else if (content.length < 10) {
      setBadContent("Content should be at least 10 characters long.");
      validContent = false;
    } else {
      setBadContent("");
      validContent = true;
    }

    return validTitle && validContent;
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL_BLOG}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, isPublished }),
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        toast.success(message || "Record Updated Successfully.");
        getBlogs();
        stateEmpty();
        setShowUpdateBlogModal(false);
      } else {
        toast.error(message || "Failed to Update Record.");
        stateEmpty();
        setShowUpdateBlogModal(false);
      }
    } catch (error) {
      toast.error("Error: ", error);
      stateEmpty();
      setShowUpdateBlogModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showUpdateBlogModal}
        onHide={() => {
          setShowUpdateBlogModal(false);
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
              {title != "" ? title : "Blog"}
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
                  placeholder={"ex. blog"}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  title={"Content"}
                  type={"textarea"}
                  placeholder={"ex. This is a blog..."}
                  name={"content"}
                  required={true}
                  bad={badContent !== ""}
                  rows={8}
                />
                {badContent && (
                  <div className="d-flex align-items-center">
                    <div className="me-1">
                      <img
                        src="/images/error.png"
                        alt="error-image"
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>
                    <div className={styles.errorMessage}>{badContent}</div>
                  </div>
                )}
              </div>

              <div className="col-12">
                <div className="dropdown mt-3">
                  <button
                    className={`${styles["custom-input"]} dropdown-toggle d-flex justify-content-between align-items-center`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span style={{ color: "#666666" }}>
                      {isPublished ? "Yes Publish" : "Not Publish"}
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    {status.map((item, index) => (
                      <li key={index}>
                        <div
                          className={`${styles["item"]} dropdown-item`}
                          onClick={() => setIsPublished(item === "Publish")}
                          style={{
                            color:
                              isPublished === (item === "Publish")
                                ? "#2C98F0"
                                : "#666666",
                          }}
                        >
                          {item}
                        </div>
                        {index < 1 ? <hr className="m-0" /> : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"cancel"}
            onClick={() => {
              setShowUpdateBlogModal(false);
              stateEmpty();
            }}
          />
          <BgButton
            text={"Update Blog"}
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

export default UpdateBlogModal;
