import React from "react";
import styles from "./BorderButton.module.css";

function BorderButton({ text, onClick }) {
  return (
    <div onClick={() => onClick()} className={styles["button"]}>
      {text}
    </div>
  );
}

export default BorderButton;
