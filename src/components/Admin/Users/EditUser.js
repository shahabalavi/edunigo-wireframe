import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, User, Mail } from "lucide-react";
import styles from "./UserForm.module.css";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "active",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userTickets, setUserTickets] = useState([]);

  // Load user data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Sample user data - in real app, fetch by id from API
      const sampleUser = {
        id: parseInt(id),
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        status: "active",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
      };

      setFormData({
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        email: sampleUser.email,
        status: sampleUser.status,
      });
      setUserTickets([
        {
          id: 1,
          code: "TCK-2026-1042",
          subject: "Application Status Inquiry",
          status: "Open",
          priority: "Medium",
          topic: "Application Status",
          target: "Computer Science - Fall 2026",
          assignedAdmin: "Admin User",
          createdAt: "2026-02-01T10:18:00Z",
        },
        {
          id: 2,
          code: "TCK-2026-1065",
          subject: "Document Upload Issue",
          status: "In Progress",
          priority: "High",
          topic: "Document Uploads",
          target: "MBA Admission Review",
          assignedAdmin: "Olivia Grant",
          createdAt: "2026-02-02T08:40:00Z",
        },
      ]);
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

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = "First name must be less than 50 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

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
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        status: formData.status,
      };

      // Here you would make the actual API call
      console.log("Updating user:", submitData);

      // Navigate back to users list
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
      setErrors({
        submit: "Failed to update user. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/users");
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className={styles["form-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button className={styles["back-btn"]} onClick={handleBack}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <User size={24} />
          </div>
          <div>
            <h1>Edit User</h1>
            <p>Update user information and account status</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles["form-section"]}>
        <form onSubmit={handleSubmit} className={styles["user-form"]}>
          {errors.submit && (
            <div className={styles["submit-error"]}>{errors.submit}</div>
          )}

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                <User size={16} />
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`${styles["form-input"]} ${
                  errors.firstName ? styles["error"] : ""
                }`}
                placeholder="Enter first name"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className={styles["error-message"]}>
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                <User size={16} />
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`${styles["form-input"]} ${
                  errors.lastName ? styles["error"] : ""
                }`}
                placeholder="Enter last name"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className={styles["error-message"]}>
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              <Mail size={16} />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles["form-input"]} ${
                errors.email ? styles["error"] : ""
              }`}
              placeholder="Enter email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className={styles["error-message"]}>{errors.email}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Account Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles["form-select"]}
              disabled={isSubmitting}
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <p className={styles["field-help"]}>
              Set the user's account status. Active users can log in and use the
              system, while blocked users cannot access their accounts.
            </p>
          </div>

          {/* Form Actions */}
          <div className={styles["form-actions"]}>
            <button
              type="button"
              className={styles["cancel-btn"]}
              onClick={handleBack}
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
                  Updating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Update User
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className={styles["tickets-section"]}>
        <div className={styles["section-header"]}>
          <h3>User Tickets</h3>
          <p>Tickets linked to this user and assigned support admin</p>
        </div>
        {userTickets.length === 0 ? (
          <div className={styles["empty-state"]}>
            No tickets found for this user.
          </div>
        ) : (
          <div className={styles["table-container"]}>
            <table className={styles["tickets-table"]}>
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Topic</th>
                  <th>Target</th>
                  <th>Support Admin</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {userTickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>
                      <div className={styles["ticket-code"]}>
                        {ticket.code}
                      </div>
                      <div className={styles["ticket-subject"]}>
                        {ticket.subject}
                      </div>
                    </td>
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.topic}</td>
                    <td>{ticket.target}</td>
                    <td>{ticket.assignedAdmin}</td>
                    <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUser;
