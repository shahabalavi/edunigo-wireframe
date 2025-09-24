import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Target,
  BookOpen,
  Calendar,
  CreditCard,
  Edit,
  Plus,
  FileCheck,
  X,
  Save,
  ChevronDown,
  Check,
  CheckCircle,
} from "lucide-react";
import styles from "./Profile.module.css";
import {
  hasCompletedGoCheck,
  hasCompletedAdditionalQuestions,
  getUserSelectedUniversity,
  getCurrentSessionId,
  getSessionData,
} from "../../../utils/gocheckSessionManager";

const Profile = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);
  const [goCheckStatus, setGoCheckStatus] = useState({
    hasCompleted: false,
    hasCompletedAdditional: false,
    selectedUniversity: null,
    canContinue: false,
  });
  // eslint-disable-next-line no-unused-vars
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      dob: "March 15, 1998",
      nationality: "American",
      passport: "US123456789",
      address: "San Francisco, CA",
    },
    education: [
      {
        id: 1,
        degree: "Bachelor of Computer Science",
        institution: "University of California, Berkeley",
        period: "2016 - 2020",
        status: "Completed",
      },
      {
        id: 2,
        degree: "High School Diploma",
        institution: "Lincoln High School",
        period: "2012 - 2016",
        status: "Completed",
      },
    ],
    goals: {
      countries: ["United States", "Canada", "United Kingdom"],
      programs: ["Computer Science", "Data Science", "AI & Machine Learning"],
      intake: "Fall 2025",
      budget: "$50,000 - $80,000",
    },
    languages: [
      { name: "English", level: "Native", proficiency: 100 },
      { name: "Spanish", level: "Intermediate", proficiency: 60 },
      { name: "French", level: "Beginner", proficiency: 25 },
    ],
    testScores: [
      { test: "TOEFL iBT", score: "108/120", date: "October 2024" },
      { test: "GRE", score: "325/340", date: "September 2024" },
    ],
  });

  const [editData, setEditData] = useState({});

  // Check GoCheck status on component mount
  useEffect(() => {
    const checkGoCheckStatus = () => {
      const hasCompleted = hasCompletedGoCheck();
      const hasCompletedAdditional = hasCompletedAdditionalQuestions();
      const selectedUniversity = getUserSelectedUniversity();
      const currentSessionId = getCurrentSessionId();

      let canContinue = false;
      if (currentSessionId) {
        const sessionData = getSessionData(currentSessionId);
        if (sessionData) {
          // Check if user has started but not completed GoCheck
          const hasStage1Answers =
            sessionData.answers && Object.keys(sessionData.answers).length > 0;
          const hasStage2Answers =
            sessionData.additionalAnswers &&
            Object.keys(sessionData.additionalAnswers).length > 0;
          const hasSelectedUniversity = sessionData.selectedUniversity;

          canContinue =
            (hasStage1Answers && !hasStage2Answers) ||
            (hasStage2Answers && !hasSelectedUniversity);
        }
      }

      setGoCheckStatus({
        hasCompleted,
        hasCompletedAdditional,
        selectedUniversity,
        canContinue,
      });
    };

    checkGoCheckStatus();
  }, []);

  // Custom Multi-Select Component
  const CustomMultiSelect = ({
    options,
    selectedValues,
    onChange,
    placeholder = "Select options...",
    label,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleToggle = (value) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      onChange(newValues);
    };

    const getDisplayText = () => {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) return selectedValues[0];
      return `${selectedValues.length} selected`;
    };

    return (
      <div className={styles["form-group"]}>
        {label && <label>{label}</label>}
        <div className={styles["custom-multi-select"]} ref={dropdownRef}>
          <div
            className={styles["multi-select-trigger"]}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={styles["multi-select-value"]}>
              {getDisplayText()}
            </span>
            <ChevronDown
              size={16}
              className={[styles["chevron"], isOpen ? "open" : ""]
                .filter(Boolean)
                .join(" ")}
            />
          </div>

          {isOpen && (
            <div className={styles["multi-select-dropdown"]}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={[
                    styles["multi-select-option"],
                    selectedValues.includes(option.value) ? "selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleToggle(option.value)}
                >
                  <span className={styles["option-text"]}>{option.label}</span>
                  {selectedValues.includes(option.value) && (
                    <Check size={14} className={styles["check-icon"]} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    let completedFields = 0;
    let totalFields = 0;

    // Personal Info (7 fields)
    const personalFields = [
      "name",
      "email",
      "phone",
      "dob",
      "nationality",
      "passport",
      "address",
    ];
    totalFields += personalFields.length;
    personalFields.forEach((field) => {
      if (
        profileData.personalInfo[field] &&
        profileData.personalInfo[field].trim() !== ""
      ) {
        completedFields++;
      }
    });

    // Education (at least 1 entry)
    totalFields += 1;
    if (profileData.education.length > 0) {
      completedFields++;
    }

    // Goals (4 fields)
    const goalFields = ["countries", "programs", "intake", "budget"];
    totalFields += goalFields.length;
    goalFields.forEach((field) => {
      if (
        profileData.goals[field] &&
        (Array.isArray(profileData.goals[field])
          ? profileData.goals[field].length > 0
          : profileData.goals[field].trim() !== "")
      ) {
        completedFields++;
      }
    });

    // Languages (at least 1 entry)
    totalFields += 1;
    if (profileData.languages.length > 0) {
      completedFields++;
    }

    // Test Scores (at least 1 entry)
    totalFields += 1;
    if (profileData.testScores.length > 0) {
      completedFields++;
    }

    return Math.round((completedFields / totalFields) * 100);
  };

  const openModal = (modalType, data = {}) => {
    setActiveModal(modalType);
    setEditData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setEditData({});
  };

  const handleSave = (type, data) => {
    // Simulate save - in real app this would update backend
    console.log(`Saving ${type}:`, data);
    closeModal();
  };

  const renderPersonalInfoModal = () => (
    <div className={styles["modal-overlay"]} onClick={closeModal}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <h3>Edit Personal Information</h3>
          <button className={styles["close-btn"]} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles["modal-content"]}>
          <div className={styles["form-group"]}>
            <label>Full Name</label>
            <input
              type="text"
              defaultValue={profileData.personalInfo.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Email</label>
            <input
              type="email"
              defaultValue={profileData.personalInfo.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Phone</label>
            <input
              type="tel"
              defaultValue={profileData.personalInfo.phone}
              onChange={(e) =>
                setEditData({ ...editData, phone: e.target.value })
              }
            />
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label>Date of Birth</label>
              <input
                type="date"
                defaultValue="1998-03-15"
                onChange={(e) =>
                  setEditData({ ...editData, dob: e.target.value })
                }
              />
            </div>
            <div className={styles["form-group"]}>
              <label>Nationality</label>
              <input
                type="text"
                defaultValue={profileData.personalInfo.nationality}
                onChange={(e) =>
                  setEditData({ ...editData, nationality: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles["form-group"]}>
            <label>Passport Number</label>
            <input
              type="text"
              defaultValue={profileData.personalInfo.passport}
              onChange={(e) =>
                setEditData({ ...editData, passport: e.target.value })
              }
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Address</label>
            <input
              type="text"
              defaultValue={profileData.personalInfo.address}
              onChange={(e) =>
                setEditData({ ...editData, address: e.target.value })
              }
            />
          </div>
        </div>
        <div className={styles["modal-footer"]}>
          <button className={styles["btn-secondary"]} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles["btn-primary"]}
            onClick={() => handleSave("personalInfo", editData)}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderEducationModal = () => (
    <div className={styles["modal-overlay"]} onClick={closeModal}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <h3>Add Education</h3>
          <button className={styles["close-btn"]} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles["modal-content"]}>
          <div className={styles["form-group"]}>
            <label>Degree/Qualification</label>
            <input
              type="text"
              placeholder="e.g., Bachelor of Computer Science"
              onChange={(e) =>
                setEditData({ ...editData, degree: e.target.value })
              }
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Institution</label>
            <input
              type="text"
              placeholder="e.g., University of California, Berkeley"
              onChange={(e) =>
                setEditData({ ...editData, institution: e.target.value })
              }
            />
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label>Start Year</label>
              <input
                type="number"
                placeholder="2016"
                onChange={(e) =>
                  setEditData({ ...editData, startYear: e.target.value })
                }
              />
            </div>
            <div className={styles["form-group"]}>
              <label>End Year</label>
              <input
                type="number"
                placeholder="2020"
                onChange={(e) =>
                  setEditData({ ...editData, endYear: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-group"]}>
              <label>Status</label>
              <select
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>
            <div className={styles["form-group"]}>
              <label>Graduation Score/Grade</label>
              <input
                type="text"
                placeholder="e.g., 3.8/4.0 or 85%"
                onChange={(e) =>
                  setEditData({ ...editData, grade: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className={styles["modal-footer"]}>
          <button className={styles["btn-secondary"]} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles["btn-primary"]}
            onClick={() => handleSave("education", editData)}
          >
            <Save size={16} />
            Add Education
          </button>
        </div>
      </div>
    </div>
  );

  const renderGoalsModal = () => (
    <div className={styles["modal-overlay"]} onClick={closeModal}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <h3>Edit EduniGo Goals</h3>
          <button className={styles["close-btn"]} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles["modal-content"]}>
          <CustomMultiSelect
            label="Target Countries"
            placeholder="Select target countries..."
            options={[
              { value: "United States", label: "United States" },
              { value: "Canada", label: "Canada" },
              { value: "United Kingdom", label: "United Kingdom" },
              { value: "Australia", label: "Australia" },
              { value: "Germany", label: "Germany" },
              { value: "France", label: "France" },
              { value: "Netherlands", label: "Netherlands" },
              { value: "Sweden", label: "Sweden" },
              { value: "Switzerland", label: "Switzerland" },
              { value: "Singapore", label: "Singapore" },
              { value: "Japan", label: "Japan" },
              { value: "South Korea", label: "South Korea" },
            ]}
            selectedValues={editData.countries || profileData.goals.countries}
            onChange={(countries) => setEditData({ ...editData, countries })}
          />

          <CustomMultiSelect
            label="Preferred Programs"
            placeholder="Select preferred programs..."
            options={[
              { value: "Computer Science", label: "Computer Science" },
              { value: "Data Science", label: "Data Science" },
              {
                value: "AI & Machine Learning",
                label: "AI & Machine Learning",
              },
              { value: "Software Engineering", label: "Software Engineering" },
              { value: "Cybersecurity", label: "Cybersecurity" },
              {
                value: "Business Administration",
                label: "Business Administration",
              },
              { value: "Finance", label: "Finance" },
              { value: "Marketing", label: "Marketing" },
              { value: "Engineering", label: "Engineering" },
              { value: "Medicine", label: "Medicine" },
              { value: "Law", label: "Law" },
              { value: "Psychology", label: "Psychology" },
            ]}
            selectedValues={editData.programs || profileData.goals.programs}
            onChange={(programs) => setEditData({ ...editData, programs })}
          />
          <div className={styles["form-group"]}>
            <label>Intake Preference</label>
            <select
              defaultValue={profileData.goals.intake}
              onChange={(e) =>
                setEditData({ ...editData, intake: e.target.value })
              }
            >
              <option value="Fall 2025">Fall 2025</option>
              <option value="Spring 2025">Spring 2025</option>
              <option value="Fall 2026">Fall 2026</option>
              <option value="Spring 2026">Spring 2026</option>
            </select>
          </div>
          <div className={styles["form-group"]}>
            <label>Budget Range</label>
            <select
              defaultValue={profileData.goals.budget}
              onChange={(e) =>
                setEditData({ ...editData, budget: e.target.value })
              }
            >
              <option value="$30,000 - $50,000">$30,000 - $50,000</option>
              <option value="$50,000 - $80,000">$50,000 - $80,000</option>
              <option value="$80,000 - $120,000">$80,000 - $120,000</option>
              <option value="$120,000+">$120,000+</option>
            </select>
          </div>
        </div>
        <div className={styles["modal-footer"]}>
          <button className={styles["btn-secondary"]} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles["btn-primary"]}
            onClick={() => handleSave("goals", editData)}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderLanguageModal = () => (
    <div className={styles["modal-overlay"]} onClick={closeModal}>
      <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          <h3>Add Language</h3>
          <button className={styles["close-btn"]} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
        <div className={styles["modal-content"]}>
          <div className={styles["form-group"]}>
            <label>Language</label>
            <input
              type="text"
              placeholder="e.g., German"
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Proficiency Level</label>
            <select
              onChange={(e) =>
                setEditData({ ...editData, level: e.target.value })
              }
            >
              <option value="Beginner">Beginner</option>
              <option value="Elementary">Elementary</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Fluent">Fluent</option>
              <option value="Native">Native</option>
            </select>
          </div>
        </div>
        <div className={styles["modal-footer"]}>
          <button className={styles["btn-secondary"]} onClick={closeModal}>
            Cancel
          </button>
          <button
            className={styles["btn-primary"]}
            onClick={() => handleSave("language", editData)}
          >
            <Save size={16} />
            Add Language
          </button>
        </div>
      </div>
    </div>
  );

  const renderTestScoreModal = () => {
    const getTestScoreFields = (testName) => {
      switch (testName) {
        case "IELTS":
          return [
            { label: "Listening", placeholder: "e.g., 7.5" },
            { label: "Reading", placeholder: "e.g., 8.0" },
            { label: "Writing", placeholder: "e.g., 7.0" },
            { label: "Speaking", placeholder: "e.g., 8.5" },
            { label: "Overall Band", placeholder: "e.g., 7.5" },
          ];
        case "TOEFL iBT":
          return [
            { label: "Reading", placeholder: "e.g., 28" },
            { label: "Listening", placeholder: "e.g., 26" },
            { label: "Speaking", placeholder: "e.g., 24" },
            { label: "Writing", placeholder: "e.g., 30" },
            { label: "Total Score", placeholder: "e.g., 108" },
          ];
        case "GRE":
          return [
            { label: "Verbal Reasoning", placeholder: "e.g., 160" },
            { label: "Quantitative Reasoning", placeholder: "e.g., 165" },
            { label: "Analytical Writing", placeholder: "e.g., 4.5" },
            { label: "Total Score", placeholder: "e.g., 325" },
          ];
        case "GMAT":
          return [
            { label: "Verbal", placeholder: "e.g., 35" },
            { label: "Quantitative", placeholder: "e.g., 48" },
            { label: "Integrated Reasoning", placeholder: "e.g., 8" },
            { label: "Analytical Writing", placeholder: "e.g., 5.0" },
            { label: "Total Score", placeholder: "e.g., 720" },
          ];
        case "SAT":
          return [
            { label: "Evidence-Based Reading", placeholder: "e.g., 650" },
            { label: "Math", placeholder: "e.g., 700" },
            { label: "Writing & Language", placeholder: "e.g., 650" },
            { label: "Total Score", placeholder: "e.g., 1350" },
          ];
        case "ACT":
          return [
            { label: "English", placeholder: "e.g., 32" },
            { label: "Math", placeholder: "e.g., 30" },
            { label: "Reading", placeholder: "e.g., 34" },
            { label: "Science", placeholder: "e.g., 31" },
            { label: "Composite Score", placeholder: "e.g., 32" },
          ];
        default:
          return [{ label: "Score", placeholder: "Enter your score" }];
      }
    };

    const scoreFields = getTestScoreFields(editData.test);

    return (
      <div className={styles["modal-overlay"]} onClick={closeModal}>
        <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
          <div className={styles["modal-header"]}>
            <h3>Add Test Score</h3>
            <button className={styles["close-btn"]} onClick={closeModal}>
              <X size={20} />
            </button>
          </div>
          <div className={styles["modal-content"]}>
            <div className={styles["form-group"]}>
              <label>Test Name</label>
              <select
                onChange={(e) =>
                  setEditData({ ...editData, test: e.target.value, scores: {} })
                }
              >
                <option value="">Select Test</option>
                <option value="TOEFL iBT">TOEFL iBT</option>
                <option value="IELTS">IELTS</option>
                <option value="GRE">GRE</option>
                <option value="GMAT">GMAT</option>
                <option value="SAT">SAT</option>
                <option value="ACT">ACT</option>
              </select>
            </div>

            {editData.test && (
              <div className={styles["test-score-fields"]}>
                <h4>Enter Your Scores</h4>
                {scoreFields.map((field, index) => (
                  <div key={index} className={styles["form-group"]}>
                    <label>{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          scores: {
                            ...editData.scores,
                            [field.label]: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <div className={styles["form-group"]}>
              <label>Test Date</label>
              <input
                type="date"
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
              />
            </div>
          </div>
          <div className={styles["modal-footer"]}>
            <button className={styles["btn-secondary"]} onClick={closeModal}>
              Cancel
            </button>
            <button
              className={styles["btn-primary"]}
              onClick={() => handleSave("testScore", editData)}
              disabled={!editData.test || !editData.scores}
            >
              <Save size={16} />
              Add Score
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles["profile-content"]}>
      <div className={styles["dashboard-header"]}>
        <div className={styles["header-content"]}>
          <div className={styles["header-title"]}>
            <h1>Profile</h1>
            <p>Manage your personal information and academic history</p>
          </div>
          <div className={styles["profile-progress"]}>
            <div className={styles["progress-header"]}>
              <span className={styles["progress-label"]}>
                Profile Completion
              </span>
              <span className={styles["progress-percentage"]}>
                {calculateProfileCompletion()}%
              </span>
            </div>
            <div className={styles["progress-bar"]}>
              <div
                className={styles["progress-fill"]}
                style={{ width: `${calculateProfileCompletion()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["profile-widgets"]}>
        {/* Personal Information Widget */}
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <h3>Personal Information</h3>
            <button
              className={styles["edit-btn"]}
              onClick={() => openModal("personalInfo")}
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
          <div className={styles["widget-content"]}>
            <div className={styles["profile-info"]}>
              <div className={styles["profile-avatar"]}>
                <User size={24} />
              </div>
              <div className={styles["profile-details"]}>
                <h4>{profileData.personalInfo.name}</h4>
                <p>{profileData.personalInfo.email}</p>
                <p>{profileData.personalInfo.phone}</p>
              </div>
            </div>
            <div className={styles["info-grid"]}>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Date of Birth</span>
                <span className={styles["info-value"]}>
                  {profileData.personalInfo.dob}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Nationality</span>
                <span className={styles["info-value"]}>
                  {profileData.personalInfo.nationality}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Passport Number</span>
                <span className={styles["info-value"]}>
                  {profileData.personalInfo.passport}
                </span>
              </div>
              <div className={styles["info-item"]}>
                <span className={styles["info-label"]}>Address</span>
                <span className={styles["info-value"]}>
                  {profileData.personalInfo.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Education History Widget */}
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <h3>Education History</h3>
            <button
              className={styles["edit-btn"]}
              onClick={() => openModal("education")}
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className={styles["widget-content"]}>
            {profileData.education.map((edu) => (
              <div key={edu.id} className={styles["education-item"]}>
                <div className={styles["education-icon"]}>
                  <GraduationCap size={20} />
                </div>
                <div className={styles["education-details"]}>
                  <h4>{edu.degree}</h4>
                  <p>{edu.institution}</p>
                  <span className={styles["education-period"]}>
                    {edu.period}
                  </span>
                </div>
                <div className={styles["education-status"]}>
                  <span
                    className={[styles["status-badge"], styles["completed"]]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {edu.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EduniGo Goals Widget */}
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <h3>EduniGo Goals</h3>
            <button
              className={styles["edit-btn"]}
              onClick={() => openModal("goals")}
            >
              <Edit size={16} />
              Edit
            </button>
          </div>
          <div className={styles["widget-content"]}>
            <div className={styles["goals-grid"]}>
              <div className={styles["goal-item"]}>
                <div className={styles["goal-icon"]}>
                  <Target size={20} />
                </div>
                <div className={styles["goal-details"]}>
                  <h4>Target Countries</h4>
                  <div className={styles["goal-tags"]}>
                    {profileData.goals.countries.map((country, index) => (
                      <span key={index} className={styles["goal-tag"]}>
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles["goal-item"]}>
                <div className={styles["goal-icon"]}>
                  <BookOpen size={20} />
                </div>
                <div className={styles["goal-details"]}>
                  <h4>Preferred Programs</h4>
                  <div className={styles["goal-tags"]}>
                    {profileData.goals.programs.map((program, index) => (
                      <span key={index} className={styles["goal-tag"]}>
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles["goal-item"]}>
                <div className={styles["goal-icon"]}>
                  <Calendar size={20} />
                </div>
                <div className={styles["goal-details"]}>
                  <h4>Intake Preference</h4>
                  <div className={styles["goal-tags"]}>
                    <span className={styles["goal-tag"]}>
                      {profileData.goals.intake}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles["goal-item"]}>
                <div className={styles["goal-icon"]}>
                  <CreditCard size={20} />
                </div>
                <div className={styles["goal-details"]}>
                  <h4>Budget Range</h4>
                  <div className={styles["goal-tags"]}>
                    <span className={styles["goal-tag"]}>
                      {profileData.goals.budget}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Proficiency Widget */}
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <h3>Language Proficiency</h3>
            <button
              className={styles["edit-btn"]}
              onClick={() => openModal("language")}
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className={styles["widget-content"]}>
            {profileData.languages.map((lang, index) => (
              <div key={index} className={styles["language-item"]}>
                <div className={styles["language-info"]}>
                  <span className={styles["language-name"]}>{lang.name}</span>
                  <span className={styles["language-level"]}>{lang.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Scores Widget */}
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <h3>Test Scores</h3>
            <button
              className={styles["edit-btn"]}
              onClick={() => openModal("testScore")}
            >
              <Plus size={16} />
              Add Score
            </button>
          </div>
          <div className={styles["widget-content"]}>
            <div className={styles["test-scores"]}>
              {profileData.testScores.map((test, index) => (
                <div key={index} className={styles["test-item"]}>
                  <div className={styles["test-icon"]}>
                    <FileCheck size={20} />
                  </div>
                  <div className={styles["test-details"]}>
                    <h4>{test.test}</h4>
                    <span className={styles["test-score"]}>{test.score}</span>
                    <span className={styles["test-date"]}>{test.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GoCheck Widget */}
        <div
          className={[styles["widget"], styles["profile-widget"]]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["widget-header"]}>
            <h3>GoCheck Assessment</h3>
            <button
              className={styles["edit-btn"]}
              onClick={() => navigate("/gocheck")}
            >
              <CheckCircle size={16} />
              {goCheckStatus.canContinue
                ? "Continue GoCheck"
                : goCheckStatus.hasCompleted
                ? "View Results"
                : "Start GoCheck"}
            </button>
          </div>
          <div className={styles["widget-content"]}>
            <div className={styles["gocheck-info"]}>
              <div className={styles["gocheck-icon"]}>
                <CheckCircle size={24} />
              </div>
              <div className={styles["gocheck-details"]}>
                <h4>University Matching Assessment</h4>
                {goCheckStatus.canContinue ? (
                  <p>
                    You have an incomplete GoCheck assessment. Continue to
                    complete the remaining questions and select your university.
                  </p>
                ) : goCheckStatus.hasCompleted ? (
                  <p>
                    Your GoCheck assessment is complete! You can view your
                    results or retake the assessment.
                  </p>
                ) : (
                  <p>
                    Complete our GoCheck questionnaire to discover universities
                    that match your profile and goals.
                  </p>
                )}

                {goCheckStatus.selectedUniversity && (
                  <div className={styles["selected-university-info"]}>
                    <h5>Selected University:</h5>
                    <p className={styles["university-name"]}>
                      {goCheckStatus.selectedUniversity.name}
                    </p>
                  </div>
                )}

                <div className={styles["gocheck-features"]}>
                  <span className={styles["feature-tag"]}>
                    Personalized Matches
                  </span>
                  <span className={styles["feature-tag"]}>
                    Program Recommendations
                  </span>
                  <span className={styles["feature-tag"]}>
                    Admission Readiness
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "personalInfo" && renderPersonalInfoModal()}
      {activeModal === "education" && renderEducationModal()}
      {activeModal === "goals" && renderGoalsModal()}
      {activeModal === "language" && renderLanguageModal()}
      {activeModal === "testScore" && renderTestScoreModal()}
    </div>
  );
};

export default Profile;
