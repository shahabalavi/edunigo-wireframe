import React, { useState, useEffect } from "react";
import { X, MapPin, Save } from "lucide-react";
import styles from "./CityModal.module.css";

const EditCityModal = ({ city, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    countryId: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);

  // Fetch countries for dropdown - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleCountries = [
        { id: 1, name: "United States" },
        { id: 2, name: "United Kingdom" },
        { id: 3, name: "Canada" },
        { id: 4, name: "Australia" },
        { id: 5, name: "Germany" },
        { id: 6, name: "France" },
        { id: 7, name: "Japan" },
        { id: 8, name: "South Korea" },
        { id: 9, name: "Iran" },
      ];
      setCountries(sampleCountries);
    }, 500);
  }, []);

  useEffect(() => {
    if (city) {
      setFormData({
        name: city.name || "",
        countryId: city.country?.id?.toString() || "",
      });
    }
  }, [city]);

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
      newErrors.name = "City name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "City name must be at least 2 characters";
    }

    if (!formData.countryId) {
      newErrors.countryId = "Please select a country";
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

      const selectedCountry = countries.find(
        (country) => country.id === parseInt(formData.countryId)
      );

      const submitData = {
        name: formData.name.trim(),
        country: selectedCountry,
      };

      onSubmit(submitData);
    } catch (error) {
      console.error("Error updating city:", error);
      setErrors({ submit: "Failed to update city. Please try again." });
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
    if (!city) return false;
    return (
      formData.name !== city.name ||
      formData.countryId !== city.country?.id?.toString()
    );
  };

  return (
    <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
      <div className={styles["modal-container"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["modal-icon"]}>
              <MapPin size={20} />
            </div>
            <div>
              <h2>Edit City</h2>
              <p>Update city information and country relationship</p>
            </div>
          </div>
          <button onClick={onClose} className={styles["close-btn"]}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles["modal-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              City Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter city name"
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

          <div className={styles["form-group"]}>
            <label htmlFor="countryId" className={styles["form-label"]}>
              Country *
            </label>
            <select
              id="countryId"
              name="countryId"
              value={formData.countryId}
              onChange={handleInputChange}
              className={[
                styles["form-input"],
                errors.countryId ? styles["error"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isSubmitting}
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.countryId && (
              <span className={styles["error-message"]}>
                {errors.countryId}
              </span>
            )}
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

export default EditCityModal;
