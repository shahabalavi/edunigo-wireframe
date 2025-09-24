import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, AlertCircle, Paperclip, Plus, X } from "lucide-react";
import styles from "./TicketForm.module.css";

const CreateTicket = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    department: "",
    priority: "",
    description: "",
    attachments: [],
  });
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchDropdownData = async () => {
      // Simulate API call delay
      setTimeout(() => {
        setDepartments([
          { id: 1, name: "Admissions", title: "Admissions Department" },
          { id: 2, name: "Technical", title: "Technical Support" },
          { id: 3, name: "Finance", title: "Finance Department" },
        ]);

        setPriorities([
          { id: 1, name: "low", title: "Low" },
          { id: 2, name: "medium", title: "Medium" },
          { id: 3, name: "high", title: "High" },
        ]);
      }, 500);
    };

    fetchDropdownData();
  }, []);

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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(1) + " MB",
      type: file.type.split("/")[1] || "file",
    }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const removeAttachment = (attachmentId) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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

    // Simulate API call
    setTimeout(() => {
      console.log("Creating ticket:", formData);
      setLoading(false);
      navigate("/agent/tickets");
    }, 1000);
  };

  return (
    <div className={styles["form-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/agent/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Create New Ticket</h1>
            <p>Create a new support ticket for a user</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles["form"]}>
        <div className={styles["form-content"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Subject <span className={styles["required"]}>*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`${styles["form-input"]} ${
                errors.subject ? styles["error"] : ""
              }`}
              placeholder="Enter ticket subject"
            />
            {errors.subject && (
              <div className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.subject}
              </div>
            )}
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                Department <span className={styles["required"]}>*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className={`${styles["form-select"]} ${
                  errors.department ? styles["error"] : ""
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.title}
                  </option>
                ))}
              </select>
              {errors.department && (
                <div className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.department}
                </div>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                Priority <span className={styles["required"]}>*</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className={`${styles["form-select"]} ${
                  errors.priority ? styles["error"] : ""
                }`}
              >
                <option value="">Select Priority</option>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.title}
                  </option>
                ))}
              </select>
              {errors.priority && (
                <div className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.priority}
                </div>
              )}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Description / Message{" "}
              <span className={styles["required"]}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`${styles["form-textarea"]} ${
                errors.description ? styles["error"] : ""
              }`}
              placeholder="Describe the issue or request in detail..."
              rows={6}
            />
            {errors.description && (
              <div className={styles["error-message"]}>
                <AlertCircle size={16} />
                {errors.description}
              </div>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              Attachments (Optional)
            </label>
            <div className={styles["file-upload-area"]}>
              <input
                type="file"
                id="attachments"
                multiple
                onChange={handleFileChange}
                className={styles["file-input"]}
              />
              <label
                htmlFor="attachments"
                className={styles["file-upload-btn"]}
              >
                <Plus size={20} />
                <span>Click to upload files or drag and drop</span>
                <small>PDF, DOC, DOCX, JPG, PNG up to 10MB each</small>
              </label>
            </div>

            {formData.attachments.length > 0 && (
              <div className={styles["attachments-list"]}>
                {formData.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={styles["attachment-item"]}
                  >
                    <div className={styles["attachment-info"]}>
                      <Paperclip size={16} />
                      <div className={styles["attachment-details"]}>
                        <span className={styles["attachment-name"]}>
                          {attachment.name}
                        </span>
                        <span className={styles["attachment-size"]}>
                          {attachment.size}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className={styles["remove-attachment"]}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles["form-actions"]}>
          <button
            type="button"
            onClick={() => navigate("/agent/tickets")}
            className={styles["cancel-btn"]}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={styles["submit-btn"]}
          >
            {loading ? (
              "Creating..."
            ) : (
              <>
                <Save size={16} />
                Create Ticket
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
