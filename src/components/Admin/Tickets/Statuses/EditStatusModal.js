import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import styles from "./StatusModal.module.css";

const EditStatusModal = ({ status, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    color: "#3b82f6",
    display_order: 1,
    is_protected: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status) {
      setFormData({
        name: status.name,
        title: status.title,
        description: status.description || "",
        color: status.color || "#3b82f6",
        display_order: status.display_order ?? 1,
        is_protected: Boolean(status.is_protected),
      });
    }
  }, [status]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "display_order" ? Number(value) : name === "is_protected"
          ? e.target.checked
          : value,
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

    if (!formData.display_order || formData.display_order < 1) {
      newErrors.display_order = "Display order must be 1 or higher";
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

      onUpdate({ ...status, ...formData });
    } catch (error) {
      console.error("Error updating status:", error);
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
          <h3 className={styles["modal-title"]}>Edit Status</h3>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          {status?.is_protected && (
            <div className={styles["notice"]}>
              This is a protected system status. Deletion is disabled and some
              edits may be restricted by system rules.
            </div>
          )}
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
              placeholder="e.g., open, closed, pending"
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
              placeholder="e.g., Open, Closed, Pending"
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
              placeholder="Explain when this status should be used"
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
                Display Order <span className={styles["required"]}>*</span>
              </label>
              <input
                type="number"
                name="display_order"
                min="1"
                value={formData.display_order}
                onChange={handleInputChange}
                className={`${styles["form-input"]} ${
                  errors.display_order ? styles["error"] : ""
                }`}
              />
              {errors.display_order && (
                <div className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.display_order}
                </div>
              )}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["toggle-row"]}>
              <input
                type="checkbox"
                name="is_protected"
                checked={formData.is_protected}
                onChange={handleInputChange}
              />
              <span className={styles["toggle-label"]}>
                Protected system status
              </span>
            </label>
            <div className={styles["field-hint"]}>
              Protected statuses cannot be deleted.
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
                "Update Status"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStatusModal;
