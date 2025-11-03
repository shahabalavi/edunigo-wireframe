import React from "react";
import { AlertTriangle, X } from "lucide-react";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({ document, onClose, onConfirm }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleBackdropClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["modal-icon"]}>
            <AlertTriangle size={24} />
          </div>
          <h2 className={styles["modal-title"]}>Delete Document</h2>
          <button onClick={onClose} className={styles["close-btn"]}>
            <X size={20} />
          </button>
        </div>

        <div className={styles["modal-content"]}>
          <p className={styles["warning-text"]}>
            Are you sure you want to delete this document? This action cannot be
            undone.
          </p>

          <div className={styles["document-details"]}>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Document Name:</span>
              <span className={styles["detail-value"]}>{document.name}</span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Category:</span>
              <span className={styles["detail-value"]}>
                {document.category.name}
              </span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Fields:</span>
              <span className={styles["detail-value"]}>
                {document.fieldCount} field
                {document.fieldCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Type:</span>
              <span className={styles["detail-value"]}>
                {document.universitySpecific
                  ? "University-Specific"
                  : "General (Auto-Attached)"}
              </span>
            </div>
          </div>

          <div className={styles["warning-box"]}>
            <AlertTriangle size={16} className={styles["warning-icon"]} />
            <div>
              <p className={styles["warning-title"]}>Warning</p>
              <p className={styles["warning-description"]}>
                Deleting this document will remove it from all associated
                universities and applications. Any submitted data linked to this
                document may be affected.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["modal-actions"]}>
          <button onClick={onClose} className={styles["cancel-btn"]}>
            Cancel
          </button>
          <button onClick={handleConfirm} className={styles["delete-btn"]}>
            Delete Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
