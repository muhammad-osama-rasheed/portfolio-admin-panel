import React, { useState } from "react";
import CustomInput from "../../../../components/customInput/CustomInput";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import styles from "./../Blogs.module.css";
import toast from "react-hot-toast";
function CreateBlogModal({
  showCreateBlogModal,
  setShowCreateBlogModal,
  getBlogs,
}) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const [badTitle, setBadTitle] = useState("");
  const [badContent, setBadContent] = useState("");
  const [badIsPublished, setBadIsPublished] = useState("");

  const status = ["Publish", "Not Publish"];

  const stateEmpty = () => {
    setTitle("");
    setContent("");
    setIsPublished(false);
    setBadTitle("");
    setBadContent("");
    setBadIsPublished(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(import.meta.env.VITE_API_URL_BLOG, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify({ title, content, isPublished }),
      });

      const result = await response.json();

      const { success, message } = result;

      if (success) {
        getBlogs();
        toast.success(message || "Blogs published successfully.");
        stateEmpty();
        setShowCreateBlogModal(false);
      } else {
        toast.error(message || "Blog not published.");
        stateEmpty();
        setShowCreateBlogModal(false);
      }
    } catch (error) {
      console.log("Error submitting skill: ", error);
      toast.error("Failed to add blog.");
      stateEmpty();
      setShowCreateBlogModal(false);
    } finally {
      setLoading(false);
    }
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

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showCreateBlogModal}
        onHide={() => {
          setShowCreateBlogModal(false);
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
            Add your Blog
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
            text={"Cancel"}
            onClick={() => {
              setShowCreateBlogModal(false);
              stateEmpty();
            }}
          />
          <BgButton
            text={"Add Blog"}
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

export default CreateBlogModal;
