import React, { useState } from "react";
import { User, Save } from "lucide-react";
import styles from "./ProfileCompletion.module.css";

const ProfileCompletion = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
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
      // Store profile data in localStorage
      const profileData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        completedAt: new Date().toISOString(),
      };

      localStorage.setItem("userProfile", JSON.stringify(profileData));

      // Call completion callback
      if (onComplete) {
        onComplete(profileData);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles["profile-completion"]}>
      <div className={styles["profile-completion-card"]}>
        <div className={styles["profile-completion-header"]}>
          <div className={styles["profile-icon"]}>
            <User size={24} />
          </div>
          <h2>Complete Your Profile</h2>
          <p>
            Please provide your first and last name to complete your EduniGo
            profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles["profile-completion-form"]}>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "error" : ""}
                placeholder="Enter your first name"
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className={styles["error-message"]}>{errors.firstName}</span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "error" : ""}
                placeholder="Enter your last name"
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className={styles["error-message"]}>{errors.lastName}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className={styles["submit-button"]}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className={styles["spinner"]}></div>
                Completing Profile...
              </>
            ) : (
              <>
                <Save size={16} />
                Complete Profile
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletion;
