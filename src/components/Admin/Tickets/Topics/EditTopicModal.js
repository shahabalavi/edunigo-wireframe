import React, { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import styles from "./TopicModal.module.css";

const iconOptions = [
  { value: "Folder", label: "Folder" },
  { value: "Key", label: "Key" },
  { value: "UserX", label: "UserX" },
  { value: "CreditCard", label: "CreditCard" },
  { value: "MessageCircle", label: "MessageCircle" },
  { value: "ShieldAlert", label: "ShieldAlert" },
  { value: "Laptop", label: "Laptop" },
];

const EditTopicModal = ({ topic, topics, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    icon: "Folder",
    description: "",
    parent_id: "",
    display_order: 1,
    is_published: true,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (topic) {
      setFormData({
        title: topic.title,
        icon: topic.icon || "Folder",
        description: topic.description || "",
        parent_id: topic.parent_id ? String(topic.parent_id) : "",
        display_order: topic.display_order ?? 1,
        is_published: Boolean(topic.is_published),
      });
    }
  }, [topic]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "display_order"
          ? Number(value)
          : name === "is_published"
            ? e.target.checked
            : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onUpdate({
        ...topic,
        ...formData,
        parent_id: formData.parent_id ? Number(formData.parent_id) : null,
      });
    } catch (error) {
      console.error("Error updating topic:", error);
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
          <h3 className={styles["modal-title"]}>Edit Topic</h3>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
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
              placeholder="e.g., Payment Issues, Login Problems"
            />
            {errors.title && (
              <div className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.title}
              </div>
            )}
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Icon</label>
              <select
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                className={styles["form-select"]}
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
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
            <label className={styles["form-label"]}>Parent Topic</label>
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleInputChange}
              className={styles["form-select"]}
            >
              <option value="">No parent (top-level)</option>
              {topics.map((optionTopic) => (
                <option key={optionTopic.id} value={optionTopic.id}>
                  {optionTopic.title}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles["form-textarea"]}
              placeholder="Briefly describe the scope of this topic"
              rows={3}
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["toggle-row"]}>
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleInputChange}
              />
              <span className={styles["toggle-label"]}>
                Published and visible to users
              </span>
            </label>
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
                "Update Topic"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTopicModal;
