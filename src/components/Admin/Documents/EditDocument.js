import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Save,
  Plus,
  X,
  Trash2,
  GripVertical,
} from "lucide-react";
import styles from "./DocumentForm.module.css";

const EditDocument = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    autoAttach: true,
    universitySpecific: false,
    multipleRecords: false,
  });
  const [categories, setCategories] = useState([]);
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load document data and categories
  useEffect(() => {
    setTimeout(() => {
      const sampleCategories = [
        { id: 1, name: "Identity Documents" },
        { id: 2, name: "Language Certificates" },
        { id: 3, name: "Academic Records" },
        { id: 4, name: "Financial Documents" },
        { id: 5, name: "Recommendation Letters" },
      ];

      // Sample document data - in real app, fetch based on ID
      const sampleDocument = {
        id: parseInt(id),
        name: "IELTS Certificate",
        description:
          "International English Language Testing System certificate",
        category: { id: 2, name: "Language Certificates" },
        autoAttach: false,
        universitySpecific: true,
        multipleRecords: false,
        fields: [
          {
            id: 1,
            name: "Overall Score",
            type: "number",
            required: true,
            placeholder: "Enter overall IELTS score",
            validation: { min: "0", max: "9" },
          },
          {
            id: 2,
            name: "Listening Score",
            type: "number",
            required: true,
            placeholder: "Enter listening score",
            validation: { min: "0", max: "9" },
          },
          {
            id: 3,
            name: "Reading Score",
            type: "number",
            required: true,
            placeholder: "Enter reading score",
            validation: { min: "0", max: "9" },
          },
          {
            id: 4,
            name: "Writing Score",
            type: "number",
            required: true,
            placeholder: "Enter writing score",
            validation: { min: "0", max: "9" },
          },
          {
            id: 5,
            name: "Speaking Score",
            type: "number",
            required: true,
            placeholder: "Enter speaking score",
            validation: { min: "0", max: "9" },
          },
        ],
      };

      setCategories(sampleCategories);
      setFormData({
        name: sampleDocument.name,
        description: sampleDocument.description,
        categoryId: sampleDocument.category.id.toString(),
        autoAttach: sampleDocument.autoAttach,
        universitySpecific: sampleDocument.universitySpecific,
        multipleRecords: sampleDocument.multipleRecords,
      });
      setFields(sampleDocument.fields);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const addField = () => {
    const newField = {
      id: Date.now(),
      name: "",
      type: "text",
      required: false,
      placeholder: "",
      validation: {
        minLength: "",
        maxLength: "",
        min: "",
        max: "",
        pattern: "",
      },
      options: [],
    };
    setFields([...fields, newField]);
  };

  const removeField = (fieldId) => {
    setFields(fields.filter((field) => field.id !== fieldId));
  };

  const updateField = (fieldId, updates) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    );
  };

  const addOption = (fieldId) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, options: [...(field.options || []), ""] }
          : field
      )
    );
  };

  const updateOption = (fieldId, optionIndex, value) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: (field.options || []).map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : field
      )
    );
  };

  const removeOption = (fieldId, optionIndex) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: (field.options || []).filter(
                (_, idx) => idx !== optionIndex
              ),
            }
          : field
      )
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Document name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Document name must be at least 2 characters";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category selection is required";
    }

    // Validate fields
    fields.forEach((field, index) => {
      if (!field.name.trim()) {
        newErrors[`field_${index}_name`] = "Field name is required";
      }
    });

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
        id: parseInt(id),
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        categoryId: parseInt(formData.categoryId),
        autoAttach: formData.autoAttach,
        universitySpecific: formData.universitySpecific,
        multipleRecords: formData.multipleRecords,
        fields: fields.map((field) => ({
          id: field.id,
          name: field.name.trim(),
          type: field.type,
          required: field.required,
          placeholder: field.placeholder.trim() || null,
          validation: field.validation,
          options:
            field.type === "select" || field.type === "radio"
              ? (field.options || []).filter(Boolean)
              : null,
        })),
      };

      console.log("Updating document:", submitData);

      // Navigate back to documents list
      navigate("/admin/documents");
    } catch (error) {
      console.error("Error updating document:", error);
      setErrors({
        submit: "Failed to update document. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/documents");
  };

  const fieldTypes = [
    { value: "text", label: "Text" },
    { value: "textarea", label: "Textarea" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "email", label: "Email" },
    { value: "url", label: "URL" },
    { value: "file", label: "File Upload" },
    { value: "select", label: "Select (Dropdown)" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio Button" },
  ];

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading document data...</p>
      </div>
    );
  }

  return (
    <div className={styles["document-form-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <FileText size={24} />
          </div>
          <div>
            <h1>Edit Document</h1>
            <p>Update document information and fields</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles["document-form"]}>
          {/* Basic Information */}
          <div className={styles["form-section"]}>
            <h2 className={styles["section-title"]}>Basic Information</h2>

            <div className={styles["form-group"]}>
              <label htmlFor="name" className={styles["form-label"]}>
                Document Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Passport, IELTS Certificate"
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

            <div className={styles["form-group"]}>
              <label htmlFor="description" className={styles["form-label"]}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description of what this document is for..."
                rows="3"
                className={styles["form-textarea"]}
                disabled={isSubmitting}
              />
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="categoryId" className={styles["form-label"]}>
                Category *
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className={[
                  styles["form-select"],
                  errors.categoryId ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <span className={styles["error-message"]}>
                  {errors.categoryId}
                </span>
              )}
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label className={styles["checkbox-label"]}>
                  <input
                    type="checkbox"
                    name="autoAttach"
                    checked={formData.autoAttach}
                    onChange={handleInputChange}
                    disabled={isSubmitting || formData.universitySpecific}
                  />
                  <span>Auto-attach to applications</span>
                </label>
                <p className={styles["field-help"]}>
                  This document will be automatically assigned when a student
                  applies
                </p>
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["checkbox-label"]}>
                  <input
                    type="checkbox"
                    name="universitySpecific"
                    checked={formData.universitySpecific}
                    onChange={handleInputChange}
                    disabled={isSubmitting || formData.autoAttach}
                  />
                  <span>University-specific</span>
                </label>
                <p className={styles["field-help"]}>
                  This document can be linked to specific universities
                </p>
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["checkbox-label"]}>
                  <input
                    type="checkbox"
                    name="multipleRecords"
                    checked={formData.multipleRecords}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                  />
                  <span>Allow multiple records</span>
                </label>
                <p className={styles["field-help"]}>
                  Users can submit multiple instances (e.g., Education History)
                </p>
              </div>
            </div>
          </div>

          {/* Custom Fields */}
          <div className={styles["form-section"]}>
            <div className={styles["section-header"]}>
              <h2 className={styles["section-title"]}>Custom Fields</h2>
              <button
                type="button"
                onClick={addField}
                className={styles["add-field-btn"]}
                disabled={isSubmitting}
              >
                <Plus size={16} />
                Add Field
              </button>
            </div>

            {fields.length === 0 ? (
              <div className={styles["empty-fields"]}>
                <p>
                  No fields defined yet. Click "Add Field" to create custom
                  fields for this document.
                </p>
              </div>
            ) : (
              <div className={styles["fields-list"]}>
                {fields.map((field, index) => (
                  <div key={field.id} className={styles["field-card"]}>
                    <div className={styles["field-header"]}>
                      <GripVertical
                        size={16}
                        className={styles["drag-handle"]}
                      />
                      <span className={styles["field-number"]}>
                        Field {index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeField(field.id)}
                        className={styles["remove-field-btn"]}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className={styles["field-content"]}>
                      <div className={styles["field-row"]}>
                        <div className={styles["field-group"]}>
                          <label>Field Name *</label>
                          <input
                            type="text"
                            value={field.name}
                            onChange={(e) =>
                              updateField(field.id, { name: e.target.value })
                            }
                            placeholder="e.g., Overall Score, Institution Name"
                            className={[
                              styles["field-input"],
                              errors[`field_${index}_name`]
                                ? styles["error"]
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          />
                          {errors[`field_${index}_name`] && (
                            <span className={styles["error-message"]}>
                              {errors[`field_${index}_name`]}
                            </span>
                          )}
                        </div>

                        <div className={styles["field-group"]}>
                          <label>Field Type *</label>
                          <select
                            value={field.type}
                            onChange={(e) =>
                              updateField(field.id, { type: e.target.value })
                            }
                            className={styles["field-select"]}
                          >
                            {fieldTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className={styles["field-row"]}>
                        <div className={styles["field-group"]}>
                          <label>Placeholder</label>
                          <input
                            type="text"
                            value={field.placeholder || ""}
                            onChange={(e) =>
                              updateField(field.id, {
                                placeholder: e.target.value,
                              })
                            }
                            placeholder="Hint text for users"
                            className={styles["field-input"]}
                          />
                        </div>

                        <div className={styles["field-group"]}>
                          <label className={styles["checkbox-label-inline"]}>
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) =>
                                updateField(field.id, {
                                  required: e.target.checked,
                                })
                              }
                            />
                            <span>Required</span>
                          </label>
                        </div>
                      </div>

                      {/* Options for select/radio fields */}
                      {(field.type === "select" || field.type === "radio") && (
                        <div className={styles["field-options"]}>
                          <label>Options</label>
                          {(field.options || []).map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={styles["option-row"]}
                            >
                              <input
                                type="text"
                                value={option}
                                onChange={(e) =>
                                  updateOption(
                                    field.id,
                                    optIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optIndex + 1}`}
                                className={styles["option-input"]}
                              />
                              <button
                                type="button"
                                onClick={() => removeOption(field.id, optIndex)}
                                className={styles["remove-option-btn"]}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addOption(field.id)}
                            className={styles["add-option-btn"]}
                          >
                            <Plus size={14} />
                            Add Option
                          </button>
                        </div>
                      )}

                      {/* Validation rules */}
                      <div className={styles["field-validation"]}>
                        <label>Validation Rules (Optional)</label>
                        <div className={styles["validation-grid"]}>
                          {(field.type === "text" ||
                            field.type === "textarea" ||
                            field.type === "email") && (
                            <>
                              <div className={styles["validation-item"]}>
                                <label>Min Length</label>
                                <input
                                  type="number"
                                  value={field.validation?.minLength || ""}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      validation: {
                                        ...field.validation,
                                        minLength: e.target.value,
                                      },
                                    })
                                  }
                                  className={styles["validation-input"]}
                                />
                              </div>
                              <div className={styles["validation-item"]}>
                                <label>Max Length</label>
                                <input
                                  type="number"
                                  value={field.validation?.maxLength || ""}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      validation: {
                                        ...field.validation,
                                        maxLength: e.target.value,
                                      },
                                    })
                                  }
                                  className={styles["validation-input"]}
                                />
                              </div>
                            </>
                          )}

                          {field.type === "number" && (
                            <>
                              <div className={styles["validation-item"]}>
                                <label>Min Value</label>
                                <input
                                  type="number"
                                  value={field.validation?.min || ""}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      validation: {
                                        ...field.validation,
                                        min: e.target.value,
                                      },
                                    })
                                  }
                                  className={styles["validation-input"]}
                                />
                              </div>
                              <div className={styles["validation-item"]}>
                                <label>Max Value</label>
                                <input
                                  type="number"
                                  value={field.validation?.max || ""}
                                  onChange={(e) =>
                                    updateField(field.id, {
                                      validation: {
                                        ...field.validation,
                                        max: e.target.value,
                                      },
                                    })
                                  }
                                  className={styles["validation-input"]}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {errors.submit && (
            <div className={styles["submit-error"]}>{errors.submit}</div>
          )}

          <div className={styles["form-actions"]}>
            <button
              type="button"
              onClick={handleBack}
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

export default EditDocument;
