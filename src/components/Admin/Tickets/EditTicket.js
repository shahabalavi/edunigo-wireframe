import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Paperclip,
  X,
  Ticket,
  AlertCircle,
} from "lucide-react";
import styles from "./TicketForm.module.css";

const EditTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    subject: "",
    department: "",
    status: "",
    priority: "",
    agent: "",
    assignedTo: "",
    description: "",
    attachments: [],
  });
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [agents, setAgents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState({});

  // Sample data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API call delay
      setTimeout(() => {
        // Sample dropdown data
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

        setStatuses([
          { id: 1, name: "open", title: "Open" },
          { id: 2, name: "in_progress", title: "In Progress" },
          { id: 3, name: "closed", title: "Closed" },
        ]);

        setAgents([
          { id: 1, name: "John Smith", email: "john.smith@example.com" },
          { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com" },
          { id: 3, name: "Mike Davis", email: "mike.davis@example.com" },
        ]);

        setAdmins([
          { id: 1, name: "Admin User", email: "admin@example.com" },
          { id: 2, name: "Support Manager", email: "support@example.com" },
          { id: 3, name: "Tech Lead", email: "tech@example.com" },
        ]);

        // Sample ticket data - replace with actual API call
        const sampleTicket = {
          id: parseInt(id),
          subject: "Application Status Inquiry",
          department: 1,
          status: 1,
          priority: 2,
          agent: 1,
          assignedTo: 1,
          description:
            "I would like to know the current status of my application for the Computer Science program.",
          attachments: [],
        };

        setFormData({
          subject: sampleTicket.subject,
          department: sampleTicket.department.toString(),
          status: sampleTicket.status.toString(),
          priority: sampleTicket.priority.toString(),
          agent: sampleTicket.agent.toString(),
          assignedTo: sampleTicket.assignedTo.toString(),
          description: sampleTicket.description,
          attachments: sampleTicket.attachments,
        });

        setLoadingData(false);
      }, 1000);
    };

    fetchData();
  }, [id]);

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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }));
  };

  const removeAttachment = (index) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
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

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    if (!formData.agent) {
      newErrors.agent = "Agent is required";
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

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, just navigate back to tickets list
      navigate("/admin/tickets");
    } catch (error) {
      console.error("Error updating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/tickets");
  };

  if (loadingData) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading ticket data...</p>
      </div>
    );
  }

  return (
    <div className={styles["form-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button className={styles["back-btn"]} onClick={handleCancel}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Ticket size={24} />
          </div>
          <div>
            <h1>Edit Ticket #{id}</h1>
            <p>Update ticket information and status</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={styles["ticket-form"]}>
        <div className={styles["form-section"]}>
          <h3 className={styles["section-title"]}>Ticket Information</h3>

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
                Status <span className={styles["required"]}>*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className={`${styles["form-select"]} ${
                  errors.status ? styles["error"] : ""
                }`}
              >
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.title}
                  </option>
                ))}
              </select>
              {errors.status && (
                <div className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.status}
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

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                Agent <span className={styles["required"]}>*</span>
              </label>
              <select
                name="agent"
                value={formData.agent}
                onChange={handleInputChange}
                className={`${styles["form-select"]} ${
                  errors.agent ? styles["error"] : ""
                }`}
              >
                <option value="">Select Agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
              {errors.agent && (
                <div className={styles["error-message"]}>
                  <AlertCircle size={16} />
                  {errors.agent}
                </div>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                Assign to Admin Support
              </label>
              <select
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                className={styles["form-select"]}
              >
                <option value="">Unassigned (Optional)</option>
                {admins.map((admin) => (
                  <option key={admin.id} value={admin.id}>
                    {admin.name}
                  </option>
                ))}
              </select>
              <div className={styles["field-hint"]}>
                Leave unassigned to assign later
              </div>
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
              placeholder="Describe the issue or inquiry in detail..."
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
                id="file-upload"
                multiple
                onChange={handleFileUpload}
                className={styles["file-input"]}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              />
              <label
                htmlFor="file-upload"
                className={styles["file-upload-label"]}
              >
                <Paperclip size={20} />
                <span>Click to upload files or drag and drop</span>
                <small>PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB each)</small>
              </label>
            </div>

            {formData.attachments.length > 0 && (
              <div className={styles["attachments-list"]}>
                <h4 className={styles["attachments-title"]}>Attached Files:</h4>
                {formData.attachments.map((file, index) => (
                  <div key={index} className={styles["attachment-item"]}>
                    <div className={styles["attachment-info"]}>
                      <Paperclip size={16} />
                      <span className={styles["attachment-name"]}>
                        {file.name}
                      </span>
                      <span className={styles["attachment-size"]}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      type="button"
                      className={styles["remove-attachment"]}
                      onClick={() => removeAttachment(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles["form-actions"]}>
          <button
            type="button"
            className={styles["cancel-btn"]}
            onClick={handleCancel}
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
              <>
                <Save size={16} />
                Update Ticket
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
