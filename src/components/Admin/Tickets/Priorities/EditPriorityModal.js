import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import styles from "./PriorityModal.module.css";

const EditPriorityModal = ({ priority, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    color: "#f59e0b",
    priority_level: 1,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (priority) {
      setFormData({
        name: priority.name,
        title: priority.title,
        description: priority.description || "",
        color: priority.color || "#f59e0b",
        priority_level: priority.priority_level ?? 1,
      });
    }
  }, [priority]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "priority_level" ? Number(value) : value,
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

    if (!formData.priority_level || formData.priority_level < 1) {
      newErrors.priority_level = "Priority level must be 1 or higher";
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

      onUpdate({ ...priority, ...formData });
    } catch (error) {
      console.error("Error updating priority:", error);
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
          <h3 className={styles["modal-title"]}>Edit Priority</h3>
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

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles["form-textarea"]}
              placeholder="Explain when this priority should be used"
              rows={3}
            />
            <div className={styles["field-hint"]}>
              Optional guidance for agents and admins
            </div>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Color</label>
              <div className={styles["color-input-group"]}>
                <input
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className={styles["color-picker"]}
                />
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className={styles["form-input"]}
                />
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                Priority Level <span className={styles["required"]}>*</span>
              </label>
              <input
                type="number"
                name="priority_level"
                min="1"
                value={formData.priority_level}
                onChange={handleInputChange}
                className={`${styles["form-input"]} ${
                  errors.priority_level ? styles["error"] : ""
                }`}
              />
              {errors.priority_level && (
                <div className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.priority_level}
                </div>
              )}
              <div className={styles["field-hint"]}>
                Lower values typically represent higher priority
              </div>
            </div>
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
                  Updating...
                </>
              ) : (
                "Update Priority"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPriorityModal;
