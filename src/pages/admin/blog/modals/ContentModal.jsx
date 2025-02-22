import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import BgButton from "../../../../components/BgButton/BgButton";

function ContentModal({ showContentModal, setShowContentModal, item }) {
  const [blog, setBlog] = useState("");

  useEffect(() => {
    if (item) {
      setBlog(item);
    } else {
      setBlog("");
    }
  }, [showContentModal, item]);
  return (
    <Modal
      show={showContentModal}
      onHide={() => {
        setShowContentModal(false);
        setBlog("");
      }}
      centered
      backdrop="static"
      keyboard={true}
      size="lg"
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
          {blog.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundImage: "linear-gradient(45deg, #2C98F0, #6BB9F0)",
          color: "#fff",
        }}
      >
        <div className="container">
          <p
            style={{
              fontFamily: "Quicksand, Arial, sans-serif",
              fontSize: "14px",
              // color: "#000000B3",
              letterSpacing: "1px",
              fontWeight: "500",
            }}
          >
            {blog.content}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <BgButton
          text={"Close"}
          onClick={() => {
            setShowContentModal(false);
            setBlog("");
          }}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default ContentModal;
