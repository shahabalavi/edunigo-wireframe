import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from "lucide-react";
import styles from "./Auth.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegistered(true);
    }, 2000);
  };

  const handleVerification = () => {
    setIsVerified(true);
  };

  const handleContinue = () => {
    // Mark that user registered without completing GoCheck
    localStorage.setItem("userRegisteredWithoutGoCheck", "true");
    navigate("/login");
  };

  if (isVerified) {
    return (
      <div className={styles["auth-container"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-header"]}>
            <div
              className={[styles["auth-icon"], styles["success"]]
                .filter(Boolean)
                .join(" ")}
            >
              <CheckCircle />
            </div>
            <h1 className={styles["auth-title"]}>Registration Complete!</h1>
            <p className={styles["auth-subtitle"]}>
              Your account has been successfully created and verified. You can
              now log in to access your dashboard.
            </p>
          </div>

          <div className={styles["auth-actions"]}>
            <button
              type="button"
              className={[styles["auth-button"], styles["primary"]]
                .filter(Boolean)
                .join(" ")}
              onClick={handleContinue}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className={styles["auth-container"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-header"]}>
            <div className={styles["auth-icon"]}>
              <Mail />
            </div>
            <h1 className={styles["auth-title"]}>Check Your Email</h1>
            <p className={styles["auth-subtitle"]}>
              We've sent a verification link to{" "}
              <strong>{formData.email}</strong>
            </p>
            <p className={styles["auth-note"]}>
              Click the verification link in your email to complete your
              registration.
            </p>
          </div>

          <div className={styles["verification-section"]}>
            <div className={styles["verification-box"]}>
              <p className={styles["verification-text"]}>
                <strong>Simulation:</strong> Click the button below to simulate
                clicking the verification link in your email.
              </p>
              <button
                type="button"
                className={styles["verification-button"]}
                onClick={handleVerification}
              >
                Verify Email Address
              </button>
            </div>
          </div>

          <div className={styles["auth-footer"]}>
            <p className={styles["auth-footer-text"]}>
              Didn't receive the email?{" "}
              <button type="button" className={styles["auth-link"]}>
                Resend verification email
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-card"]}>
        <div className={styles["auth-header"]}>
          <h1 className={styles["auth-title"]}>Create your EduniGo account</h1>
          <p className={styles["auth-subtitle"]}>
            Join thousands of students finding their perfect university match
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles["auth-form"]}>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="firstName" className={styles["form-label"]}>
                First Name
              </label>
              <div className={styles["input-container"]}>
                <User className={styles["input-icon"]} />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={[
                    styles["form-input"],
                    errors.firstName ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  placeholder="Enter your first name"
                />
              </div>
              {errors.firstName && (
                <span className={styles["error-message"]}>
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="lastName" className={styles["form-label"]}>
                Last Name
              </label>
              <div className={styles["input-container"]}>
                <User className={styles["input-icon"]} />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={[
                    styles["form-input"],
                    errors.lastName ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  placeholder="Enter your last name"
                />
              </div>
              {errors.lastName && (
                <span className={styles["error-message"]}>
                  {errors.lastName}
                </span>
              )}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["form-label"]}>
              Email Address
            </label>
            <div className={styles["input-container"]}>
              <Mail className={styles["input-icon"]} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={[
                  styles["form-input"],
                  errors.email ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                placeholder="Enter your email address"
              />
            </div>
            {errors.email && (
              <span className={styles["error-message"]}>{errors.email}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles["form-label"]}>
              Password
            </label>
            <div className={styles["input-container"]}>
              <Lock className={styles["input-icon"]} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={[
                  styles["form-input"],
                  errors.password ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                placeholder="Create a password"
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <span className={styles["error-message"]}>{errors.password}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="confirmPassword" className={styles["form-label"]}>
              Confirm Password
            </label>
            <div className={styles["input-container"]}>
              <Lock className={styles["input-icon"]} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={[
                  styles["form-input"],
                  errors.confirmPassword ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles["error-message"]}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={[styles["auth-button"], styles["primary"]]
              .filter(Boolean)
              .join(" ")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className={styles["auth-footer"]}>
          <p className={styles["auth-footer-text"]}>
            Already have an account?{" "}
            <button
              type="button"
              className={styles["auth-link"]}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
          <p className={styles["auth-switch"]}>
            <button
              onClick={() => navigate("/")}
              className={styles["link-button"]}
            >
              ← Back to EduniGo
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
