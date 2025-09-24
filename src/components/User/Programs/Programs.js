import React, { useState } from "react";
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  BookOpen,
  Heart,
  ExternalLink,
  X,
  GraduationCap,
  Code,
  Microscope,
  Briefcase,
  Palette,
  Calculator,
  Globe,
  Brain,
  Sparkles,
  Trash2,
  SlidersHorizontal,
  Check,
  Pin,
  PinOff,
  Trophy,
  FileText,
} from "lucide-react";
import styles from "./Programs.module.css";

const Programs = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterField, setFilterField] = useState("all");
  const [favorites, setFavorites] = useState([1, 3]);
  const [aiResults, setAiResults] = useState([]);
  const [showAiResults, setShowAiResults] = useState(false);
  const [appliedPrograms, setAppliedPrograms] = useState([]);

  // Filter sidebar state
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isFilterSidebarPinned, setIsFilterSidebarPinned] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [durationFilter, setDurationFilter] = useState("all");
  const [acceptanceRateFilter, setAcceptanceRateFilter] = useState("all");

  // AI GoIQ Modal state
  const [showAiGoIqModal, setShowAiGoIqModal] = useState(false);
  const [aiGoIqAnswers, setAiGoIqAnswers] = useState({});
  const [aiGoIqErrors, setAiGoIqErrors] = useState({});
  const [isAiGoIqSearching, setIsAiGoIqSearching] = useState(false);

  const programs = [
    {
      id: 1,
      name: "Master of Computer Science",
      field: "Computer Science",
      university: "Stanford University",
      country: "United States",
      city: "Stanford, CA",
      ranking: 1,
      duration: "2 years",
      tuition: "$58,000/year",
      students: "1,200",
      acceptanceRate: "4%",
      deadline: "Dec 15, 2024",
      description:
        "Advanced program focusing on theoretical foundations and practical applications in computer science, with emphasis on AI, machine learning, and software engineering.",
      requirements: ["Bachelor's degree", "GRE scores", "TOEFL/IELTS"],
      icon: Code,
    },
    {
      id: 2,
      name: "Master of Data Science",
      field: "Data Science",
      university: "MIT",
      country: "United States",
      city: "Cambridge, MA",
      ranking: 2,
      duration: "2 years",
      tuition: "$55,000/year",
      students: "800",
      acceptanceRate: "7%",
      deadline: "Dec 20, 2024",
      description:
        "Comprehensive program covering statistical analysis, machine learning, big data technologies, and data visualization techniques.",
      requirements: [
        "Bachelor's degree",
        "Mathematics background",
        "GRE scores",
      ],
      icon: Calculator,
    },
    {
      id: 3,
      name: "Master of Artificial Intelligence",
      field: "AI & Machine Learning",
      university: "University of Cambridge",
      country: "United Kingdom",
      city: "Cambridge",
      ranking: 3,
      duration: "1 year",
      tuition: "£35,000/year",
      students: "150",
      acceptanceRate: "12%",
      deadline: "Jan 15, 2025",
      description:
        "Cutting-edge program exploring advanced AI techniques, neural networks, natural language processing, and robotics.",
      requirements: [
        "Bachelor's degree",
        "Strong math background",
        "IELTS 7.0",
      ],
      icon: Microscope,
    },
    {
      id: 4,
      name: "Master of Business Administration",
      field: "Business",
      university: "Harvard Business School",
      country: "United States",
      city: "Boston, MA",
      ranking: 1,
      duration: "2 years",
      tuition: "$73,440/year",
      students: "1,800",
      acceptanceRate: "11%",
      deadline: "Jan 3, 2025",
      description:
        "World-renowned MBA program focusing on leadership, strategy, and global business practices with extensive case study methodology.",
      requirements: [
        "Bachelor's degree",
        "GMAT/GRE",
        "Work experience",
        "TOEFL",
      ],
      icon: Briefcase,
    },
    {
      id: 5,
      name: "Master of Fine Arts",
      field: "Arts & Design",
      university: "Royal College of Art",
      country: "United Kingdom",
      city: "London",
      ranking: 1,
      duration: "2 years",
      tuition: "£29,000/year",
      students: "200",
      acceptanceRate: "15%",
      deadline: "Feb 1, 2025",
      description:
        "Prestigious program for emerging artists and designers, offering studio-based learning and critical theory.",
      requirements: ["Bachelor's degree", "Portfolio", "IELTS 6.5"],
      icon: Palette,
    },
    {
      id: 6,
      name: "Master of International Relations",
      field: "Social Sciences",
      university: "University of Oxford",
      country: "United Kingdom",
      city: "Oxford",
      ranking: 2,
      duration: "1 year",
      tuition: "£28,000/year",
      students: "300",
      acceptanceRate: "18%",
      deadline: "Jan 20, 2025",
      description:
        "Comprehensive study of global politics, international law, and diplomatic relations with focus on contemporary issues.",
      requirements: ["Bachelor's degree", "IELTS 7.5", "Writing sample"],
      icon: Globe,
    },
  ];

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Netherlands",
    "Sweden",
  ];
  const fields = [
    "Computer Science",
    "Data Science",
    "AI & Machine Learning",
    "Business",
    "Arts & Design",
    "Social Sciences",
    "Engineering",
    "Medicine",
    "Law",
  ];
  const durations = ["all", "1 year", "1.5 years", "2 years", "3+ years"];
  const acceptanceRates = ["all", "Under 10%", "10-20%", "20-30%", "30%+"];

  // AI GoIQ Questions (first 5 GoCheck questions)
  const aiGoIqQuestions = [
    {
      id: "countryInterest",
      title: "Where would you love to study? 🌍",
      subtitle: "This helps us find the perfect programs for you",
      type: "select",
      icon: MapPin,
      placeholder: "Choose your dream study destination",
      options: [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "Germany",
        "France",
        "Spain",
        "Italy",
        "Netherlands",
        "Sweden",
        "Norway",
        "Japan",
        "South Korea",
        "Singapore",
        "New Zealand",
        "Other",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please select your dream study destination";
        return null;
      },
    },
    {
      id: "countryOrigin",
      title: "What's your country of origin? 🏠",
      subtitle: "This helps us understand your background better",
      type: "text",
      icon: Globe,
      placeholder: "e.g., India, Brazil, Nigeria, etc.",
      required: true,
      validation: (value) => {
        if (!value || !value.trim())
          return "Your country helps us personalize recommendations";
        return null;
      },
    },
    {
      id: "education",
      title: "What's your highest education level? 🎓",
      subtitle: "This determines which programs you're eligible for",
      type: "select",
      icon: GraduationCap,
      placeholder: "Select your education level",
      options: [
        "High School Diploma",
        "Associate Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "Doctoral Degree (PhD)",
        "Professional Degree",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please select your education level";
        return null;
      },
    },
    {
      id: "gpa",
      title: "What's your final GPA or grade? 📊",
      subtitle: "The more accurate this is, the better we can match you",
      type: "text",
      icon: Trophy,
      placeholder: "e.g., 3.8/4.0 or 85% or A-",
      required: true,
      validation: (value) => {
        if (!value || !value.trim())
          return "GPA helps us find the right programs for you";
        return null;
      },
    },
    {
      id: "englishTest",
      title: "Do you have an English test score? 📝",
      subtitle: "This really helps with your application success",
      type: "select",
      icon: FileText,
      placeholder: "Select your English test status",
      options: [
        "Yes, IELTS",
        "Yes, TOEFL",
        "Yes, other test",
        "No, I don't have any yet",
      ],
      required: true,
      validation: (value) => {
        if (!value) return "Please let us know about your English test status";
        return null;
      },
    },
  ];

  const getFieldIcon = (field) => {
    const icons = {
      "Computer Science": Code,
      "Data Science": Calculator,
      "AI & Machine Learning": Microscope,
      Business: Briefcase,
      "Arts & Design": Palette,
      "Social Sciences": Globe,
    };
    return icons[field] || GraduationCap;
  };

  // Filter functions
  const toggleCountry = (country) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const toggleField = (field) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const applyFilters = () => {
    // Apply the sidebar filters to the main filter state
    setFilterCountry(
      selectedCountries.length > 0 ? selectedCountries[0] : "all"
    );
    setFilterField(selectedFields.length > 0 ? selectedFields[0] : "all");
    if (!isFilterSidebarPinned) {
      setIsFilterSidebarOpen(false);
    }
  };

  const toggleSidebarPin = () => {
    setIsFilterSidebarPinned(!isFilterSidebarPinned);
  };

  const closeSidebar = () => {
    if (!isFilterSidebarPinned) {
      setIsFilterSidebarOpen(false);
    }
  };

  const handleSidebarBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeSidebar();
    }
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedFields([]);
    setPriceRange([0, 100000]);
    setDurationFilter("all");
    setAcceptanceRateFilter("all");
    setFilterCountry("all");
    setFilterField("all");
  };

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.field.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry =
      filterCountry === "all" ||
      selectedCountries.length === 0 ||
      selectedCountries.includes(program.country);

    const matchesField =
      filterField === "all" ||
      selectedFields.length === 0 ||
      selectedFields.includes(program.field);

    const matchesDuration =
      durationFilter === "all" || program.duration === durationFilter;

    // Parse tuition for price filtering
    const tuitionMatch = program.tuition.match(/\$(\d+)/);
    const programPrice = tuitionMatch ? parseInt(tuitionMatch[1]) * 1000 : 0;
    const matchesPrice =
      programPrice >= priceRange[0] && programPrice <= priceRange[1];

    return (
      matchesSearch &&
      matchesCountry &&
      matchesField &&
      matchesDuration &&
      matchesPrice
    );
  });

  const toggleFavorite = (programId) => {
    setFavorites((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const openModal = (program) => {
    setActiveModal(program);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // AI Search Simulation Functions (kept for backward compatibility)
  // const simulateAiSearch = async () => {
  //   // This function is now replaced by the AI GoIQ modal functionality
  // };

  const clearAiResults = () => {
    setAiResults([]);
    setShowAiResults(false);
  };

  // AI GoIQ Modal Functions
  const openAiGoIqModal = () => {
    setShowAiGoIqModal(true);
    setAiGoIqAnswers({});
    setAiGoIqErrors({});
  };

  const closeAiGoIqModal = () => {
    setShowAiGoIqModal(false);
    setAiGoIqAnswers({});
    setAiGoIqErrors({});
    setIsAiGoIqSearching(false);
  };

  const handleAiGoIqInputChange = (questionId, value) => {
    setAiGoIqAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error when user starts typing/selecting
    const question = aiGoIqQuestions.find((q) => q.id === questionId);
    if (question) {
      const error = question.validation(value || "");
      setAiGoIqErrors((prev) => ({
        ...prev,
        [questionId]: error,
      }));
    }
  };

  const validateAiGoIqForm = () => {
    const errors = {};
    let isValid = true;

    aiGoIqQuestions.forEach((question) => {
      const value = aiGoIqAnswers[question.id];
      const error = question.validation(value || "");
      if (error) {
        errors[question.id] = error;
        isValid = false;
      }
    });

    setAiGoIqErrors(errors);
    return isValid;
  };

  const handleAiGoIqSearch = async () => {
    if (!validateAiGoIqForm()) {
      return;
    }

    setIsAiGoIqSearching(true);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate AI results based on the form data
    const aiGeneratedResults = [
      {
        ...programs[0], // Stanford Computer Science
        id: "ai-goiq-1",
        matchScore: 95,
        aiGenerated: true,
        aiReason: `Perfect match for your ${aiGoIqAnswers.education} background and interest in ${aiGoIqAnswers.countryInterest}`,
      },
      {
        ...programs[2], // Cambridge AI
        id: "ai-goiq-2",
        matchScore: 92,
        aiGenerated: true,
        aiReason: `Excellent fit based on your ${aiGoIqAnswers.gpa} GPA and ${aiGoIqAnswers.education} degree`,
      },
      {
        ...programs[4], // Oxford International Relations
        id: "ai-goiq-3",
        matchScore: 88,
        aiGenerated: true,
        aiReason: `Strong match considering your origin from ${aiGoIqAnswers.countryOrigin} and interest in ${aiGoIqAnswers.countryInterest}`,
      },
    ];

    setAiResults(aiGeneratedResults);
    setShowAiResults(true);
    setIsAiGoIqSearching(false);
    closeAiGoIqModal();
  };

  const handleApplyToProgram = (program) => {
    // Add program to applied programs list
    setAppliedPrograms((prev) => {
      if (!prev.find((p) => p.id === program.id)) {
        return [...prev, { ...program, appliedDate: new Date().toISOString() }];
      }
      return prev;
    });

    // Close modal
    setActiveModal(null);

    // Show success message
    alert(`Successfully applied to ${program.name} at ${program.university}!`);

    // TODO: In a real app, this would redirect to the Applications page
    // For now, we'll just show the success message
    console.log("Applied program:", program);
  };

  const renderProgramCard = (program) => {
    const FieldIcon = getFieldIcon(program.field);
    const isFavorite = favorites.includes(program.id);
    const isAiResult = program.aiGenerated;

    return (
      <div
        key={program.id}
        className={[styles["program-card"], isAiResult ? "ai-result" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles["program-header"]}>
          <div className={styles["program-icon"]}>
            <FieldIcon size={24} />
          </div>
          <div className={styles["program-actions"]}>
            {isAiResult && (
              <div className={styles["ai-badge"]}>
                <Brain size={14} />
                <span>AI Match</span>
              </div>
            )}
            <button
              className={`${styles["favorite-btn"]} ${
                isFavorite ? styles["active"] : ""
              }`.trim()}
              onClick={() => toggleFavorite(program.id)}
            >
              <Heart size={16} />
            </button>
          </div>
        </div>

        <div className={styles["program-content"]}>
          <h3 className={styles["program-name"]}>{program.name}</h3>
          <p className={styles["program-field"]}>{program.field}</p>

          {isAiResult && (
            <div className={styles["match-score"]}>
              <div className={styles["match-score-header"]}>
                <Sparkles size={16} />
                <span>Match Score</span>
              </div>
              <div className={styles["match-score-value"]}>
                <span className={styles["score-number"]}>
                  {program.matchScore}%
                </span>
                <div className={styles["score-bar"]}>
                  <div
                    className={styles["score-fill"]}
                    style={{ width: `${program.matchScore}%` }}
                  ></div>
                </div>
              </div>
              <p className={styles["match-reason"]}>{program.aiReason}</p>
            </div>
          )}

          <div className={styles["university-info"]}>
            <div className={styles["university-name"]}>
              <GraduationCap size={16} />
              <span>{program.university}</span>
            </div>
            <div className={styles["university-location"]}>
              <MapPin size={16} />
              <span>
                {program.city}, {program.country}
              </span>
            </div>
          </div>

          <div className={styles["program-stats"]}>
            <div className={styles["stat-item"]}>
              <Calendar size={14} />
              <span>{program.duration}</span>
            </div>
            <div className={styles["stat-item"]}>
              <DollarSign size={14} />
              <span>{program.tuition}</span>
            </div>
            <div className={styles["stat-item"]}>
              <Users size={14} />
              <span>{program.students} students</span>
            </div>
          </div>

          <p className={styles["program-description"]}>{program.description}</p>

          <div className={styles["program-footer"]}>
            <div className={styles["program-deadline"]}>
              <Calendar size={14} />
              <span>Deadline: {program.deadline}</span>
            </div>
            <button
              className={styles["apply-btn"]}
              onClick={() => openModal(program)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = () => {
    if (!activeModal) return null;

    return (
      <div className={styles["modal-overlay"]} onClick={closeModal}>
        <div className={styles["modal"]} onClick={(e) => e.stopPropagation()}>
          <div className={styles["modal-header"]}>
            <h3>{activeModal.name}</h3>
            <button className={styles["close-btn"]} onClick={closeModal}>
              <X size={20} />
            </button>
          </div>

          <div className={styles["modal-content"]}>
            <div className={styles["modal-program-info"]}>
              <div className={styles["modal-university"]}>
                <GraduationCap size={20} />
                <div>
                  <h4>{activeModal.university}</h4>
                  <p>
                    {activeModal.city}, {activeModal.country}
                  </p>
                </div>
              </div>

              <div className={styles["modal-details"]}>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>Field:</span>
                  <span className={styles["detail-value"]}>
                    {activeModal.field}
                  </span>
                </div>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>Duration:</span>
                  <span className={styles["detail-value"]}>
                    {activeModal.duration}
                  </span>
                </div>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>Tuition:</span>
                  <span className={styles["detail-value"]}>
                    {activeModal.tuition}
                  </span>
                </div>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>
                    Acceptance Rate:
                  </span>
                  <span className={styles["detail-value"]}>
                    {activeModal.acceptanceRate}
                  </span>
                </div>
                <div className={styles["detail-row"]}>
                  <span className={styles["detail-label"]}>
                    Application Deadline:
                  </span>
                  <span className={styles["detail-value"]}>
                    {activeModal.deadline}
                  </span>
                </div>
              </div>

              <div className={styles["modal-requirements"]}>
                <h4>Requirements:</h4>
                <ul>
                  {activeModal.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className={styles["modal-description"]}>
                <h4>Program Description:</h4>
                <p>{activeModal.description}</p>
              </div>
            </div>
          </div>

          <div className={styles["modal-footer"]}>
            <button className={styles["btn-secondary"]} onClick={closeModal}>
              Close
            </button>
            <button
              className={styles["btn-primary"]}
              onClick={() => handleApplyToProgram(activeModal)}
            >
              <ExternalLink size={16} />
              Apply Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAiGoIqModal = () => {
    if (!showAiGoIqModal) return null;

    const renderQuestionInput = (question) => {
      const hasError = aiGoIqErrors[question.id];

      switch (question.type) {
        case "text":
          return (
            <div className={styles["ai-goiq-input-container"]}>
              <div className={styles["ai-goiq-input-wrapper"]}>
                <input
                  type="text"
                  value={aiGoIqAnswers[question.id] || ""}
                  onChange={(e) =>
                    handleAiGoIqInputChange(question.id, e.target.value)
                  }
                  placeholder={question.placeholder}
                  className={[
                    styles["ai-goiq-input"],
                    hasError ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              </div>
              {hasError && (
                <p className={styles["ai-goiq-error"]}>{hasError}</p>
              )}
            </div>
          );

        case "select":
          return (
            <div className={styles["ai-goiq-input-container"]}>
              <div className={styles["ai-goiq-select-wrapper"]}>
                <select
                  value={aiGoIqAnswers[question.id] || ""}
                  onChange={(e) =>
                    handleAiGoIqInputChange(question.id, e.target.value)
                  }
                  className={[
                    styles["ai-goiq-select"],
                    hasError ? styles["error"] : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <option value="">{question.placeholder}</option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {hasError && (
                <p className={styles["ai-goiq-error"]}>{hasError}</p>
              )}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className={styles["modal-overlay"]} onClick={closeAiGoIqModal}>
        <div
          className={styles["ai-goiq-modal"]}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles["ai-goiq-modal-header"]}>
            <div className={styles["ai-goiq-header-content"]}>
              <div className={styles["ai-goiq-icon"]}>
                <Brain size={24} />
              </div>
              <div>
                <h3>AI GoIQ Assessment</h3>
                <p>
                  Answer these questions to get personalized program
                  recommendations
                </p>
              </div>
            </div>
            <button className={styles["close-btn"]} onClick={closeAiGoIqModal}>
              <X size={20} />
            </button>
          </div>

          <div className={styles["ai-goiq-modal-content"]}>
            <div className={styles["ai-goiq-questions"]}>
              {aiGoIqQuestions.map((question, index) => {
                const IconComponent = question.icon;
                return (
                  <div key={question.id} className={styles["ai-goiq-question"]}>
                    <div className={styles["ai-goiq-question-header"]}>
                      <div className={styles["ai-goiq-question-icon"]}>
                        <IconComponent size={20} />
                      </div>
                      <div className={styles["ai-goiq-question-content"]}>
                        <h4>{question.title}</h4>
                        <p>{question.subtitle}</p>
                      </div>
                    </div>
                    {renderQuestionInput(question)}
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles["ai-goiq-modal-footer"]}>
            <button
              className={styles["btn-secondary"]}
              onClick={closeAiGoIqModal}
            >
              Cancel
            </button>
            <button
              className={[
                styles["goiq-button"],
                styles["ai-goiq-search-button"],
                isAiGoIqSearching ? styles["loading"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={handleAiGoIqSearch}
              disabled={isAiGoIqSearching}
            >
              {isAiGoIqSearching ? (
                <span>AI Searching...</span>
              ) : (
                <>
                  <Brain size={16} />
                  <span>Find My Programs</span>
                  <div className={styles["ripple-effect"]}></div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles["programs-content"]}>
      <div className={styles["dashboard-header"]}>
        <div className={styles["header-content"]}>
          <h1>Programs Explorer</h1>
          <p>
            Discover and explore graduate programs from top universities
            worldwide
          </p>
        </div>
      </div>

      <div className={styles["programs-main-layout"]}>
        {/* Filter Sidebar Backdrop */}
        {isFilterSidebarOpen && (
          <div
            className={styles["sidebar-backdrop"]}
            onClick={handleSidebarBackdropClick}
          />
        )}

        {/* Filter Sidebar */}
        <div
          className={[
            styles["filter-sidebar"],
            isFilterSidebarOpen ? styles["open"] : "",
            isFilterSidebarPinned ? styles["pinned"] : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["sidebar-header"]}>
            <h3>Filters</h3>
            <div className={styles["sidebar-controls"]}>
              <button
                className={[
                  styles["pin-btn"],
                  isFilterSidebarPinned ? styles["pinned"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={toggleSidebarPin}
                title={isFilterSidebarPinned ? "Unpin sidebar" : "Pin sidebar"}
              >
                {isFilterSidebarPinned ? (
                  <Pin size={16} />
                ) : (
                  <PinOff size={16} />
                )}
              </button>
              <button
                className={styles["close-sidebar-btn"]}
                onClick={closeSidebar}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className={styles["filter-sections"]}>
            {/* Countries Multi-select */}
            <div className={styles["filter-section"]}>
              <div className={styles["filter-section-header"]}>
                <MapPin size={16} />
                <span>Countries</span>
              </div>
              <div className={styles["multi-select-options"]}>
                {countries.map((country) => (
                  <label
                    key={country}
                    className={styles["multi-select-option"]}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => toggleCountry(country)}
                    />
                    <span className={styles["checkmark"]}>
                      <Check size={12} />
                    </span>
                    <span className={styles["option-label"]}>{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fields Multi-select */}
            <div className={styles["filter-section"]}>
              <div className={styles["filter-section-header"]}>
                <BookOpen size={16} />
                <span>Fields of Study</span>
              </div>
              <div className={styles["multi-select-options"]}>
                {fields.map((field) => (
                  <label key={field} className={styles["multi-select-option"]}>
                    <input
                      type="checkbox"
                      checked={selectedFields.includes(field)}
                      onChange={() => toggleField(field)}
                    />
                    <span className={styles["checkmark"]}>
                      <Check size={12} />
                    </span>
                    <span className={styles["option-label"]}>{field}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Select */}
            <div className={styles["filter-section"]}>
              <div className={styles["filter-section-header"]}>
                <Calendar size={16} />
                <span>Duration</span>
              </div>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className={styles["filter-select"]}
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration === "all" ? "All Durations" : duration}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className={styles["filter-section"]}>
              <div className={styles["filter-section-header"]}>
                <DollarSign size={16} />
                <span>Tuition Range</span>
              </div>
              <div className={styles["range-slider-container"]}>
                <div className={styles["range-values"]}>
                  <span>${priceRange[0].toLocaleString()}</span>
                  <span>${priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className={styles["range-slider"]}
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className={styles["range-slider"]}
                />
              </div>
            </div>

            {/* Acceptance Rate Select */}
            <div className={styles["filter-section"]}>
              <div className={styles["filter-section-header"]}>
                <Users size={16} />
                <span>Acceptance Rate</span>
              </div>
              <select
                value={acceptanceRateFilter}
                onChange={(e) => setAcceptanceRateFilter(e.target.value)}
                className={styles["filter-select"]}
              >
                {acceptanceRates.map((rate) => (
                  <option key={rate} value={rate}>
                    {rate === "all" ? "All Rates" : rate}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles["sidebar-footer"]}>
            <button
              className={styles["clear-filters-btn"]}
              onClick={clearFilters}
            >
              Clear All
            </button>
            <button
              className={styles["apply-filters-btn"]}
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles["programs-main-content"]}>
          <div className={styles["programs-filters"]}>
            <div className={styles["search-box"]}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search programs, universities, or fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className={styles["filter-toggle-btn"]}
              onClick={() => setIsFilterSidebarOpen(true)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {(selectedCountries.length > 0 || selectedFields.length > 0) && (
                <span className={styles["filter-count"]}>
                  {selectedCountries.length + selectedFields.length}
                </span>
              )}
            </button>

            <button className={styles["goiq-button"]} onClick={openAiGoIqModal}>
              <Brain size={16} />
              <span>AI GoIQ</span>
              <div className={styles["ripple-effect"]}></div>
            </button>

            {showAiResults && (
              <button
                className={styles["clear-ai-button"]}
                onClick={clearAiResults}
              >
                <Trash2 size={16} />
                <span>Clear AI Results</span>
              </button>
            )}
          </div>

          {showAiResults && (
            <div className={styles["ai-results-header"]}>
              <div className={styles["ai-results-title"]}>
                <Brain size={20} />
                <h3>AI-Powered Recommendations</h3>
                <span className={styles["ai-results-count"]}>
                  {aiResults.length} matches found
                </span>
              </div>
              <p className={styles["ai-results-subtitle"]}>
                These programs were selected based on your profile and
                preferences using our AI matching system.
              </p>
            </div>
          )}

          <div className={styles["programs-grid"]}>
            {showAiResults
              ? aiResults.map(renderProgramCard)
              : filteredPrograms.map(renderProgramCard)}
          </div>

          {!showAiResults && filteredPrograms.length === 0 && (
            <div className={styles["no-results"]}>
              <BookOpen size={48} />
              <h3>No programs found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          )}

          {showAiResults && aiResults.length === 0 && (
            <div className={styles["no-results"]}>
              <Brain size={48} />
              <h3>No AI matches found</h3>
              <p>Try running the AI search again or adjust your profile</p>
            </div>
          )}

          {showAiResults && aiResults.length > 0 && (
            <div className={styles["profile-completion-tip"]}>
              <div className={styles["tip-icon"]}>
                <Brain size={16} />
              </div>
              <div className={styles["tip-content"]}>
                <h4>Improve Your AI Results</h4>
                <p>
                  Complete your profile with more details about your academic
                  background, career goals, and preferences to get even better
                  AI-powered program recommendations.
                </p>
              </div>
            </div>
          )}

          {appliedPrograms.length > 0 && (
            <div className={styles["applied-programs-section"]}>
              <div className={styles["section-header"]}>
                <h2>Your Applied Programs</h2>
                <span className={styles["applied-count"]}>
                  {appliedPrograms.length} program
                  {appliedPrograms.length !== 1 ? "s" : ""} applied
                </span>
              </div>
              <div className={styles["programs-grid"]}>
                {appliedPrograms.map(renderProgramCard)}
              </div>
            </div>
          )}
        </div>
      </div>

      {renderModal()}
      {renderAiGoIqModal()}
    </div>
  );
};

export default Programs;
