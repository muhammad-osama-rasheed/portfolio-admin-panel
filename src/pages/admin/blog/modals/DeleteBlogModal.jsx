import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import toast from "react-hot-toast";

function DeleteBlogModal({
  showDeleteBlogModal,
  setShowDeleteBlogModal,
  item,
  getBlogs,
}) {
  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState("");

  useEffect(() => {
    if (item) {
      setBlog(item);
    } else {
      setBlog("");
    }
  }, [showDeleteBlogModal, item]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_BLOG}/${blog._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getBlogs();
        toast.success(message || "Blog deleted successfully.");
        setBlog("");
        setShowDeleteBlogModal(false);
      } else {
        toast.error(message || "Failed to delete blog.");
        setBlog("");
        setShowDeleteBlogModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete record.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteBlogModal}
        onHide={() => {
          setShowDeleteBlogModal(false);
          setBlog("");
        }}
        centered
        keyboard={true}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              fontSize: "14px",
              color: "#000000B3",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Delete{" "}
            {blog != "" ? (
              <span style={{ color: "#2C98F0" }}>{blog.title}</span>
            ) : (
              "Confirmation"
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontFamily: "Quicksand, Arial, sans-serif",
            color: "#666666",
          }}
        >
          Are you sure you want to delete{" "}
          {blog != "" ? (
            <span style={{ color: "#2C98F0" }}>{blog.title}</span>
          ) : (
            "this record"
          )}
          ?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowDeleteBlogModal(false);
              setBlog("");
            }}
          />
          <BgButton
            text={"Delete"}
            onClick={() => {
              handleDelete();
            }}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBlogModal;
