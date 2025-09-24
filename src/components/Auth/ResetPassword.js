import React, { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import styles from "./Auth.module.css";

const ResetPassword = ({ onSwitchToLogin, onResetPassword }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onResetPassword(formData);
    setIsPasswordReset(true);
  };

  if (isPasswordReset) {
    return (
      <div className={styles["auth-container"]}>
        <div className={styles["auth-card"]}>
          <div className={styles["auth-header"]}>
            <div className={styles["success-icon"]}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#0037FF"
                  strokeWidth="2"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="#0037FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className={styles["auth-title"]}>Password reset successful</h1>
            <p className={styles["auth-subtitle"]}>
              Your password has been updated successfully. You can now sign in
              with your new password.
            </p>
          </div>

          <div className={styles["auth-footer"]}>
            <button
              onClick={onSwitchToLogin}
              className={[styles["auth-button"], styles["primary"]]
                .filter(Boolean)
                .join(" ")}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-card"]}>
        <div className={styles["auth-header"]}>
          <h1 className={styles["auth-title"]}>Reset password</h1>
          <p className={styles["auth-subtitle"]}>
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles["auth-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="password" className={styles["form-label"]}>
              New password
            </label>
            <div className={styles["input-container"]}>
              <Lock className={styles["input-icon"]} />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="confirmPassword" className={styles["form-label"]}>
              Confirm new password
            </label>
            <div className={styles["input-container"]}>
              <Lock className={styles["input-icon"]} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles["form-input"]}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                className={styles["password-toggle"]}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={[styles["auth-button"], styles["primary"]]
              .filter(Boolean)
              .join(" ")}
          >
            Reset password
          </button>
        </form>

        <div className={styles["auth-footer"]}>
          <p className={styles["auth-switch"]}>
            Remember your password?{" "}
            <button onClick={onSwitchToLogin} className={styles["link-button"]}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
