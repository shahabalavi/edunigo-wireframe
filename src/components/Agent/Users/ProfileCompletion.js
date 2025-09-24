import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  GraduationCap,
  Target,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Plus,
  X,
} from "lucide-react";
import styles from "./ProfileCompletion.module.css";

const ProfileCompletion = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);

  // Mock user data matching user profile structure
  const [formData, setFormData] = useState({
    // Personal Information
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dob: "1995-06-15",
    nationality: "American",
    passport: "123456789",
    address: "123 Main Street, New York, NY 10001",

    // Education History
    education: [
      {
        id: 1,
        degree: "Bachelor of Science",
        institution: "State University",
        period: "2013 - 2017",
        status: "Completed",
        major: "Computer Science",
        gpa: "3.7",
      },
    ],

    // EduniGo Goals
    goals: {
      countries: ["United States", "Canada"],
      programs: ["Computer Science", "Data Science"],
      intake: "Fall 2025",
      budget: "$50,000 - $80,000",
    },

    // Language Proficiency
    languages: [{ name: "English", level: "Native", proficiency: 100 }],

    // Test Scores
    testScores: [{ test: "GRE", score: "320/340", date: "2024-01" }],
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleBack = () => {
    navigate(`/agent/users/${userId}`);
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addToArray = (arrayName, newItem) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem],
    }));
  };

  const removeFromArray = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const validateSection = (section) => {
    const errors = {};

    switch (section) {
      case "personal":
        if (!formData.name) errors.name = "Name is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.phone) errors.phone = "Phone number is required";
        if (!formData.dob) errors.dob = "Date of birth is required";
        if (!formData.nationality)
          errors.nationality = "Nationality is required";
        break;

      case "education":
        if (!formData.education || formData.education.length === 0) {
          errors.education = "At least one education entry is required";
        }
        break;

      case "goals":
        if (
          !formData.goals.countries ||
          formData.goals.countries.length === 0
        ) {
          errors.countries = "Target countries are required";
        }
        if (!formData.goals.programs || formData.goals.programs.length === 0) {
          errors.programs = "Preferred programs are required";
        }
        if (!formData.goals.intake)
          errors.intake = "Intake preference is required";
        break;

      case "languages":
        if (!formData.languages || formData.languages.length === 0) {
          errors.languages = "At least one language is required";
        }
        break;

      default:
        // No validation for test scores section (optional)
        break;
    }

    return errors;
  };

  const handleFinalSave = async () => {
    // Validate all sections
    const personalErrors = validateSection("personal");
    const educationErrors = validateSection("education");
    const goalsErrors = validateSection("goals");
    const languagesErrors = validateSection("languages");

    const allErrors = {
      ...personalErrors,
      ...educationErrors,
      ...goalsErrors,
      ...languagesErrors,
    };

    if (Object.keys(allErrors).length > 0) {
      setValidationErrors(allErrors);
      return;
    }

    setIsSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSaving(false);

    // Navigate back to user details
    navigate(`/agent/users/${userId}`);
  };

  const getSectionProgress = () => {
    const sections = ["personal", "education", "goals", "languages"];
    const completed = sections.filter((section) => {
      const errors = validateSection(section);
      return Object.keys(errors).length === 0;
    });

    return {
      completed: completed.length,
      total: sections.length,
      percentage: Math.round((completed.length / sections.length) * 100),
    };
  };

  const renderPersonalSection = () => (
    <div className={styles["form-section"]}>
      <div className={styles["section-header"]}>
        <User size={20} />
        <h3>Personal Information</h3>
      </div>

      <div className={styles["form-grid"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={validationErrors.name ? "error" : ""}
          />
          {validationErrors.name && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.name}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={validationErrors.email ? "error" : ""}
          />
          {validationErrors.email && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.email}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={validationErrors.phone ? "error" : ""}
          />
          {validationErrors.phone && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.phone}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="dob">Date of Birth *</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
            className={validationErrors.dob ? "error" : ""}
          />
          {validationErrors.dob && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.dob}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="nationality">Nationality *</label>
          <select
            id="nationality"
            value={formData.nationality}
            onChange={(e) => handleInputChange("nationality", e.target.value)}
            className={validationErrors.nationality ? "error" : ""}
          >
            <option value="">Select nationality</option>
            <option value="American">American</option>
            <option value="Canadian">Canadian</option>
            <option value="British">British</option>
            <option value="Australian">Australian</option>
            <option value="Other">Other</option>
          </select>
          {validationErrors.nationality && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.nationality}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label htmlFor="passport">Passport Number</label>
          <input
            type="text"
            id="passport"
            value={formData.passport}
            onChange={(e) => handleInputChange("passport", e.target.value)}
          />
        </div>

        <div
          className={[styles["form-group"], styles["full-width"]]
            .filter(Boolean)
            .join(" ")}
        >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            placeholder="Street, City, State, Postal Code"
          />
        </div>
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className={styles["form-section"]}>
      <div className={styles["section-header"]}>
        <GraduationCap size={20} />
        <h3>Education History</h3>
      </div>

      {validationErrors.education && (
        <div
          className={[styles["error-message"], styles["section-error"]]
            .filter(Boolean)
            .join(" ")}
        >
          <AlertCircle size={14} />
          {validationErrors.education}
        </div>
      )}

      <div className={styles["education-list"]}>
        {formData.education.map((edu, index) => (
          <div key={edu.id} className={styles["education-item"]}>
            <div className={styles["education-header"]}>
              <h4>Education #{index + 1}</h4>
              {formData.education.length > 1 && (
                <button
                  type="button"
                  className={styles["remove-btn"]}
                  onClick={() => removeFromArray("education", index)}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className={styles["form-grid"]}>
              <div className={styles["form-group"]}>
                <label>Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  placeholder="e.g., Bachelor of Science"
                />
              </div>

              <div className={styles["form-group"]}>
                <label>Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      index,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="e.g., State University"
                />
              </div>

              <div className={styles["form-group"]}>
                <label>Period</label>
                <input
                  type="text"
                  value={edu.period}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      index,
                      "period",
                      e.target.value
                    )
                  }
                  placeholder="e.g., 2018 - 2022"
                />
              </div>

              <div className={styles["form-group"]}>
                <label>Status</label>
                <select
                  value={edu.status}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      index,
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Expected">Expected</option>
                </select>
              </div>

              <div className={styles["form-group"]}>
                <label>Major/Field of Study</label>
                <input
                  type="text"
                  value={edu.major || ""}
                  onChange={(e) =>
                    handleArrayChange(
                      "education",
                      index,
                      "major",
                      e.target.value
                    )
                  }
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className={styles["form-group"]}>
                <label>GPA</label>
                <input
                  type="text"
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    handleArrayChange("education", index, "gpa", e.target.value)
                  }
                  placeholder="e.g., 3.7"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles["add-btn"]}
        onClick={() =>
          addToArray("education", {
            id: Date.now(),
            degree: "",
            institution: "",
            period: "",
            status: "Completed",
            major: "",
            gpa: "",
          })
        }
      >
        <Plus size={16} />
        Add Education
      </button>
    </div>
  );

  const renderGoalsSection = () => (
    <div className={styles["form-section"]}>
      <div className={styles["section-header"]}>
        <Target size={20} />
        <h3>EduniGo Goals</h3>
      </div>

      <div className={styles["form-grid"]}>
        <div className={styles["form-group"]}>
          <label>Target Countries *</label>
          <input
            type="text"
            value={formData.goals.countries.join(", ")}
            onChange={(e) =>
              handleInputChange(
                "goals.countries",
                e.target.value.split(", ").filter(Boolean)
              )
            }
            placeholder="e.g., United States, Canada, United Kingdom"
            className={validationErrors.countries ? "error" : ""}
          />
          {validationErrors.countries && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.countries}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label>Preferred Programs *</label>
          <input
            type="text"
            value={formData.goals.programs.join(", ")}
            onChange={(e) =>
              handleInputChange(
                "goals.programs",
                e.target.value.split(", ").filter(Boolean)
              )
            }
            placeholder="e.g., Computer Science, Data Science"
            className={validationErrors.programs ? "error" : ""}
          />
          {validationErrors.programs && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.programs}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label>Intake Preference *</label>
          <select
            value={formData.goals.intake}
            onChange={(e) => handleInputChange("goals.intake", e.target.value)}
            className={validationErrors.intake ? "error" : ""}
          >
            <option value="">Select intake</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Spring 2025">Spring 2025</option>
            <option value="Fall 2025">Fall 2025</option>
            <option value="Spring 2026">Spring 2026</option>
          </select>
          {validationErrors.intake && (
            <span className={styles["error-message"]}>
              <AlertCircle size={14} />
              {validationErrors.intake}
            </span>
          )}
        </div>

        <div className={styles["form-group"]}>
          <label>Budget Range</label>
          <select
            value={formData.goals.budget}
            onChange={(e) => handleInputChange("goals.budget", e.target.value)}
          >
            <option value="">Select budget range</option>
            <option value="Under $30,000">Under $30,000</option>
            <option value="$30,000 - $50,000">$30,000 - $50,000</option>
            <option value="$50,000 - $80,000">$50,000 - $80,000</option>
            <option value="$80,000 - $120,000">$80,000 - $120,000</option>
            <option value="Over $120,000">Over $120,000</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderLanguagesSection = () => (
    <div className={styles["form-section"]}>
      <div className={styles["section-header"]}>
        <BookOpen size={20} />
        <h3>Language Proficiency</h3>
      </div>

      {validationErrors.languages && (
        <div
          className={[styles["error-message"], styles["section-error"]]
            .filter(Boolean)
            .join(" ")}
        >
          <AlertCircle size={14} />
          {validationErrors.languages}
        </div>
      )}

      <div className={styles["languages-list"]}>
        {formData.languages.map((lang, index) => (
          <div key={index} className={styles["language-item"]}>
            <div className={styles["language-header"]}>
              <h4>Language #{index + 1}</h4>
              {formData.languages.length > 1 && (
                <button
                  type="button"
                  className={styles["remove-btn"]}
                  onClick={() => removeFromArray("languages", index)}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className={styles["form-grid"]}>
              <div className={styles["form-group"]}>
                <label>Language</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "languages",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="e.g., English"
                />
              </div>

              <div className={styles["form-group"]}>
                <label>Proficiency Level</label>
                <select
                  value={lang.level}
                  onChange={(e) =>
                    handleArrayChange(
                      "languages",
                      index,
                      "level",
                      e.target.value
                    )
                  }
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Beginner">Beginner</option>
                </select>
              </div>

              <div className={styles["form-group"]}>
                <label>Proficiency Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={lang.proficiency}
                  onChange={(e) =>
                    handleArrayChange(
                      "languages",
                      index,
                      "proficiency",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles["add-btn"]}
        onClick={() =>
          addToArray("languages", {
            name: "",
            level: "Intermediate",
            proficiency: 50,
          })
        }
      >
        <Plus size={16} />
        Add Language
      </button>
    </div>
  );

  const renderTestScoresSection = () => (
    <div className={styles["form-section"]}>
      <div className={styles["section-header"]}>
        <GraduationCap size={20} />
        <h3>Test Scores (Optional)</h3>
      </div>

      <div className={styles["test-scores-list"]}>
        {formData.testScores.map((test, index) => (
          <div key={index} className={styles["test-score-item"]}>
            <div className={styles["test-score-header"]}>
              <h4>Test Score #{index + 1}</h4>
              <button
                type="button"
                className={styles["remove-btn"]}
                onClick={() => removeFromArray("testScores", index)}
              >
                <X size={16} />
              </button>
            </div>

            <div className={styles["form-grid"]}>
              <div className={styles["form-group"]}>
                <label>Test Type</label>
                <select
                  value={test.test}
                  onChange={(e) =>
                    handleArrayChange(
                      "testScores",
                      index,
                      "test",
                      e.target.value
                    )
                  }
                >
                  <option value="GRE">GRE</option>
                  <option value="GMAT">GMAT</option>
                  <option value="TOEFL iBT">TOEFL iBT</option>
                  <option value="IELTS">IELTS</option>
                  <option value="SAT">SAT</option>
                  <option value="ACT">ACT</option>
                </select>
              </div>

              <div className={styles["form-group"]}>
                <label>Score</label>
                <input
                  type="text"
                  value={test.score}
                  onChange={(e) =>
                    handleArrayChange(
                      "testScores",
                      index,
                      "score",
                      e.target.value
                    )
                  }
                  placeholder="e.g., 320/340"
                />
              </div>

              <div className={styles["form-group"]}>
                <label>Test Date</label>
                <input
                  type="month"
                  value={test.date}
                  onChange={(e) =>
                    handleArrayChange(
                      "testScores",
                      index,
                      "date",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles["add-btn"]}
        onClick={() =>
          addToArray("testScores", {
            test: "GRE",
            score: "",
            date: "",
          })
        }
      >
        <Plus size={16} />
        Add Test Score
      </button>
    </div>
  );

  const progress = getSectionProgress();

  return (
    <div className={styles["page-content"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button className={styles["back-btn"]} onClick={handleBack}>
            <ArrowLeft size={16} />
            Back to User Details
          </button>
          <div className={styles["header-content"]}>
            <h1>Profile Completion</h1>
            <p>Complete and manage student profile information</p>
          </div>
        </div>
        <button
          className={styles["btn-primary"]}
          onClick={handleFinalSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className={styles["loading-spinner"]}></div>
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save Profile
            </>
          )}
        </button>
      </div>

      {/* Progress Indicator */}
      <div className={styles["progress-card"]}>
        <div className={styles["progress-header"]}>
          <h3>Profile Completion Progress</h3>
          <span className={styles["progress-percentage"]}>
            {progress.percentage}%
          </span>
        </div>
        <div className={styles["progress-bar"]}>
          <div
            className={styles["progress-fill"]}
            style={{ width: `${progress.percentage}%` }}
          ></div>
        </div>
        <div className={styles["progress-details"]}>
          <span>
            {progress.completed} of {progress.total} sections completed
          </span>
          {progress.percentage === 100 && (
            <span className={styles["completion-badge"]}>
              <CheckCircle size={14} />
              Complete
            </span>
          )}
        </div>
      </div>

      {/* Section Navigation */}
      <div className={styles["section-nav"]}>
        <button
          className={[
            styles["section-btn"],
            activeSection === "personal" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveSection("personal")}
        >
          <User size={16} />
          Personal
        </button>
        <button
          className={[
            styles["section-btn"],
            activeSection === "education" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveSection("education")}
        >
          <GraduationCap size={16} />
          Education
        </button>
        <button
          className={[
            styles["section-btn"],
            activeSection === "goals" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveSection("goals")}
        >
          <Target size={16} />
          Goals
        </button>
        <button
          className={[
            styles["section-btn"],
            activeSection === "languages" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveSection("languages")}
        >
          <BookOpen size={16} />
          Languages
        </button>
        <button
          className={[
            styles["section-btn"],
            activeSection === "testScores" ? styles["active"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setActiveSection("testScores")}
        >
          <GraduationCap size={16} />
          Test Scores
        </button>
      </div>

      {/* Form Content */}
      <div className={styles["form-content"]}>
        {activeSection === "personal" && renderPersonalSection()}
        {activeSection === "education" && renderEducationSection()}
        {activeSection === "goals" && renderGoalsSection()}
        {activeSection === "languages" && renderLanguagesSection()}
        {activeSection === "testScores" && renderTestScoresSection()}
      </div>
    </div>
  );
};

export default ProfileCompletion;
