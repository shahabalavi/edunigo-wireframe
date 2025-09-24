import React from "react";
import { X, AlertTriangle } from "lucide-react";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({
  onClose,
  onConfirm,
  itemName,
  itemType,
}) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleBackdropClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["modal-icon"]}>
            <AlertTriangle size={24} />
          </div>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className={styles["modal-content"]}>
          <h3 className={styles["modal-title"]}>Delete {itemType}</h3>
          <p className={styles["modal-message"]}>
            Are you sure you want to delete <strong>{itemName}</strong>? This
            action cannot be undone.
          </p>
        </div>

        <div className={styles["modal-actions"]}>
          <button className={styles["cancel-btn"]} onClick={onClose}>
            Cancel
          </button>
          <button className={styles["confirm-btn"]} onClick={handleConfirm}>
            Delete {itemType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
