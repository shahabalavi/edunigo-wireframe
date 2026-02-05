import React, { useState } from "react";
import { X } from "lucide-react";
import styles from "./CategoryModal.module.css";

const CategoryModal = ({
  mode,
  initialData,
  iconOptions,
  categoryOptions,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    icon: initialData?.icon || iconOptions[0]?.value,
    parentId: initialData?.parentId ?? "",
    displayOrder: initialData?.displayOrder || 1,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "displayOrder" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      ...formData,
      displayOrder: formData.displayOrder || 1,
      parentId: formData.parentId === "" ? null : Number(formData.parentId),
    });
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleBackdropClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <h3 className={styles["modal-title"]}>
            {mode === "edit" ? "Edit Category" : "Create Category"}
          </h3>
          <button className={styles["close-btn"]} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form className={styles["modal-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Category Title <span className={styles["required"]}>*</span>
            </label>
            <input
              className={styles["form-input"]}
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Documents, Visa, Payments"
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Description</label>
            <textarea
              className={styles["form-textarea"]}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional short description for admins"
              rows={3}
            />
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Icon</label>
              <select
                className={styles["form-select"]}
                name="icon"
                value={formData.icon}
                onChange={handleChange}
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span className={styles["field-hint"]}>
                Optional icon shown in the user sidebar
              </span>
            </div>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>Display Order</label>
              <input
                className={styles["form-input"]}
                type="number"
                name="displayOrder"
                min="1"
                value={formData.displayOrder}
                onChange={handleChange}
              />
              <span className={styles["field-hint"]}>
                Lower numbers appear first
              </span>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Parent Category</label>
            <select
              className={styles["form-select"]}
              name="parentId"
              value={formData.parentId ?? ""}
              onChange={handleChange}
            >
              <option value="">No parent (top level)</option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className={styles["field-hint"]}>
              Use this to create nested sidebar sections
            </span>
          </div>

          <div className={styles["actions"]}>
            <button type="button" className={styles["cancel-btn"]} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles["submit-btn"]}>
              {mode === "edit" ? "Save Changes" : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
