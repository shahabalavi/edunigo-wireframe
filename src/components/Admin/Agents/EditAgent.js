import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
} from "lucide-react";
import styles from "./AgentForm.module.css";

const EditAgent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "active",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load agent data
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Sample agent data - in real app, fetch by id from API
      const sampleAgent = {
        id: parseInt(id),
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@edunigo.com",
        username: "alice_j",
        status: "active",
        createdAt: "2024-01-15",
        updatedAt: "2024-01-20",
      };

      setFormData({
        firstName: sampleAgent.firstName,
        lastName: sampleAgent.lastName,
        email: sampleAgent.email,
        username: sampleAgent.username,
        password: "", // Don't populate password fields
        confirmPassword: "",
        status: sampleAgent.status,
      });
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

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (formData.username.trim().length > 30) {
      newErrors.username = "Username must be less than 30 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    // Password validation (only if password is provided)
    if (formData.password && formData.password.length > 0) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      }
    }

    // Confirm password validation (only if password is provided)
    if (formData.password && formData.password.length > 0) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
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
        username: formData.username.trim(),
        status: formData.status,
      };

      // Only include password if it was changed
      if (formData.password && formData.password.length > 0) {
        submitData.password = formData.password;
      }

      // Here you would make the actual API call
      console.log("Updating agent:", submitData);

      // Navigate back to agents list
      navigate("/admin/agents");
    } catch (error) {
      console.error("Error updating agent:", error);
      setErrors({
        submit: "Failed to update agent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/agents");
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading agent data...</p>
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
            <h1>Edit Agent</h1>
            <p>Update agent information and settings</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles["form-section"]}>
        <form onSubmit={handleSubmit} className={styles["agent-form"]}>
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

          <div className={styles["form-row"]}>
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
              <label className={styles["form-label"]}>
                <UserCheck size={16} />
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className={`${styles["form-input"]} ${
                  errors.username ? styles["error"] : ""
                }`}
                placeholder="Enter username"
                disabled={isSubmitting}
              />
              {errors.username && (
                <span className={styles["error-message"]}>
                  {errors.username}
                </span>
              )}
            </div>
          </div>

          <div className={styles["password-section"]}>
            <div className={styles["section-header"]}>
              <h3>Change Password</h3>
              <p>Leave blank to keep current password</p>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>
                  <Lock size={16} />
                  New Password
                </label>
                <div className={styles["password-input-container"]}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${styles["form-input"]} ${
                      errors.password ? styles["error"] : ""
                    }`}
                    placeholder="Enter new password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className={styles["password-toggle"]}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <span className={styles["error-message"]}>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className={styles["form-group"]}>
                <label className={styles["form-label"]}>
                  <Lock size={16} />
                  Confirm New Password
                </label>
                <div className={styles["password-input-container"]}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`${styles["form-input"]} ${
                      errors.confirmPassword ? styles["error"] : ""
                    }`}
                    placeholder="Confirm new password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    className={styles["password-toggle"]}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isSubmitting}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className={styles["error-message"]}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles["form-select"]}
              disabled={isSubmitting}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <p className={styles["field-help"]}>
              Set the agent's account status. Active agents can log in and use
              the system.
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
                  Update Agent
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAgent;
