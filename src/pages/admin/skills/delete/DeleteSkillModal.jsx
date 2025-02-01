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
      setShowDeleteSkillModal(false);
      setLoading(true);
      const response = await fetch(
        `https://osamaapi.vercel.app/skills/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        getskills();
        setLoading(false);
        toast.success("Skill Deleted successfully.");
      } else {
        setLoading(false);
        toast.error("Error deleting a Skill.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error deleting a Skill.");
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
            Are you sure you want to delete {item ? item.name : "this Skill"}?
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
