import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../../components/loader/Loader";
import { Modal } from "react-bootstrap";
import BorderButton from "../../../../components/BorderButton/BorderButton";
import BgButton from "../../../../components/BgButton/BgButton";

function DeleteAbouCardModal({
  showDeleteAboutCardModal,
  setShowDeleteAboutCardModal,
  item,
  getAboutCards,
}) {
  const [loading, setLoading] = useState(false);
  const [aboutCard, setAboutCard] = useState("");

  useEffect(() => {
    if (item && showDeleteAboutCardModal) {
      setAboutCard(item);
    } else {
      setAboutCard("");
    }
  }, [showDeleteAboutCardModal, item]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_ABOUT}/${aboutCard._id}`,
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
        getAboutCards();
        toast.success(message || "About card deleted successfully.");
        setAboutCard("");
        setShowDeleteAboutCardModal(false);
      } else {
        toast.error(message || "Failed to delete card.");
        setAboutCard("");
        setShowDeleteAboutCardModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete card.");
      console.log(error);
      setAboutCard("");
      setShowDeleteAboutCardModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteAboutCardModal}
        onHide={() => {
          setShowDeleteAboutCardModal(false);
          setAboutCard("");
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
            {aboutCard != "" ? (
              <span style={{ color: "#2C98F0" }}>{aboutCard.title}</span>
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
          {aboutCard != "" ? (
            <span style={{ color: "#2C98F0" }}>{aboutCard.title}</span>
          ) : (
            "this record"
          )}
          ?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowDeleteAboutCardModal(false);
              setAboutCard("");
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

export default DeleteAbouCardModal;
