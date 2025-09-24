import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  GraduationCap,
  Calendar,
  FileText,
  Plus,
  X,
} from "lucide-react";
import styles from "./CreateApplication.module.css";

const CreateApplication = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    university: "",
    program: "",
    country: "",
    intake: "",
    deadline: "",
    priority: "medium",
    notes: "",
    requirements: [
      { name: "Statement of Purpose", required: true, due: "" },
      { name: "Official Transcripts", required: true, due: "" },
      { name: "Letters of Recommendation", required: true, due: "" },
    ],
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Mock users data - in real app, fetch from API
  const users = [
    { id: 1, name: "John Smith", email: "john.smith@email.com" },
    { id: 2, name: "Sarah Johnson", email: "sarah.j@email.com" },
    { id: 3, name: "Michael Chen", email: "m.chen@email.com" },
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
  ];

  const intakes = [
    "Fall 2025",
    "Spring 2025",
    "Summer 2025",
    "Fall 2026",
    "Spring 2026",
    "Summer 2026",
  ];

  const handleBack = () => {
    navigate("/agent/applications");
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleRequirementChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req, i) =>
        i === index ? { ...req, [field]: value } : req
      ),
    }));
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [
        ...prev.requirements,
        { name: "", required: true, due: "" },
      ],
    }));
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.userId) errors.userId = "Please select a student";
    if (!formData.university) errors.university = "University name is required";
    if (!formData.program) errors.program = "Program name is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.intake) errors.intake = "Intake is required";
    if (!formData.deadline)
      errors.deadline = "Application deadline is required";

    // Validate requirements
    formData.requirements.forEach((req, index) => {
      if (!req.name.trim()) {
        errors[`requirement_${index}_name`] = "Requirement name is required";
      }
      if (req.required && !req.due) {
        errors[`requirement_${index}_due`] =
          "Due date is required for required items";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In real app, save to API
      console.log("Creating application:", formData);

      // Navigate back to applications list
      navigate("/agent/applications");
    } catch (error) {
      console.error("Error creating application:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles["page-content"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button className={styles["back-btn"]} onClick={handleBack}>
            <ArrowLeft size={16} />
            Back to Applications
          </button>
          <div className={styles["header-content"]}>
            <h1>Create New Application</h1>
            <p>Add a new application for a student</p>
          </div>
        </div>
        <button
          className={styles["btn-primary"]}
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save size={16} />
          {isSaving ? "Creating..." : "Create Application"}
        </button>
      </div>

      {/* Form Content */}
      <div className={styles["form-container"]}>
        <div className={styles["form-sections"]}>
          {/* Student Selection */}
          <div className={styles["form-section"]}>
            <div className={styles["section-header"]}>
              <User size={20} />
              <h3>Student Information</h3>
            </div>
            <div className={styles["form-group"]}>
              <label>Select Student *</label>
              <select
                value={formData.userId}
                onChange={(e) => handleInputChange("userId", e.target.value)}
                className={validationErrors.userId ? "error" : ""}
              >
                <option value="">Choose a student...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              {validationErrors.userId && (
                <span className={styles["error-message"]}>{validationErrors.userId}</span>
              )}
            </div>
          </div>

          {/* University Information */}
          <div className={styles["form-section"]}>
            <div className={styles["section-header"]}>
              <GraduationCap size={20} />
              <h3>University Information</h3>
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label>University Name *</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) =>
                    handleInputChange("university", e.target.value)
                  }
                  placeholder="e.g., Stanford University"
                  className={validationErrors.university ? "error" : ""}
                />
                {validationErrors.university && (
                  <span className={styles["error-message"]}>
                    {validationErrors.university}
                  </span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Program *</label>
                <input
                  type="text"
                  value={formData.program}
                  onChange={(e) => handleInputChange("program", e.target.value)}
                  placeholder="e.g., Master of Computer Science"
                  className={validationErrors.program ? "error" : ""}
                />
                {validationErrors.program && (
                  <span className={styles["error-message"]}>
                    {validationErrors.program}
                  </span>
                )}
              </div>
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label>Country *</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className={validationErrors.country ? "error" : ""}
                >
                  <option value="">Select country...</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {validationErrors.country && (
                  <span className={styles["error-message"]}>
                    {validationErrors.country}
                  </span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Intake *</label>
                <select
                  value={formData.intake}
                  onChange={(e) => handleInputChange("intake", e.target.value)}
                  className={validationErrors.intake ? "error" : ""}
                >
                  <option value="">Select intake...</option>
                  {intakes.map((intake) => (
                    <option key={intake} value={intake}>
                      {intake}
                    </option>
                  ))}
                </select>
                {validationErrors.intake && (
                  <span className={styles["error-message"]}>
                    {validationErrors.intake}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Application Details */}
          <div className={styles["form-section"]}>
            <div className={styles["section-header"]}>
              <Calendar size={20} />
              <h3>Application Details</h3>
            </div>
            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label>Application Deadline *</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) =>
                    handleInputChange("deadline", e.target.value)
                  }
                  className={validationErrors.deadline ? "error" : ""}
                />
                {validationErrors.deadline && (
                  <span className={styles["error-message"]}>
                    {validationErrors.deadline}
                  </span>
                )}
              </div>
              <div className={styles["form-group"]}>
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className={styles["form-group"]}>
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Add any additional notes or requirements..."
                rows={4}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className={styles["form-section"]}>
            <div className={styles["section-header"]}>
              <FileText size={20} />
              <h3>Application Requirements</h3>
            </div>
            <div className={styles["requirements-list"]}>
              {formData.requirements.map((requirement, index) => (
                <div key={index} className={styles["requirement-item"]}>
                  <div className={styles["requirement-header"]}>
                    <h4>Requirement {index + 1}</h4>
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        className={styles["remove-btn"]}
                        onClick={() => removeRequirement(index)}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className={styles["form-row"]}>
                    <div className={styles["form-group"]}>
                      <label>Requirement Name *</label>
                      <input
                        type="text"
                        value={requirement.name}
                        onChange={(e) =>
                          handleRequirementChange(index, "name", e.target.value)
                        }
                        placeholder="e.g., Statement of Purpose"
                        className={
                          validationErrors[`requirement_${index}_name`]
                            ? "error"
                            : ""
                        }
                      />
                      {validationErrors[`requirement_${index}_name`] && (
                        <span className={styles["error-message"]}>
                          {validationErrors[`requirement_${index}_name`]}
                        </span>
                      )}
                    </div>
                    <div className={styles["form-group"]}>
                      <label>Due Date</label>
                      <input
                        type="date"
                        value={requirement.due}
                        onChange={(e) =>
                          handleRequirementChange(index, "due", e.target.value)
                        }
                        className={
                          validationErrors[`requirement_${index}_due`]
                            ? "error"
                            : ""
                        }
                      />
                      {validationErrors[`requirement_${index}_due`] && (
                        <span className={styles["error-message"]}>
                          {validationErrors[`requirement_${index}_due`]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles["form-group"]}>
                    <label className={styles["checkbox-label"]}>
                      <input
                        type="checkbox"
                        checked={requirement.required}
                        onChange={(e) =>
                          handleRequirementChange(
                            index,
                            "required",
                            e.target.checked
                          )
                        }
                      />
                      <span className={styles["checkmark"]}></span>
                      Required for application
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className={styles["add-btn"]} onClick={addRequirement}>
              <Plus size={16} />
              Add Requirement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateApplication;
