import React, { useState, useEffect } from "react";
import { X, GraduationCap, Save } from "lucide-react";
import styles from "./MajorModal.module.css";

const EditMajorModal = ({ major, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (major) {
      setFormData({
        name: major.name || "",
      });
    }
  }, [major]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Major/Field name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Major/Field name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Major/Field name must be less than 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const submitData = {
        name: formData.name.trim(),
      };

      onSubmit(submitData);
    } catch (error) {
      console.error("Error updating major/field:", error);
      setErrors({
        submit: "Failed to update major/field. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const hasChanges = () => {
    if (!major) return false;
    return formData.name !== major.name;
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["modal-icon"]}>
              <GraduationCap size={20} />
            </div>
            <div>
              <h2>Edit Major/Field</h2>
              <p>Update major/field information</p>
            </div>
          </div>
          <button onClick={onClose} className={styles["close-btn"]}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Major/Field Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter major/field name"
              className={[
                styles["form-input"],
                errors.name ? styles["error"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className={styles["error-message"]}>{errors.name}</span>
            )}
          </div>

          {errors.submit && (
            <div className={styles["submit-error"]}>{errors.submit}</div>
          )}

          <div className={styles["modal-actions"]}>
            <button
              type="button"
              onClick={onClose}
              className={styles["cancel-btn"]}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles["submit-btn"]}
              disabled={isSubmitting || !hasChanges()}
            >
              {isSubmitting ? (
                <>
                  <div className={styles["loading-spinner"]}></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMajorModal;
