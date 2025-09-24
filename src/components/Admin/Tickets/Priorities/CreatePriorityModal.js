import React, { useState } from "react";
import { X, AlertCircle } from "lucide-react";
import styles from "./PriorityModal.module.css";

const CreatePriorityModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      newErrors.name = "Name is required";
    } else if (!/^[a-z_]+$/.test(formData.name)) {
      newErrors.name =
        "Name must contain only lowercase letters and underscores";
    }

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onCreate(formData);
    } catch (error) {
      console.error("Error creating priority:", error);
    } finally {
      setLoading(false);
    }
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
          <h3 className={styles["modal-title"]}>Create New Priority</h3>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Name <span className={styles["required"]}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles["form-input"]} ${
                errors.name ? styles["error"] : ""
              }`}
              placeholder="e.g., low, medium, high, urgent"
            />
            {errors.name && (
              <div className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.name}
              </div>
            )}
            <div className={styles["field-hint"]}>
              Use lowercase letters and underscores only
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Title <span className={styles["required"]}>*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`${styles["form-input"]} ${
                errors.title ? styles["error"] : ""
              }`}
              placeholder="e.g., Low, Medium, High, Urgent"
            />
            {errors.title && (
              <div className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.title}
              </div>
            )}
          </div>

          <div className={styles["modal-actions"]}>
            <button
              type="button"
              className={styles["cancel-btn"]}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles["submit-btn"]}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles["loading-spinner"]}></div>
                  Creating...
                </>
              ) : (
                "Create Priority"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePriorityModal;
