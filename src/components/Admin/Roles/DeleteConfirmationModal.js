import React from "react";
import { AlertTriangle, X } from "lucide-react";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({
  onClose,
  onConfirm,
  itemName,
  itemType = "item",
}) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleBackdropClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["warning-icon"]}>
            <AlertTriangle size={24} />
          </div>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles["modal-content"]}>
          <h3>Delete {itemType}</h3>
          <p>
            Are you sure you want to delete the role{" "}
            <strong>"{itemName}"</strong>? This action cannot be undone and may
            affect users who have this role assigned.
          </p>
        </div>

        <div className={styles["modal-actions"]}>
          <button className={styles["cancel-btn"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["delete-btn"]} onClick={onConfirm}>
            Delete {itemType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
