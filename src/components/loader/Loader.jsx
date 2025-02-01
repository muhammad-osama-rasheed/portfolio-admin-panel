import React from "react";
import styles from "./Loader.module.css";
import { SyncLoader } from "react-spinners";

function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <SyncLoader color="#2C98F0" loading={true} size={15} />
    </div>
  );
}

export default Loader;
