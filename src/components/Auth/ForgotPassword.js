import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import styles from "./Auth.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset email sent to:", email);
    setIsEmailSent(true);
  };

  if (isEmailSent) {
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
            <h1 className={styles["auth-title"]}>Check your email</h1>
            <p className={styles["auth-subtitle"]}>
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <div className={styles["auth-footer"]}>
            <p className={styles["auth-switch"]}>
              Didn't receive the email?{" "}
              <button
                onClick={() => setIsEmailSent(false)}
                className={styles["link-button"]}
              >
                Try again
              </button>
            </p>
            <p className={styles["auth-switch"]}>
              Remember your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className={styles["link-button"]}
              >
                Sign in
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
          <h1 className={styles["auth-title"]}>Reset your EduniGo password</h1>
          <p className={styles["auth-subtitle"]}>
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles["auth-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="email" className={styles["form-label"]}>
              Email
            </label>
            <div className={styles["input-container"]}>
              <Mail className={styles["input-icon"]} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles["form-input"]}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={[styles["auth-button"], styles["primary"]]
              .filter(Boolean)
              .join(" ")}
          >
            Send reset link
          </button>
        </form>

        <div className={styles["auth-footer"]}>
          <p className={styles["auth-switch"]}>
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className={styles["link-button"]}
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

export default ForgotPassword;
