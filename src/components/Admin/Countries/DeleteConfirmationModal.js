import React, { useState } from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import styles from "./CountryModal.module.css";

const DeleteConfirmationModal = ({ country, onClose, onConfirm }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onConfirm();
    } catch (error) {
      console.error("Error deleting country:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div
        className={[styles["modal-container"], styles["delete-modal"]].join(
          " "
        )}
      >
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div
              className={[styles["modal-icon"], styles["danger-icon"]].join(
                " "
              )}
            >
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2>Delete Country</h2>
              <p>This action cannot be undone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={styles["close-btn"]}
            disabled={isDeleting}
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles["delete-content"]}>
          <div className={styles["warning-section"]}>
            <div className={styles["warning-icon"]}>
              <AlertTriangle size={48} />
            </div>
            <div className={styles["warning-text"]}>
              <h3>Delete Country</h3>
              <p>
                Are you sure you want to delete{" "}
                <strong>"{country?.name}"</strong>? This action cannot be
                undone.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["modal-actions"]}>
          <button
            type="button"
            onClick={onClose}
            className={styles["cancel-btn"]}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={[styles["submit-btn"], styles["danger-btn"]].join(" ")}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className={styles["loading-spinner"]}></div>
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Country
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
