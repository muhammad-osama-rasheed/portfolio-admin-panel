import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BgButton from "../../../components/BgButton/BgButton";
import BorderButton from "../../../components/BorderButton/BorderButton";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  item,
  getContact,
}) {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setContact(item);
    } else {
      setContact("");
    }
  }, [item]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_CONTACT}/${contact._id}`,
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
        getContact();
        toast.success(message || "Contact deleted successfully!");
        setShowDeleteModal(false);
        setContact("");
      } else {
        toast.error(message || "Failed to delete a contact.");
        setShowDeleteModal(false);
        setContact("");
      }
    } catch (error) {
      console.log("Error deleting contact: ", error);
      toast.error("Failed to delete a Message.");
      setShowDeleteModal(false);
      setContact("");
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
          setContact("");
        }}
        centered
        backdrop={true}
        keyboard={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              fontSize: "14px",
              color: "#000000B3",
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            Delete Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontFamily: "Quicksand, Arial, sans-serif",
            color: "#666666",
          }}
        >
          Are you sure you want to delete this Message?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"CANCEL"}
            onClick={() => {
              setShowDeleteModal(false);
              setContact("");
            }}
          />
          <BgButton
            text={"DELETE"}
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
