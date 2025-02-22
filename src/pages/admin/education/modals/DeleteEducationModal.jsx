import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";
import toast from "react-hot-toast";

function DeleteEducationModal({
  showDeleteEducationModal,
  setShowDeleteEducationModal,
  item,
  getEducation,
}) {
  const [education, setEducation] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (showDeleteEducationModal) {
      setEducation(item);
    } else {
      setEducation("");
    }
  }, [showDeleteEducationModal, item]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_EDUCATION}/${education._id}`,
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
        getEducation();
        toast.success(message || "Education deleted successfully.");
        setEducation("");
        setShowDeleteEducationModal(false);
      } else {
        toast.error(message || "Failed to delete education.");
        setEducation("");
        setShowDeleteEducationModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete message.");
      setEducation("");
      setShowDeleteEducationModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteEducationModal}
        onHide={() => {
          setShowDeleteEducationModal(false);
          setEducation("");
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
            {education != "" ? (
              <span style={{ color: "#2C98F0" }}>{education.title}</span>
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
          {education != "" ? (
            <span style={{ color: "#2C98F0" }}>{education.title}</span>
          ) : (
            "this record"
          )}
          ?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowDeleteEducationModal(false);
              setEducation("");
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

export default DeleteEducationModal;
