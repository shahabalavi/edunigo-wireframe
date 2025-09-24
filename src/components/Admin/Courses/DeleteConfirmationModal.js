import React from "react";
import { AlertTriangle, X } from "lucide-react";
import styles from "./DeleteConfirmationModal.module.css";

const DeleteConfirmationModal = ({ course, onClose, onConfirm }) => {
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
          <h2 className={styles["modal-title"]}>Delete Course</h2>
          <button onClick={onClose} className={styles["close-btn"]}>
            <X size={20} />
          </button>
        </div>

        <div className={styles["modal-content"]}>
          <p className={styles["warning-text"]}>
            Are you sure you want to delete this course? This action cannot be
            undone.
          </p>

          <div className={styles["course-details"]}>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Course Name:</span>
              <span className={styles["detail-value"]}>{course.name}</span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Course Code:</span>
              <span className={styles["detail-value"]}>{course.code}</span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Education Level:</span>
              <span className={styles["detail-value"]}>
                {course.educationLevel.name}
              </span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Major:</span>
              <span className={styles["detail-value"]}>
                {course.major.name}
              </span>
            </div>
            <div className={styles["detail-item"]}>
              <span className={styles["detail-label"]}>Universities:</span>
              <span className={styles["detail-value"]}>
                {course.universities.map((uni) => uni.name).join(", ")}
              </span>
            </div>
          </div>

          <div className={styles["warning-box"]}>
            <AlertTriangle size={16} className={styles["warning-icon"]} />
            <div>
              <p className={styles["warning-title"]}>Warning</p>
              <p className={styles["warning-description"]}>
                Deleting this course will remove it from all associated
                universities and may affect existing applications or
                enrollments.
              </p>
            </div>
          </div>
        </div>

        <div className={styles["modal-actions"]}>
          <button onClick={onClose} className={styles["cancel-btn"]}>
            Cancel
          </button>
          <button onClick={handleConfirm} className={styles["delete-btn"]}>
            Delete Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
