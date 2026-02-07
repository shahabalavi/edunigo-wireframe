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
  Shield,
  ShieldCheck,
  Users,
  ChevronDown,
  X,
} from "lucide-react";
import styles from "./AdminForm.module.css";
import {
  getAdminDirectory,
  getAdminDisplayName,
  getDescendantIds,
  saveAdminDirectory,
} from "../../../config/adminHierarchy";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isSuperAdmin: false,
    status: "active",
    roles: [],
    managerId: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const adminId = Number.parseInt(id, 10);
  const directory = getAdminDirectory();
  const descendantIds = Number.isNaN(adminId)
    ? []
    : getDescendantIds(directory, adminId);
  const availableManagers = directory.filter(
    (admin) => admin.id !== adminId && !descendantIds.includes(admin.id)
  );

  // Load available roles
  useEffect(() => {
    const fetchRoles = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const sampleRoles = [
          {
            id: 1,
            name: "Admin",
            description: "Full system access with all permissions",
          },
          {
            id: 2,
            name: "Support Supervisor",
            description: "Oversee support team workload and ticket quality",
          },
          {
            id: 3,
            name: "Support Agent",
            description: "Handle assigned ticket queue and responses",
          },
          {
            id: 4,
            name: "Content Manager",
            description:
              "Manage content including universities, courses, and countries",
          },
          {
            id: 5,
            name: "Analytics Viewer",
            description: "View system analytics and reports",
          },
        ];
        setAvailableRoles(sampleRoles);
      }, 500);
    };

    fetchRoles();
  }, []);

  // Load admin data - following EditCourse pattern
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      // Sample admin data - in real app, fetch by id from API
      const sampleAdmin =
        getAdminDirectory().find((admin) => admin.id === parseInt(id)) ||
        getAdminDirectory()[0];

      if (sampleAdmin) {
        setFormData({
          firstName: sampleAdmin.firstName,
          lastName: sampleAdmin.lastName,
          email: sampleAdmin.email,
          password: "", // Don't populate password fields
          confirmPassword: "",
          isSuperAdmin: sampleAdmin.isSuperAdmin,
          status: sampleAdmin.status,
          roles: sampleAdmin.roles || [],
          managerId: sampleAdmin.managerId ? String(sampleAdmin.managerId) : "",
        });
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRoleDropdown) {
        // Use a ref or data attribute instead of CSS class selector
        const roleDropdownElement = document.querySelector(
          "[data-role-dropdown]"
        );
        if (
          roleDropdownElement &&
          !roleDropdownElement.contains(event.target)
        ) {
          setShowRoleDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRoleDropdown]);

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

  const handleRoleToggle = (role) => {
    setFormData((prev) => {
      const isSelected = prev.roles.some((r) => r.id === role.id);
      if (isSelected) {
        return {
          ...prev,
          roles: prev.roles.filter((r) => r.id !== role.id),
        };
      } else {
        return {
          ...prev,
          roles: [...prev.roles, role],
        };
      }
    });
  };

  const handleRemoveRole = (roleId) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.filter((r) => r.id !== roleId),
    }));
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

    if (formData.managerId) {
      const managerId = Number(formData.managerId);
      if (managerId === adminId) {
        newErrors.managerId = "Admin cannot report to themselves";
      } else if (descendantIds.includes(managerId)) {
        newErrors.managerId = "Manager cannot be a direct or indirect report";
      }
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
        isSuperAdmin: formData.isSuperAdmin,
        status: formData.status,
        roles: formData.roles,
      };

      // Only include password if it was changed
      if (formData.password && formData.password.length > 0) {
        submitData.password = formData.password;
      }

      const existingAdmins = getAdminDirectory();
      const updatedAdmins = existingAdmins.map((admin) =>
        admin.id === adminId
          ? {
              ...admin,
              firstName: submitData.firstName,
              lastName: submitData.lastName,
              email: submitData.email,
              isSuperAdmin: submitData.isSuperAdmin,
              status: submitData.status,
              roles: submitData.roles,
              managerId: formData.managerId ? Number(formData.managerId) : null,
            }
          : admin
      );
      saveAdminDirectory(updatedAdmins);

      // Navigate back to admins list
      navigate("/admin/admins");
    } catch (error) {
      console.error("Error updating admin:", error);
      setErrors({
        submit: "Failed to update admin. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/admins");
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading admin data...</p>
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
            <h1>Edit Admin</h1>
            <p>Update administrator information and permissions</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles["form-section"]}>
        <form onSubmit={handleSubmit} className={styles["admin-form"]}>
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
            <label className={styles["form-label"]}>
              <Users size={16} />
              Manager / Reports To
            </label>
            <select
              name="managerId"
              value={formData.managerId}
              onChange={handleInputChange}
              className={`${styles["form-select"]} ${
                errors.managerId ? styles["error"] : ""
              }`}
              disabled={isSubmitting}
            >
              <option value="">No manager (Top-level)</option>
              {availableManagers.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {getAdminDisplayName(admin)} ({admin.email})
                </option>
              ))}
            </select>
            {errors.managerId && (
              <span className={styles["error-message"]}>
                {errors.managerId}
              </span>
            )}
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

          <div className={styles["form-row"]}>
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
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["checkbox-label"]}>
                <input
                  type="checkbox"
                  name="isSuperAdmin"
                  checked={formData.isSuperAdmin}
                  onChange={handleInputChange}
                  className={styles["checkbox-input"]}
                  disabled={isSubmitting}
                />
                <span className={styles["checkbox-custom"]}>
                  {formData.isSuperAdmin ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <Shield size={16} />
                  )}
                </span>
                <span className={styles["checkbox-text"]}>
                  Super Admin (Full system access)
                </span>
              </label>
            </div>
          </div>

          {/* Role Assignment Section */}
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>
              <Users size={16} />
              Assign Roles
            </label>
            <div className={styles["role-selection-container"]}>
              {/* Selected Roles Display */}
              {formData.roles.length > 0 && (
                <div className={styles["selected-roles"]}>
                  {formData.roles.map((role) => (
                    <div key={role.id} className={styles["role-tag"]}>
                      <span>{role.name}</span>
                      <button
                        type="button"
                        className={styles["remove-role-btn"]}
                        onClick={() => handleRemoveRole(role.id)}
                        disabled={isSubmitting}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Role Dropdown */}
              <div
                className={styles["role-dropdown-container"]}
                data-role-dropdown
              >
                <button
                  type="button"
                  className={styles["role-dropdown-trigger"]}
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  disabled={isSubmitting}
                >
                  <span>Select roles...</span>
                  <ChevronDown size={16} />
                </button>

                {showRoleDropdown && (
                  <div className={styles["role-dropdown"]}>
                    {availableRoles.map((role) => {
                      const isSelected = formData.roles.some(
                        (r) => r.id === role.id
                      );
                      return (
                        <div
                          key={role.id}
                          className={`${styles["role-option"]} ${
                            isSelected ? styles["selected"] : ""
                          }`}
                          onClick={() => handleRoleToggle(role)}
                        >
                          <div className={styles["role-option-content"]}>
                            <div className={styles["role-option-name"]}>
                              {role.name}
                            </div>
                            <div className={styles["role-option-description"]}>
                              {role.description}
                            </div>
                          </div>
                          {isSelected && (
                            <div className={styles["role-option-check"]}>✓</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <p className={styles["field-help"]}>
              Select one or more roles to assign to this admin. Roles determine
              what permissions the admin will have.
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
                  Update Admin
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;
