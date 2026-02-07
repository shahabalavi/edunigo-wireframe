import React from "react";
import styles from "./AccessDenied.module.css";

const AccessDenied = ({ onBack, message }) => {
  return (
    <div className={styles["access-denied"]}>
      <h2>Access restricted</h2>
      <p>
        {message ||
          "This record is outside the selected scope and cannot be viewed."}
      </p>
      {onBack ? (
        <button type="button" className={styles.action} onClick={onBack}>
          Back to list
        </button>
      ) : null}
    </div>
  );
};

export default AccessDenied;
