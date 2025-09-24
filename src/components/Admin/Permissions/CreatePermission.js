import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Shield, Key } from "lucide-react";
import styles from "./CreatePermission.module.css";

const CreatePermission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    category: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  const categories = [
    "Users",
    "Administration",
    "Content",
    "Reports",
    "System",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Please enter a permission name");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter a permission title");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Creating permission:", formData);
      setSaving(false);
      navigate("/admin/permissions");
    }, 2000);
  };

  return (
    <div className={styles["create-permission-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/permissions")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Shield size={24} />
          </div>
          <div>
            <h1>Create New Permission</h1>
            <p>Define a new system permission</p>
          </div>
        </div>
        <button
          className={styles["save-btn"]}
          onClick={handleSave}
          disabled={saving}
        >
          <Save size={20} />
          {saving ? "Creating..." : "Create Permission"}
        </button>
      </div>

      <div className={styles["content-layout"]}>
        {/* Permission Details Form */}
        <div className={styles["permission-details-section"]}>
          <div className={styles["section-header"]}>
            <h2>Permission Details</h2>
            <p>Basic information about the permission</p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Permission Name *
            </label>
            <div className={styles["input-with-icon"]}>
              <Key className={styles["input-icon"]} size={16} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles["form-input"]}
                placeholder="e.g., manage_users"
                required
              />
            </div>
            <p className={styles["input-help"]}>
              Use lowercase with underscores (e.g., manage_users,
              view_analytics)
            </p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="title" className={styles["form-label"]}>
              Permission Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles["form-input"]}
              placeholder="e.g., Manage Users"
              required
            />
            <p className={styles["input-help"]}>
              Human-readable name for the permission
            </p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="category" className={styles["form-label"]}>
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={styles["form-select"]}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <p className={styles["input-help"]}>
              Group permissions by functionality
            </p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles["form-textarea"]}
              placeholder="Describe what this permission allows..."
              rows={4}
            />
            <p className={styles["input-help"]}>
              Optional description of what this permission enables
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className={styles["preview-section"]}>
          <div className={styles["section-header"]}>
            <h2>Preview</h2>
            <p>How this permission will appear</p>
          </div>

          <div className={styles["permission-preview"]}>
            <div className={styles["preview-header"]}>
              <div className={styles["preview-icon"]}>
                <Key size={16} />
              </div>
              <div>
                <div className={styles["preview-name"]}>
                  {formData.name || "permission_name"}
                </div>
                <div className={styles["preview-title"]}>
                  {formData.title || "Permission Title"}
                </div>
              </div>
            </div>

            {formData.category && (
              <div className={styles["preview-category"]}>
                {formData.category}
              </div>
            )}

            {formData.description && (
              <div className={styles["preview-description"]}>
                {formData.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePermission;
