import React, { useState } from "react";
import { X, Building2, Save } from "lucide-react";
import { getDepartments, buildDepartmentTree } from "../../../config/departments";
import styles from "./DepartmentModal.module.css";

/** Flatten tree for select with indentation. */
const flattenForSelect = (nodes, depth = 0) => {
  const out = [];
  nodes.forEach((n) => {
    out.push({ id: n.id, name: n.name, depth });
    if (n.children?.length) {
      out.push(...flattenForSelect(n.children, depth + 1));
    }
  });
  return out;
};

const CreateDepartmentModal = ({ parentId, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", parentId: parentId ?? "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tree = buildDepartmentTree(getDepartments());
  const parentOptions = [{ id: "", name: "— Root (no parent) —", depth: 0 }, ...flattenForSelect(tree)];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Department name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      onSubmit({
        name: formData.name.trim(),
        parentId: formData.parentId || null,
      });
    } catch (err) {
      setErrors({ submit: "Failed to create department." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["modal-icon"]}>
              <Building2 size={20} />
            </div>
            <div>
              <h2>Add department</h2>
              <p>
                {parentId
                  ? "Add a sub-department under the selected parent"
                  : "Add a root department or choose a parent"}
              </p>
            </div>
          </div>
          <button type="button" className={styles["close-btn"]} onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Parent department</label>
            <select
              name="parentId"
              value={formData.parentId}
              onChange={handleInputChange}
              className={styles["form-select"]}
              disabled={isSubmitting}
            >
              {parentOptions.map((opt) => (
                <option key={opt.id || "root"} value={opt.id}>
                  {"— ".repeat(opt.depth)}{opt.name}
                </option>
              ))}
            </select>
            <p className={styles["field-help"]}>
              Sub-departments appear under this parent in the tree.
            </p>
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Support EMEA"
              className={`${styles["form-input"]} ${errors.name ? styles["error"] : ""}`}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className={styles["error-message"]}>{errors.name}</span>
            )}
          </div>
          <div className={styles["modal-actions"]}>
            <button type="button" className={styles["cancel-btn"]} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles["submit-btn"]} disabled={isSubmitting}>
              <Save size={16} />
              Create department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDepartmentModal;
