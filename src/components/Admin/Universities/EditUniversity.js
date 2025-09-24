import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, Save, Globe, Link, MapPin } from "lucide-react";
import styles from "./UniversityForm.module.css";

const EditUniversity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    countryId: "",
    cityId: "",
  });
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load countries and university data
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      const sampleCountries = [
        {
          id: 1,
          name: "United States",
          phoneCode: "+1",
          iso: "USA",
        },
        {
          id: 2,
          name: "United Kingdom",
          phoneCode: "+44",
          iso: "GBR",
        },
        {
          id: 3,
          name: "Canada",
          phoneCode: "+1",
          iso: "CAN",
        },
        {
          id: 4,
          name: "Australia",
          phoneCode: "+61",
          iso: "AUS",
        },
        {
          id: 5,
          name: "Germany",
          phoneCode: "+49",
          iso: "DEU",
        },
        {
          id: 6,
          name: "France",
          phoneCode: "+33",
          iso: "FRA",
        },
        {
          id: 7,
          name: "Japan",
          phoneCode: "+81",
          iso: "JPN",
        },
        {
          id: 8,
          name: "South Korea",
          phoneCode: "+82",
          iso: "KOR",
        },
        {
          id: 9,
          name: "Iran",
          phoneCode: "+98",
          iso: "IRN",
        },
      ];

      // Sample university data (in real app, this would come from API based on ID)
      const sampleUniversity = {
        id: parseInt(id),
        name: "Harvard University",
        logo: "https://via.placeholder.com/40x40/0037ff/ffffff?text=H",
        website: "https://harvard.edu",
        country: {
          id: 1,
          name: "United States",
          phoneCode: "+1",
          iso: "USA",
        },
        city: {
          id: 1,
          name: "New York",
          countryId: 1,
        },
        createdAt: "2024-01-15",
      };

      setCountries(sampleCountries);
      setFormData({
        name: sampleUniversity.name,
        logo: sampleUniversity.logo,
        website: sampleUniversity.website,
        countryId: sampleUniversity.country.id.toString(),
        cityId: sampleUniversity.city.id.toString(),
      });

      // Load cities for the selected country
      loadCitiesForCountry(sampleUniversity.country.id.toString());
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If country changes, reset city and load new cities
    if (name === "countryId") {
      setFormData((prev) => ({
        ...prev,
        cityId: "", // Reset city selection
      }));
      loadCitiesForCountry(value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Load cities for selected country
  const loadCitiesForCountry = (countryId) => {
    if (!countryId) {
      setCities([]);
      return;
    }

    // Simulate API call to get cities for the country
    setTimeout(() => {
      const sampleCities = [
        { id: 1, name: "New York", countryId: 1 },
        { id: 2, name: "Los Angeles", countryId: 1 },
        { id: 3, name: "Chicago", countryId: 1 },
        { id: 4, name: "London", countryId: 2 },
        { id: 5, name: "Manchester", countryId: 2 },
        { id: 6, name: "Birmingham", countryId: 2 },
        { id: 7, name: "Toronto", countryId: 3 },
        { id: 8, name: "Vancouver", countryId: 3 },
        { id: 9, name: "Montreal", countryId: 3 },
        { id: 10, name: "Sydney", countryId: 4 },
        { id: 11, name: "Melbourne", countryId: 4 },
        { id: 12, name: "Perth", countryId: 4 },
        { id: 13, name: "Berlin", countryId: 5 },
        { id: 14, name: "Munich", countryId: 5 },
        { id: 15, name: "Hamburg", countryId: 5 },
        { id: 16, name: "Paris", countryId: 6 },
        { id: 17, name: "Lyon", countryId: 6 },
        { id: 18, name: "Marseille", countryId: 6 },
        { id: 19, name: "Tokyo", countryId: 7 },
        { id: 20, name: "Osaka", countryId: 7 },
        { id: 21, name: "Kyoto", countryId: 7 },
        { id: 22, name: "Seoul", countryId: 8 },
        { id: 23, name: "Busan", countryId: 8 },
        { id: 24, name: "Incheon", countryId: 8 },
        { id: 25, name: "Tehran", countryId: 9 },
        { id: 26, name: "Mashhad", countryId: 9 },
        { id: 27, name: "Isfahan", countryId: 9 },
      ];

      const filteredCities = sampleCities.filter(
        (city) => city.countryId === parseInt(countryId)
      );
      setCities(filteredCities);
    }, 500);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "University name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "University name must be at least 2 characters";
    } else if (formData.name.trim().length > 200) {
      newErrors.name = "University name must be less than 200 characters";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.website.trim())) {
      newErrors.website =
        "Website must be a valid URL starting with http:// or https://";
    }

    if (!formData.countryId) {
      newErrors.countryId = "Country selection is required";
    }

    if (!formData.cityId) {
      newErrors.cityId = "City selection is required";
    }

    // Logo is optional, but if provided, should be a valid URL
    if (formData.logo.trim() && !/^https?:\/\/.+/.test(formData.logo.trim())) {
      newErrors.logo =
        "Logo must be a valid URL starting with http:// or https://";
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
        logo: formData.logo.trim() || null,
        website: formData.website.trim(),
        countryId: parseInt(formData.countryId),
        cityId: parseInt(formData.cityId),
      };

      console.log("Updating university:", submitData);

      // Navigate back to universities list
      navigate("/admin/universities");
    } catch (error) {
      console.error("Error updating university:", error);
      setErrors({
        submit: "Failed to update university. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/universities");
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading university data...</p>
      </div>
    );
  }

  return (
    <div className={styles["university-form-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <Building2 size={24} />
          </div>
          <div>
            <h1>Edit University</h1>
            <p>Update university information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles["university-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              University Name *
            </label>
            <div className={styles["input-container"]}>
              <Building2 size={18} className={styles["input-icon"]} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter university name"
                className={[
                  styles["form-input"],
                  errors.name ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <span className={styles["error-message"]}>{errors.name}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="logo" className={styles["form-label"]}>
              Logo URL
            </label>
            <div className={styles["input-container"]}>
              <Building2 size={18} className={styles["input-icon"]} />
              <input
                type="url"
                id="logo"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
                className={[
                  styles["form-input"],
                  errors.logo ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
            </div>
            {errors.logo && (
              <span className={styles["error-message"]}>{errors.logo}</span>
            )}
            <p className={styles["field-help"]}>
              Optional. Provide a URL to the university's logo image.
            </p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="website" className={styles["form-label"]}>
              Website URL *
            </label>
            <div className={styles["input-container"]}>
              <Link size={18} className={styles["input-icon"]} />
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://university.edu"
                className={[
                  styles["form-input"],
                  errors.website ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
            </div>
            {errors.website && (
              <span className={styles["error-message"]}>{errors.website}</span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="countryId" className={styles["form-label"]}>
              Country *
            </label>
            <div className={styles["input-container"]}>
              <Globe size={18} className={styles["input-icon"]} />
              <select
                id="countryId"
                name="countryId"
                value={formData.countryId}
                onChange={handleInputChange}
                className={[
                  styles["form-select"],
                  errors.countryId ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name} ({country.phoneCode})
                  </option>
                ))}
              </select>
            </div>
            {errors.countryId && (
              <span className={styles["error-message"]}>
                {errors.countryId}
              </span>
            )}
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="cityId" className={styles["form-label"]}>
              City *
            </label>
            <div className={styles["input-container"]}>
              <MapPin size={18} className={styles["input-icon"]} />
              <select
                id="cityId"
                name="cityId"
                value={formData.cityId}
                onChange={handleInputChange}
                className={[
                  styles["form-select"],
                  errors.cityId ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting || !formData.countryId}
              >
                <option value="">
                  {formData.countryId
                    ? "Select a city"
                    : "First select a country"}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.cityId && (
              <span className={styles["error-message"]}>{errors.cityId}</span>
            )}
          </div>

          {errors.submit && (
            <div className={styles["submit-error"]}>{errors.submit}</div>
          )}

          <div className={styles["form-actions"]}>
            <button
              type="button"
              onClick={handleBack}
              className={styles["cancel-btn"]}
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

export default EditUniversity;
