import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Plus,
  FileCheck,
  ChevronDown,
  Check,
} from "lucide-react";
import styles from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();
  const [loadingDocuments, setLoadingDocuments] = useState(true);
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

  // Map education documents to profile education array
  const mapEducationDocuments = (submissions) => {
    const educationDocs = submissions.filter(
      (sub) =>
        sub.document.category === "Academic Records" &&
        (sub.document.name.includes("Degree") ||
          sub.document.name.includes("Diploma"))
    );

    return educationDocs.map((doc) => {
      const fields = doc.fieldValues || {};
      const graduationDate = fields["Graduation Date"]
        ? new Date(fields["Graduation Date"]).getFullYear()
        : fields["Graduation Year"] || "N/A";
      const startYear = graduationDate !== "N/A" ? graduationDate - 4 : "N/A";

      return {
        id: doc.id,
        degree: fields["Degree Name"] || doc.document.name,
        institution: fields.Institution || fields["School Name"] || "N/A",
        period: `${startYear} - ${graduationDate}`,
        status: doc.status === "verified" ? "Verified" : "Pending",
        documentStatus: doc.status,
        fieldOfStudy: fields["Field of Study"] || null,
        gpa: fields.GPA || null,
      };
    });
  };

  // Map language certificate documents to test scores
  const mapTestScoreDocuments = (submissions) => {
    const languageDocs = submissions.filter(
      (sub) => sub.document.category === "Language Certificates"
    );

    return languageDocs.map((doc) => {
      const fields = doc.fieldValues || {};
      const submissionDate = doc.submittedAt
        ? new Date(doc.submittedAt)
        : new Date();
      const dateStr = submissionDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      let score = "";
      if (doc.document.name.includes("TOEFL")) {
        score = `${fields["Total Score"] || "N/A"}/120`;
      } else if (doc.document.name.includes("IELTS")) {
        score = `${fields["Overall Score"] || "N/A"}/9`;
      } else {
        score = "See Document";
      }

      return {
        test: doc.document.name,
        score: score,
        date: dateStr,
        documentStatus: doc.status,
        documentId: doc.id,
      };
    });
  };

  // Map identity documents to personal info
  const mapPersonalInfoDocuments = (submissions) => {
    const identityDocs = submissions.filter(
      (sub) => sub.document.category === "Identity Documents"
    );

    const personalInfo = {};
    identityDocs.forEach((doc) => {
      if (!doc.fieldValues) return;

      // Extract from Passport
      if (doc.document.name === "Passport") {
        personalInfo.firstName = doc.fieldValues["First Name"] || "";
        personalInfo.lastName = doc.fieldValues["Last Name"] || "";
        personalInfo.name =
          `${personalInfo.firstName} ${personalInfo.lastName}`.trim() ||
          "Not provided";
        personalInfo.passport = doc.fieldValues["Passport Number"] || "";
        personalInfo.dob =
          doc.fieldValues["Date of Birth"] || doc.fieldValues["DOB"] || "";
        personalInfo.nationality = doc.fieldValues["Nationality"] || "";
        personalInfo.address = doc.fieldValues["Address"] || "";
      }

      // Extract from National ID
      if (doc.document.name === "National ID") {
        if (!personalInfo.firstName)
          personalInfo.firstName = doc.fieldValues["First Name"] || "";
        if (!personalInfo.lastName)
          personalInfo.lastName = doc.fieldValues["Last Name"] || "";
        if (!personalInfo.name)
          personalInfo.name =
            `${personalInfo.firstName} ${personalInfo.lastName}`.trim();
        if (!personalInfo.dob)
          personalInfo.dob = doc.fieldValues["Date of Birth"] || "";
        if (!personalInfo.address)
          personalInfo.address = doc.fieldValues["Address"] || "";
      }
    });

    return personalInfo;
  };

  // Map language certificate documents to language proficiency
  const mapLanguageProficiencyDocuments = (submissions) => {
    const languageDocs = submissions.filter(
      (sub) => sub.document.category === "Language Certificates"
    );

    const languages = [];
    const languageMap = {
      "IELTS Certificate": { name: "English", proficiency: 85 },
      "TOEFL Score Report": { name: "English", proficiency: 90 },
      "Cambridge Certificate": { name: "English", proficiency: 95 },
      // Add more language certificate mappings as needed
    };

    languageDocs.forEach((doc) => {
      const langInfo = languageMap[doc.document.name];
      if (langInfo) {
        // Check if English already exists, use highest proficiency
        const existingLang = languages.find((l) => l.name === langInfo.name);
        if (existingLang) {
          if (langInfo.proficiency > existingLang.proficiency) {
            existingLang.proficiency = langInfo.proficiency;
            existingLang.level = getProficiencyLevel(langInfo.proficiency);
            existingLang.documentId = doc.id;
            existingLang.documentStatus = doc.status;
          }
        } else {
          languages.push({
            name: langInfo.name,
            level: getProficiencyLevel(langInfo.proficiency),
            proficiency: langInfo.proficiency,
            documentId: doc.id,
            documentStatus: doc.status,
          });
        }
      }
    });

    return languages;
  };

  // Convert proficiency score to level
  const getProficiencyLevel = (score) => {
    if (score >= 90) return "Native/Fluent";
    if (score >= 75) return "Advanced";
    if (score >= 60) return "Intermediate";
    if (score >= 40) return "Elementary";
    return "Beginner";
  };

  // Handle navigation to Documents section with category filter
  const handleAddDocument = (category) => {
    navigate("/user/documents?category=" + encodeURIComponent(category));
  };

  // Get document status badge
  const getDocumentStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return { text: "Verified", className: "verified" };
      case "pending":
        return { text: "Pending", className: "pending" };
      case "rejected":
        return { text: "Rejected", className: "rejected" };
      case "expired":
        return { text: "Expired", className: "expired" };
      default:
        return { text: "Unknown", className: "" };
    }
  };

  // Fetch document submissions to populate profile
  useEffect(() => {
    // Simulate API call - in real app, this would fetch from your API
    setTimeout(() => {
      // Sample submissions - would come from API
      const sampleSubmissions = [
        {
          id: 1,
          document: {
            id: 1,
            name: "Passport",
            category: "Identity Documents",
          },
          status: "verified",
          fieldValues: {
            "First Name": "Sarah",
            "Last Name": "Johnson",
            "Passport Number": "US123456789",
            "Date of Birth": "1998-03-15",
            Nationality: "American",
            Address: "123 Main Street, San Francisco, CA 94102, USA",
          },
          uploadedFiles: [],
        },
        {
          id: 8,
          document: {
            id: 2,
            name: "National ID",
            category: "Identity Documents",
          },
          status: "verified",
          fieldValues: {
            "First Name": "Sarah",
            "Last Name": "Johnson",
            "Date of Birth": "1998-03-15",
            Address: "123 Main Street, San Francisco, CA 94102, USA",
          },
          uploadedFiles: [],
        },
        {
          id: 3,
          document: {
            id: 6,
            name: "Bachelor's Degree Certificate",
            category: "Academic Records",
          },
          status: "verified",
          fieldValues: {
            Institution: "Harvard University",
            "Degree Name": "Bachelor of Science",
            "Field of Study": "Computer Science",
            GPA: "3.8",
            "Graduation Date": "2022-05-15",
          },
          submittedAt: "2024-12-05T16:45:00Z",
        },
        {
          id: 6,
          document: {
            id: 7,
            name: "Master's Degree Certificate",
            category: "Academic Records",
          },
          status: "pending",
          fieldValues: {
            Institution: "MIT",
            "Degree Name": "Master of Science",
            "Field of Study": "Artificial Intelligence",
            GPA: "4.0",
            "Graduation Date": "2024-05-20",
          },
          submittedAt: "2024-12-12T10:20:00Z",
        },
        {
          id: 7,
          document: {
            id: 5,
            name: "High School Diploma",
            category: "Academic Records",
          },
          status: "verified",
          fieldValues: {
            "School Name": "Lincoln High School",
            "Graduation Year": "2018",
            GPA: "3.9",
          },
          submittedAt: "2024-11-20T14:30:00Z",
        },
        {
          id: 4,
          document: {
            id: 4,
            name: "TOEFL Score Report",
            category: "Language Certificates",
          },
          status: "verified",
          fieldValues: {
            "Total Score": "110",
            Reading: "28",
            Listening: "27",
            Speaking: "26",
            Writing: "29",
          },
          submittedAt: "2024-12-08T14:20:00Z",
        },
        {
          id: 2,
          document: {
            id: 3,
            name: "IELTS Certificate",
            category: "Language Certificates",
          },
          status: "pending",
          fieldValues: {
            "Overall Score": "7.5",
            "Listening Score": "8.0",
            "Reading Score": "7.0",
            "Writing Score": "7.0",
            "Speaking Score": "8.0",
          },
          submittedAt: "2024-12-11T08:15:00Z",
        },
      ];

      setLoadingDocuments(false);

      // Map documents to profile data
      const educationFromDocs = mapEducationDocuments(sampleSubmissions);
      const testScoresFromDocs = mapTestScoreDocuments(sampleSubmissions);
      const personalInfoFromDocs = mapPersonalInfoDocuments(sampleSubmissions);
      const languagesFromDocs =
        mapLanguageProficiencyDocuments(sampleSubmissions);

      setProfileData((prev) => ({
        ...prev,
        education: educationFromDocs,
        testScores: testScoresFromDocs,
        languages:
          languagesFromDocs.length > 0 ? languagesFromDocs : prev.languages, // Keep existing if no docs
        personalInfo: {
          ...prev.personalInfo,
          ...personalInfoFromDocs,
        },
      }));
    }, 1000);
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

  // All data now comes from documents - no modals needed
  // Modal functions removed - use Documents section instead

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
              onClick={() => handleAddDocument("Identity Documents")}
            >
              <Plus size={16} />
              Add Document
            </button>
          </div>
          <div className={styles["widget-content"]}>
            {loadingDocuments ? (
              <div className={styles["loading-placeholder"]}>
                <p>Loading personal information...</p>
              </div>
            ) : (
              <>
                <div className={styles["profile-info"]}>
                  <div className={styles["profile-avatar"]}>
                    <User size={24} />
                  </div>
                  <div className={styles["profile-details"]}>
                    <h4>{profileData.personalInfo.name || "Not provided"}</h4>
                    <p>{profileData.personalInfo.email || "Not provided"}</p>
                    <p>{profileData.personalInfo.phone || "Not provided"}</p>
                  </div>
                </div>
                <div className={styles["info-grid"]}>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Date of Birth</span>
                    <span className={styles["info-value"]}>
                      {profileData.personalInfo.dob || "Not provided"}
                    </span>
                  </div>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Nationality</span>
                    <span className={styles["info-value"]}>
                      {profileData.personalInfo.nationality || "Not provided"}
                    </span>
                  </div>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>
                      Passport Number
                    </span>
                    <span className={styles["info-value"]}>
                      {profileData.personalInfo.passport || "Not provided"}
                    </span>
                  </div>
                  <div className={styles["info-item"]}>
                    <span className={styles["info-label"]}>Address</span>
                    <span className={styles["info-value"]}>
                      {profileData.personalInfo.address || "Not provided"}
                    </span>
                  </div>
                </div>
                {(!profileData.personalInfo.name ||
                  !profileData.personalInfo.dob ||
                  !profileData.personalInfo.passport) && (
                  <div
                    className={styles["empty-state"]}
                    style={{ marginTop: "20px", padding: "20px" }}
                  >
                    <p
                      style={{ margin: 0, color: "#64748b", fontSize: "13px" }}
                    >
                      Upload identity documents to populate your personal
                      information.
                    </p>
                  </div>
                )}
              </>
            )}
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
              onClick={() => handleAddDocument("Academic Records")}
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className={styles["widget-content"]}>
            {loadingDocuments ? (
              <div className={styles["loading-placeholder"]}>
                <p>Loading education records...</p>
              </div>
            ) : profileData.education && profileData.education.length > 0 ? (
              profileData.education.map((edu) => {
                const statusBadge = getDocumentStatusBadge(
                  edu.documentStatus || "pending"
                );
                return (
                  <div
                    key={edu.id}
                    className={styles["education-item"]}
                    onClick={() => navigate(`/user/documents/${edu.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles["education-icon"]}>
                      <GraduationCap size={20} />
                    </div>
                    <div className={styles["education-details"]}>
                      <h4>{edu.degree}</h4>
                      <p>{edu.institution}</p>
                      {edu.fieldOfStudy && (
                        <p className={styles["education-field"]}>
                          {edu.fieldOfStudy}
                          {edu.gpa && ` • GPA: ${edu.gpa}`}
                        </p>
                      )}
                      <span className={styles["education-period"]}>
                        {edu.period}
                      </span>
                    </div>
                    <div className={styles["education-status"]}>
                      <span
                        className={[
                          styles["status-badge"],
                          styles[statusBadge.className],
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {statusBadge.text}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles["empty-state"]}>
                <GraduationCap size={32} className={styles["empty-icon"]} />
                <p>No education records found</p>
                <button
                  className={styles["add-document-btn"]}
                  onClick={() => handleAddDocument("Academic Records")}
                >
                  Upload Education Document
                </button>
              </div>
            )}
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
              onClick={() => handleAddDocument("Language Certificates")}
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className={styles["widget-content"]}>
            {loadingDocuments ? (
              <div className={styles["loading-placeholder"]}>
                <p>Loading language proficiency...</p>
              </div>
            ) : profileData.languages && profileData.languages.length > 0 ? (
              profileData.languages.map((lang, index) => {
                const statusBadge = getDocumentStatusBadge(
                  lang.documentStatus || "pending"
                );
                return (
                  <div
                    key={index}
                    className={styles["language-item"]}
                    onClick={() =>
                      lang.documentId &&
                      navigate(`/user/documents/${lang.documentId}`)
                    }
                    style={{
                      cursor: lang.documentId ? "pointer" : "default",
                    }}
                  >
                    <div className={styles["language-info"]}>
                      <span className={styles["language-name"]}>
                        {lang.name}
                      </span>
                      <span className={styles["language-level"]}>
                        {lang.level}
                      </span>
                    </div>
                    {lang.documentId && (
                      <div className={styles["language-status"]}>
                        <span
                          className={[
                            styles["status-badge"],
                            styles[statusBadge.className],
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {statusBadge.text}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={styles["empty-state"]}>
                <FileCheck size={32} className={styles["empty-icon"]} />
                <p>No language certificates found</p>
                <button
                  className={styles["add-document-btn"]}
                  onClick={() => handleAddDocument("Language Certificates")}
                >
                  Upload Language Certificate
                </button>
              </div>
            )}
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
              onClick={() => handleAddDocument("Language Certificates")}
            >
              <Plus size={16} />
              Add Score
            </button>
          </div>
          <div className={styles["widget-content"]}>
            {loadingDocuments ? (
              <div className={styles["loading-placeholder"]}>
                <p>Loading test scores...</p>
              </div>
            ) : profileData.testScores && profileData.testScores.length > 0 ? (
              <div className={styles["test-scores"]}>
                {profileData.testScores.map((test, index) => {
                  const statusBadge = getDocumentStatusBadge(
                    test.documentStatus || "pending"
                  );
                  return (
                    <div
                      key={index}
                      className={styles["test-item"]}
                      onClick={() =>
                        test.documentId &&
                        navigate(`/user/documents/${test.documentId}`)
                      }
                      style={{
                        cursor: test.documentId ? "pointer" : "default",
                      }}
                    >
                      <div className={styles["test-icon"]}>
                        <FileCheck size={20} />
                      </div>
                      <div className={styles["test-details"]}>
                        <h4>{test.test}</h4>
                        <span className={styles["test-score"]}>
                          {test.score}
                        </span>
                        <span className={styles["test-date"]}>{test.date}</span>
                      </div>
                      <div className={styles["test-status"]}>
                        <span
                          className={[
                            styles["status-badge"],
                            styles[statusBadge.className],
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {statusBadge.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles["empty-state"]}>
                <FileCheck size={32} className={styles["empty-icon"]} />
                <p>No test scores found</p>
                <button
                  className={styles["add-document-btn"]}
                  onClick={() => handleAddDocument("Language Certificates")}
                >
                  Upload Language Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
