import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Camera,
  Shield,
  ShieldCheck,
} from "lucide-react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: null,
    isSuperAdmin: false,
    status: "active",
    roles: [],
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(true);

  // Load current admin profile data
  useEffect(() => {
    const fetchProfile = async () => {
      // Simulate API call delay
      setTimeout(() => {
        // Sample profile data - in real app, fetch current admin's data
        const sampleProfile = {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@edunigo.com",
          avatar: null,
          isSuperAdmin: true,
          status: "active",
          roles: [
            {
              id: 1,
              name: "Super Admin",
              description: "Full system access with all permissions",
            },
            {
              id: 2,
              name: "Content Manager",
              description:
                "Manage content including universities, courses, and countries",
            },
          ],
          createdAt: "2024-01-15",
        };

        setFormData({
          firstName: sampleProfile.firstName,
          lastName: sampleProfile.lastName,
          email: sampleProfile.email,
          avatar: sampleProfile.avatar,
          isSuperAdmin: sampleProfile.isSuperAdmin,
          status: sampleProfile.status,
          roles: sampleProfile.roles,
        });
        setLoading(false);
      }, 1000);
    };

    fetchProfile();
  }, []);

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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          avatar: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateProfileForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Email is read-only, no validation needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    // Current password validation
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    // New password validation
    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)
    ) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if new password is different from current
    if (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.currentPassword === passwordData.newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const submitData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        avatar: formData.avatar,
      };

      // Here you would make the actual API call
      console.log("Updating profile:", submitData);

      // Show success message
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors({
        submit: "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    setIsPasswordSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const submitData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      };

      // Here you would make the actual API call
      console.log("Changing password:", submitData);

      // Clear password form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Show success message
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordErrors({
        submit:
          "Failed to change password. Please check your current password and try again.",
      });
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAdminRole = (isSuperAdmin) => {
    return isSuperAdmin ? (
      <span className={`${styles["role-badge"]} ${styles["role-super"]}`}>
        <ShieldCheck size={12} />
        Super Admin
      </span>
    ) : (
      <span className={`${styles["role-badge"]} ${styles["role-admin"]}`}>
        <Shield size={12} />
        Admin
      </span>
    );
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className={styles["profile-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <User size={24} />
          </div>
          <div>
            <h1>My Profile</h1>
            <p>Manage your account information and security settings</p>
          </div>
        </div>
      </div>

      <div className={styles["profile-content"]}>
        {/* Profile Information Section */}
        <div className={styles["profile-section"]}>
          <div className={styles["section-header"]}>
            <h2>Profile Information</h2>
            <p>Update your personal details and profile picture</p>
          </div>

          <form
            onSubmit={handleProfileSubmit}
            className={styles["profile-form"]}
          >
            {errors.submit && (
              <div className={styles["submit-error"]}>{errors.submit}</div>
            )}

            {/* Avatar Section */}
            <div className={styles["avatar-section"]}>
              <div className={styles["avatar-container"]}>
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className={styles["avatar-image"]}
                  />
                ) : (
                  <div className={styles["avatar-placeholder"]}>
                    {getInitials(formData.firstName, formData.lastName)}
                  </div>
                )}
                <label className={styles["avatar-upload-btn"]}>
                  <Camera size={16} />
                  Change Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className={styles["avatar-input"]}
                  />
                </label>
              </div>
            </div>

            {/* Basic Information */}
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

            {/* Read-only Information */}
            <div className={styles["readonly-section"]}>
              <h3>Account Information</h3>
              <div className={styles["readonly-fields"]}>
                <div className={styles["readonly-field"]}>
                  <label>Email Address</label>
                  <div className={styles["email-display"]}>
                    <Mail size={16} />
                    {formData.email}
                  </div>
                </div>
                <div className={styles["readonly-field"]}>
                  <label>Account Type</label>
                  <div>{getAdminRole(formData.isSuperAdmin)}</div>
                </div>
                <div className={styles["readonly-field"]}>
                  <label>Status</label>
                  <div className={styles["status-badge"]}>
                    {formData.status === "active" ? "Active" : "Inactive"}
                  </div>
                </div>
                <div className={styles["readonly-field"]}>
                  <label>Assigned Roles</label>
                  <div className={styles["roles-display"]}>
                    {formData.roles.length > 0 ? (
                      formData.roles.map((role) => (
                        <span key={role.id} className={styles["role-tag"]}>
                          {role.name}
                        </span>
                      ))
                    ) : (
                      <span className={styles["no-roles"]}>
                        No roles assigned
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className={styles["form-actions"]}>
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
                    Update Profile
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className={styles["password-section"]}>
          <div className={styles["section-header"]}>
            <h2>Change Password</h2>
            <p>Update your password to keep your account secure</p>
          </div>

          <form
            onSubmit={handlePasswordSubmit}
            className={styles["password-form"]}
          >
            {passwordErrors.submit && (
              <div className={styles["submit-error"]}>
                {passwordErrors.submit}
              </div>
            )}

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                <Lock size={16} />
                Current Password *
              </label>
              <div className={styles["password-input-container"]}>
                <input
                  type={showPasswords.current ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className={`${styles["form-input"]} ${
                    passwordErrors.currentPassword ? styles["error"] : ""
                  }`}
                  placeholder="Enter current password"
                  disabled={isPasswordSubmitting}
                />
                <button
                  type="button"
                  className={styles["password-toggle"]}
                  onClick={() => togglePasswordVisibility("current")}
                  disabled={isPasswordSubmitting}
                >
                  {showPasswords.current ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <span className={styles["error-message"]}>
                  {passwordErrors.currentPassword}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                <Lock size={16} />
                New Password *
              </label>
              <div className={styles["password-input-container"]}>
                <input
                  type={showPasswords.new ? "text" : "password"}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`${styles["form-input"]} ${
                    passwordErrors.newPassword ? styles["error"] : ""
                  }`}
                  placeholder="Enter new password"
                  disabled={isPasswordSubmitting}
                />
                <button
                  type="button"
                  className={styles["password-toggle"]}
                  onClick={() => togglePasswordVisibility("new")}
                  disabled={isPasswordSubmitting}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <span className={styles["error-message"]}>
                  {passwordErrors.newPassword}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label className={styles["form-label"]}>
                <Lock size={16} />
                Confirm New Password *
              </label>
              <div className={styles["password-input-container"]}>
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`${styles["form-input"]} ${
                    passwordErrors.confirmPassword ? styles["error"] : ""
                  }`}
                  placeholder="Confirm new password"
                  disabled={isPasswordSubmitting}
                />
                <button
                  type="button"
                  className={styles["password-toggle"]}
                  onClick={() => togglePasswordVisibility("confirm")}
                  disabled={isPasswordSubmitting}
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <span className={styles["error-message"]}>
                  {passwordErrors.confirmPassword}
                </span>
              )}
            </div>

            {/* Form Actions */}
            <div className={styles["form-actions"]}>
              <button
                type="submit"
                className={styles["submit-btn"]}
                disabled={isPasswordSubmitting}
              >
                {isPasswordSubmitting ? (
                  <>
                    <div className={styles["loading-spinner"]}></div>
                    Changing Password...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
