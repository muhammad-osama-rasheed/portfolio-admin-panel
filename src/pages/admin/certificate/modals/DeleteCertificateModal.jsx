import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Loader from "../../../../components/loader/Loader";
import toast from "react-hot-toast";
import BgButton from "../../../../components/BgButton/BgButton";
import BorderButton from "../../../../components/BorderButton/BorderButton";

function DeleteCertificateModal({
  showDeleteCertificateModal,
  setShowDeleteCertificateModal,
  item,
  getCertificate,
}) {
  const [loading, setLoading] = useState(false);

  const [certificate, setCertificate] = useState("");

  useEffect(() => {
    if (item) {
      setCertificate(item);
    } else {
      setCertificate("");
    }
  }, [showDeleteCertificateModal, item]);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_CERTIFICATE}/${certificate._id}`,
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
        getCertificate();
        toast.success(message || "Certificate deleted successfully.");
        setCertificate("");
        setShowDeleteCertificateModal(false);
      } else {
        toast.error(message || "Failed to delete certificate.");
        setCertificate("");
        setShowDeleteCertificateModal(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete record.");
      setCertificate("");
      setShowDeleteCertificateModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showDeleteCertificateModal}
        onHide={() => {
          setShowDeleteCertificateModal(false);
          setCertificate("");
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
            {certificate != "" ? (
              <span style={{ color: "#2C98F0" }}>{certificate.title}</span>
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
          {certificate != "" ? (
            <span style={{ color: "#2C98F0" }}>{certificate.title}</span>
          ) : (
            "this record"
          )}
          ?
        </Modal.Body>
        <Modal.Footer>
          <BorderButton
            text={"Cancel"}
            onClick={() => {
              setShowDeleteCertificateModal(false);
              setCertificate("");
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

export default DeleteCertificateModal;
