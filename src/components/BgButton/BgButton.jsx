import React from "react";
import styles from "./BgButton.module.css";

function BgButton({ text, onClick }) {
  return (
    <div onClick={() => onClick()} className={styles["button"]}>
      {text}
    </div>
  );
}

export default BgButton;
