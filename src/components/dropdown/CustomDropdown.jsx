import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./CustomDropdown.module.css";

function CustomDropdown({ name, title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <motion.div
        animate={{
          opacity: isOpen ? 1 : 0,
          maxHeight: isOpen ? "200px" : "0px",
          height: isOpen ? "auto" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          border: "1px solid #e6e6e6",
          overflow: isOpen ? "auto" : "hidden",
          scrollbarWidth: isOpen ? "thin" : "none",
          scrollBehavior: "smooth",
          marginTop: "5px",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
        repudiandae error facilis, earum velit sunt vitae laudantium adipisci
        officiis omnis, similique libero eos praesentium ex alias. Sequi,
        placeat. Iusto, a?
      </motion.div>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="d-flex justify-content-between align-items-center"
        style={{
          width: "100%",
          padding: "15px 20px",
          background: isOpen ? "#2C98F0" : "#F2F3F7",
          border: "1px solid #e5e7eb",
          marginTop: "5px",
          cursor: "pointer",
        }}
      >
        <p
          style={{ color: isOpen ? "#fff" : "#333333" }}
          className={`m-0 ${styles["title"]}`}
        >
          {title}
        </p>
        <img
          src={isOpen ? "/images/minus.png" : "/images/plus.png"}
          alt="icon"
          style={{ width: "12px", height: "12px", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default CustomDropdown;
