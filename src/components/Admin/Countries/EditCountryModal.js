import React, { useState, useEffect } from "react";
import { X, Globe, Save } from "lucide-react";
import styles from "./CountryModal.module.css";

const EditCountryModal = ({ country, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneCode: "",
    iso: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (country) {
      setFormData({
        name: country.name || "",
        phoneCode: country.phoneCode || "",
        iso: country.iso || "",
      });
    }
  }, [country]);

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

    if (!formData.name.trim()) {
      newErrors.name = "Country name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Country name must be at least 2 characters";
    }

    if (!formData.phoneCode.trim()) {
      newErrors.phoneCode = "Phone code is required";
    } else if (!/^\+[1-9]\d{0,3}$/.test(formData.phoneCode.trim())) {
      newErrors.phoneCode =
        "Phone code must start with + followed by digits (e.g., +98)";
    }

    if (!formData.iso.trim()) {
      newErrors.iso = "ISO code is required";
    } else if (formData.iso.trim().length !== 3) {
      newErrors.iso = "ISO code must be exactly 3 characters";
    } else if (!/^[A-Z]{3}$/.test(formData.iso.trim().toUpperCase())) {
      newErrors.iso = "ISO code must contain only uppercase letters";
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
        name: formData.name.trim(),
        phoneCode: formData.phoneCode.trim(),
        iso: formData.iso.trim().toUpperCase(),
      };

      onSubmit(submitData);
    } catch (error) {
      console.error("Error updating country:", error);
      setErrors({ submit: "Failed to update country. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const hasChanges = () => {
    if (!country) return false;
    return (
      formData.name !== country.name ||
      formData.phoneCode !== country.phoneCode ||
      formData.iso !== country.iso
    );
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["modal-icon"]}>
              <Globe size={20} />
            </div>
            <div>
              <h2>Edit Country</h2>
              <p>Update country information and codes</p>
            </div>
          </div>
          <button onClick={onClose} className={styles["close-btn"]}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Country Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter country name"
              className={[
                styles["form-input"],
                errors.name ? styles["error"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className={styles["error-message"]}>{errors.name}</span>
            )}
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="phoneCode" className={styles["form-label"]}>
                Phone Code *
              </label>
              <input
                type="text"
                id="phoneCode"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleInputChange}
                placeholder="+98"
                maxLength="5"
                className={[
                  styles["form-input"],
                  errors.phoneCode ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
              {errors.phoneCode && (
                <span className={styles["error-message"]}>
                  {errors.phoneCode}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="iso" className={styles["form-label"]}>
                ISO Code *
              </label>
              <input
                type="text"
                id="iso"
                name="iso"
                value={formData.iso}
                onChange={handleInputChange}
                placeholder="USA"
                maxLength="3"
                className={[
                  styles["form-input"],
                  errors.iso ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
              {errors.iso && (
                <span className={styles["error-message"]}>{errors.iso}</span>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className={styles["submit-error"]}>{errors.submit}</div>
          )}

          <div className={styles["modal-actions"]}>
            <button
              type="button"
              onClick={onClose}
              className={styles["cancel-btn"]}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles["submit-btn"]}
              disabled={isSubmitting || !hasChanges()}
            >
              {isSubmitting ? (
                <>
                  <div className={styles["loading-spinner"]}></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCountryModal;
