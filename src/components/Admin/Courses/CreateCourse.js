import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Save,
  GraduationCap,
  Building2,
  Calendar,
  Hash,
  FileText,
  CheckSquare,
} from "lucide-react";
import styles from "./CourseForm.module.css";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    educationLevelId: "",
    majorId: "",
    universityIds: [],
    startDate: "",
    endDate: "",
  });
  const [educationLevels, setEducationLevels] = useState([]);
  const [majors, setMajors] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data for select fields
  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      const sampleEducationLevels = [
        { id: 1, name: "High School Diploma" },
        { id: 2, name: "Associate Degree" },
        { id: 3, name: "Bachelor's Degree" },
        { id: 4, name: "Master's Degree" },
        { id: 5, name: "Doctorate (PhD)" },
        { id: 6, name: "Professional Degree" },
        { id: 7, name: "Certificate" },
        { id: 8, name: "Diploma" },
        { id: 9, name: "Postgraduate Certificate" },
        { id: 10, name: "Foundation Year" },
      ];

      const sampleMajors = [
        { id: 1, name: "Computer Science" },
        { id: 2, name: "Business Administration" },
        { id: 3, name: "Engineering" },
        { id: 4, name: "Medicine" },
        { id: 5, name: "Psychology" },
        { id: 6, name: "Economics" },
        { id: 7, name: "Mathematics" },
        { id: 8, name: "Physics" },
        { id: 9, name: "Chemistry" },
        { id: 10, name: "Biology" },
        { id: 11, name: "Literature" },
        { id: 12, name: "History" },
        { id: 13, name: "Art & Design" },
        { id: 14, name: "Architecture" },
        { id: 15, name: "Law" },
      ];

      const sampleUniversities = [
        { id: 1, name: "Harvard University" },
        { id: 2, name: "University of Oxford" },
        { id: 3, name: "University of Toronto" },
        { id: 4, name: "University of Melbourne" },
        { id: 5, name: "Technical University of Munich" },
        { id: 6, name: "Sorbonne University" },
        { id: 7, name: "University of Tokyo" },
        { id: 8, name: "Seoul National University" },
        { id: 9, name: "University of Tehran" },
      ];

      setEducationLevels(sampleEducationLevels);
      setMajors(sampleMajors);
      setUniversities(sampleUniversities);
      setLoading(false);
    }, 1000);
  }, []);

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

  const handleUniversityChange = (universityId) => {
    setFormData((prev) => {
      const universityIds = prev.universityIds.includes(universityId)
        ? prev.universityIds.filter((id) => id !== universityId)
        : [...prev.universityIds, universityId];

      return {
        ...prev,
        universityIds,
      };
    });

    // Clear error when user makes selection
    if (errors.universityIds) {
      setErrors((prev) => ({
        ...prev,
        universityIds: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Course name must be at least 2 characters";
    } else if (formData.name.trim().length > 200) {
      newErrors.name = "Course name must be less than 200 characters";
    }

    if (!formData.code.trim()) {
      newErrors.code = "Course code is required";
    } else if (formData.code.trim().length < 2) {
      newErrors.code = "Course code must be at least 2 characters";
    } else if (formData.code.trim().length > 20) {
      newErrors.code = "Course code must be less than 20 characters";
    } else if (!/^[A-Z0-9]+$/i.test(formData.code.trim())) {
      newErrors.code = "Course code can only contain letters and numbers";
    }

    if (!formData.educationLevelId) {
      newErrors.educationLevelId = "Education level selection is required";
    }

    if (!formData.majorId) {
      newErrors.majorId = "Major selection is required";
    }

    if (formData.universityIds.length === 0) {
      newErrors.universityIds = "At least one university must be selected";
    }

    if (
      formData.description.trim() &&
      formData.description.trim().length > 500
    ) {
      newErrors.description = "Description must be less than 500 characters";
    }

    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate <= startDate) {
        newErrors.endDate = "End date must be after start date";
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
        name: formData.name.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim() || null,
        educationLevelId: parseInt(formData.educationLevelId),
        majorId: parseInt(formData.majorId),
        universityIds: formData.universityIds.map((id) => parseInt(id)),
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
      };

      console.log("Creating course:", submitData);

      // Navigate back to courses list
      navigate("/admin/courses");
    } catch (error) {
      console.error("Error creating course:", error);
      setErrors({
        submit: "Failed to create course. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/courses");
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading form...</p>
      </div>
    );
  }

  return (
    <div className={styles["course-form-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button onClick={handleBack} className={styles["back-btn"]}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <BookOpen size={24} />
          </div>
          <div>
            <h1>Create Course</h1>
            <p>Add a new course to the system</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit} className={styles["course-form"]}>
          <div className={styles["form-group"]}>
            <label htmlFor="name" className={styles["form-label"]}>
              Course Name *
            </label>
            <div className={styles["input-container"]}>
              <BookOpen size={18} className={styles["input-icon"]} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter course name"
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
            <label htmlFor="code" className={styles["form-label"]}>
              Course Code *
            </label>
            <div className={styles["input-container"]}>
              <Hash size={18} className={styles["input-icon"]} />
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="e.g., CS101, BUS201"
                className={[
                  styles["form-input"],
                  errors.code ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
            </div>
            {errors.code && (
              <span className={styles["error-message"]}>{errors.code}</span>
            )}
            <p className={styles["field-help"]}>
              Unique identifier for the course (letters and numbers only).
            </p>
          </div>

          <div className={styles["form-group"]}>
            <label htmlFor="description" className={styles["form-label"]}>
              Description
            </label>
            <div className={styles["input-container"]}>
              <FileText size={18} className={styles["input-icon"]} />
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter course description (optional)"
                rows={3}
                className={[
                  styles["form-textarea"],
                  errors.description ? styles["error"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                disabled={isSubmitting}
              />
            </div>
            {errors.description && (
              <span className={styles["error-message"]}>
                {errors.description}
              </span>
            )}
            <p className={styles["field-help"]}>
              Optional. Brief description of the course content and objectives.
            </p>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label
                htmlFor="educationLevelId"
                className={styles["form-label"]}
              >
                Education Level *
              </label>
              <div className={styles["input-container"]}>
                <GraduationCap size={18} className={styles["input-icon"]} />
                <select
                  id="educationLevelId"
                  name="educationLevelId"
                  value={formData.educationLevelId}
                  onChange={handleInputChange}
                  className={[
                    styles["form-select"],
                    errors.educationLevelId ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={isSubmitting}
                >
                  <option value="">Select education level</option>
                  {educationLevels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.educationLevelId && (
                <span className={styles["error-message"]}>
                  {errors.educationLevelId}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="majorId" className={styles["form-label"]}>
                Major/Field *
              </label>
              <div className={styles["input-container"]}>
                <GraduationCap size={18} className={styles["input-icon"]} />
                <select
                  id="majorId"
                  name="majorId"
                  value={formData.majorId}
                  onChange={handleInputChange}
                  className={[
                    styles["form-select"],
                    errors.majorId ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={isSubmitting}
                >
                  <option value="">Select major/field</option>
                  {majors.map((major) => (
                    <option key={major.id} value={major.id}>
                      {major.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.majorId && (
                <span className={styles["error-message"]}>
                  {errors.majorId}
                </span>
              )}
            </div>
          </div>

          <div className={styles["form-group"]}>
            <label className={styles["form-label"]}>Universities *</label>
            <div className={styles["checkbox-container"]}>
              {universities.map((university) => (
                <label key={university.id} className={styles["checkbox-item"]}>
                  <input
                    type="checkbox"
                    checked={formData.universityIds.includes(university.id)}
                    onChange={() => handleUniversityChange(university.id)}
                    disabled={isSubmitting}
                    className={styles["checkbox-input"]}
                  />
                  <div className={styles["checkbox-custom"]}>
                    <CheckSquare size={16} />
                  </div>
                  <div className={styles["checkbox-content"]}>
                    <Building2 size={14} />
                    <span>{university.name}</span>
                  </div>
                </label>
              ))}
            </div>
            {errors.universityIds && (
              <span className={styles["error-message"]}>
                {errors.universityIds}
              </span>
            )}
            <p className={styles["field-help"]}>
              Select one or more universities that offer this course.
            </p>
          </div>

          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="startDate" className={styles["form-label"]}>
                Start Date
              </label>
              <div className={styles["input-container"]}>
                <Calendar size={18} className={styles["input-icon"]} />
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={[
                    styles["form-input"],
                    errors.startDate ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.startDate && (
                <span className={styles["error-message"]}>
                  {errors.startDate}
                </span>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="endDate" className={styles["form-label"]}>
                End Date
              </label>
              <div className={styles["input-container"]}>
                <Calendar size={18} className={styles["input-icon"]} />
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={[
                    styles["form-input"],
                    errors.endDate ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={isSubmitting}
                />
              </div>
              {errors.endDate && (
                <span className={styles["error-message"]}>
                  {errors.endDate}
                </span>
              )}
            </div>
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
                  Creating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Create Course
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
