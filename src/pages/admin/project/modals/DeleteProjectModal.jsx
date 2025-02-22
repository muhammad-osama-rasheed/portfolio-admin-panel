import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { Modal } from "react-bootstrap";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import toast from "react-hot-toast";

function DeleteProjectModal({
  showDeleteProjectModal,
  setShowDeleteProjectModal,
  item,
  getProjects,
}) {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState("");

  useEffect(() => {
    if (showDeleteProjectModal && item) {
      setProject(item);
    } else {
      setProject("");
    }
  }, [showDeleteProjectModal, item]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_PROJECTS}/${project._id}`,
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
        getProjects();
        toast.success(message || "Project deleted successfully.");
        setProject("");
        setShowDeleteProjectModal(false);
      } else {
        toast.error(message || "Failed to delete project.");
        setProject("");
        setShowDeleteProjectModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete message.");
      setProject("");
      setShowDeleteProjectModal(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteProjectModal}
        onHide={() => {
          setShowDeleteProjectModal(false);
          setProject("");
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
            {project != "" ? (
              <span style={{ color: "#2C98F0" }}>{project.title}</span>
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
          {project != "" ? (
            <span style={{ color: "#2C98F0" }}>{project.title}</span>
          ) : (
            "this record"
          )}
          ?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowDeleteProjectModal(false);
              setProject("");
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

export default DeleteProjectModal;
