import React, { useState } from "react";
import { X, BookOpen, Save } from "lucide-react";
import styles from "./EducationLevelModal.module.css";

const CreateEducationLevelModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      newErrors.name = "Education level name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Education level name must be at least 2 characters";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Education level name must be less than 100 characters";
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
      console.error("Error creating education level:", error);
      setErrors({
        submit: "Failed to create education level. Please try again.",
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

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["modal-icon"]}>
              <BookOpen size={20} />
            </div>
            <div>
              <h2>Add New Education Level</h2>
              <p>Create a new education level entry</p>
            </div>
          </div>
          <button onClick={onClose} className={styles["close-btn"]}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Education Level Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter education level name"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className={styles["loading-spinner"]}></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Education Level
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEducationLevelModal;
