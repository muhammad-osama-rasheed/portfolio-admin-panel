import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";

function DeleteModal({ id, getProgress, showDeleteModal, setShowDeleteModal }) {
  const [itemId, setItemId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showDeleteModal && id) {
      setItemId(id);
    } else {
      setItemId("");
    }
  }, [showDeleteModal, id]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_PROGRESS_BAR}/${itemId}`,
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
        getProgress();
        setShowDeleteModal(false);
        setItemId("");
        toast.success(message || "Progress bar deleted successfully.");
      } else {
        setShowDeleteModal(false);
        setItemId("");
        toast.success(message || "Failed to delete Progress bar.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error deleting the Progress bar.");
      setShowDeleteModal(false);
      setItemId("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
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
              fontSize: "16px",
              color: "#666666",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Delete Progress bar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              color: "#666666",
            }}
          >
            Are you sure you want to delete this Progress bar?
          </span>
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setItemId("");
              setShowDeleteModal(false);
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

export default DeleteModal;
