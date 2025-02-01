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
    if (id) {
      setItemId(id);
    } else {
      setItemId("");
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setShowDeleteModal(false);
      setLoading(true);
      const response = await fetch(
        `https://osamaapi.vercel.app/progress/${itemId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        getProgress();
        setLoading(false);
        toast.success("Progress Item deleted successfully.");
      } else {
        setLoading(false);
        toast.error("Error deleting the Progress Item.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Error deleting the Progress Item.");
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
            Delete Progress Item
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              color: "#666666",
            }}
          >
            Are you sure you want to delete this Progress Item?
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
