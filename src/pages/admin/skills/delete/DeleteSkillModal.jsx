import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";
function DeleteSkillModal({
  showDeleteSkillModal,
  setShowDeleteSkillModal,
  item,
  getskills,
}) {
  const [itemId, setItemId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setItemId(item ? item._id : "");
    } else {
      setItemId("");
    }
  }, [item]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_SKILLS}/${itemId}`,
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
        getskills();
        toast.success(message || "Skill Deleted successfully.");
        setItemId("");
        setShowDeleteSkillModal(false);
      } else {
        toast.error(message || "Failed to delete a Skill.");
        setItemId("");
        setShowDeleteSkillModal(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error deleting a Skill.");
      setItemId("");
      setShowDeleteSkillModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteSkillModal}
        onHide={() => {
          setShowDeleteSkillModal(false);
          setItemId("");
        }}
        centered
        keyboard={false}
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
            Delete <span style={{ color: "#2C98F0" }}>{item.name}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              color: "#666666",
            }}
          >
            Are you sure you want to delete{" "}
            {item ? (
              <span style={{ color: "#2C98F0" }}>{item.name}</span>
            ) : (
              "this Skill"
            )}
            ?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setItemId("");
              setShowDeleteSkillModal(false);
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

export default DeleteSkillModal;
