import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";

function DeleteServiceModal({
  showDeleteServiceModal,
  setShowDeleteServiceModal,
  item,
  getService,
}) {
  const [loading, setLoading] = useState(false);

  const [service, setService] = useState("");

  useEffect(() => {
    if (item) {
      setService(item);
    } else {
      setService("");
    }
  }, [showDeleteServiceModal, item]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_SERVICES}/${service._id}`,
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
        getService();
        toast.success(message || "Service deleted successfully.");
        setService("");
        setShowDeleteServiceModal(false);
      } else {
        toast.error(message || "Failed to delete service.");
        setService("");
        setShowDeleteServiceModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete message.");
      console.log(error);
      setService("");
      setShowDeleteServiceModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteServiceModal}
        onHide={() => {
          setShowDeleteServiceModal(false);
          setService("");
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
            {service != "" ? (
              <span style={{ color: "#2C98F0" }}>{service.title}</span>
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
          {service != "" ? (
            <span style={{ color: "#2C98F0" }}>{service.title}</span>
          ) : (
            "this record"
          )}
          ?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowDeleteServiceModal(false);
              setService("");
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

export default DeleteServiceModal;
