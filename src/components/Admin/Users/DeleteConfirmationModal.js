import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import styles from "./UserModal.module.css";

const DeleteConfirmationModal = ({
  onClose,
  onConfirm,
  itemName,
  itemType = "user",
}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={`${styles["modal-container"]} ${styles["delete-modal"]}`}>
        {/* Modal Header */}
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div className={`${styles["modal-icon"]} ${styles["danger-icon"]}`}>
              <Trash2 size={20} />
            </div>
            <div>
              <h2>Delete {itemType === "user" ? "User" : "Item"}</h2>
              <p>This action cannot be undone</p>
            </div>
          </div>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div className={styles["delete-content"]}>
          <div className={styles["warning-section"]}>
            <div className={styles["warning-icon"]}>
              <AlertTriangle size={24} />
            </div>
            <div className={styles["warning-text"]}>
              <h3>Are you sure you want to delete this {itemType}?</h3>
              <p>
                You are about to delete <strong>{itemName}</strong>. This action
                will permanently remove the {itemType} from the system and
                cannot be undone.
              </p>
              <p>
                <strong>Note:</strong> Consider blocking the user instead of
                deleting if you want to prevent access while preserving their
                data.
              </p>
              <p>
                Please make sure this is what you want to do before proceeding.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className={styles["modal-actions"]}>
            <button className={styles["cancel-btn"]} onClick={onClose}>
              Cancel
            </button>
            <button
              className={`${styles["submit-btn"]} ${styles["danger-btn"]}`}
              onClick={handleConfirm}
            >
              <Trash2 size={16} />
              Delete {itemType === "user" ? "User" : "Item"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
