import React from "react";
import styles from "./DashboardBox.module.css";

function DashboardBox({ title, icon, setActive, active }) {
  return (
    <div
      onClick={() => setActive(title)}
      className={`${styles["box-container"]}`}
      style={{
        border: active === title ? "1.5px solid #2C98F0" : "1px dotted #2C98F0",
        background: active === title ? "#fff" : "#EFF6FF",
      }}
    >
      <img
        style={{ width: "14px", height: "14px", marginRight: "5px" }}
        src={icon}
        alt="icon"
      />
      <p
        style={{ fontSize: "12px", letterSpacing: "2px", marginLeft: "5px" }}
        className={`mb-0 ${styles["text"]}`}
      >
        {title}
      </p>
    </div>
  );
}

export default DashboardBox;
