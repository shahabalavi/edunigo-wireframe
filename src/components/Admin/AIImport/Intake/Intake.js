import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Globe,
  Loader2,
  Link as LinkIcon,
  Search,
  MapPin,
  Building2,
  School,
  BookOpen,
  X,
  AlertTriangle,
  Check,
} from "lucide-react";
import styles from "./Intake.module.css";

const Intake = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [aiIntakes, setAiIntakes] = useState([]);
  const [existingIntakes, setExistingIntakes] = useState([]);
  const [existingCourses, setExistingCourses] = useState([]);
  const [existingCampuses, setExistingCampuses] = useState([]);
  const [existingUniversities, setExistingUniversities] = useState([]);
  const [existingCities, setExistingCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIntakes, setSelectedIntakes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonModal, setComparisonModal] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Load all data on mount
  useEffect(() => {
    // Simulate loading countries
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

    // Simulate loading existing universities
    const sampleExistingUniversities = [
      {
        id: 1,
        name: "Harvard University",
        slug: "harvard-university",
        countryId: 1,
      },
      {
        id: 2,
        name: "University of Oxford",
        slug: "university-of-oxford",
        countryId: 2,
      },
      {
        id: 3,
        name: "University of Toronto",
        slug: "university-of-toronto",
        countryId: 3,
      },
    ];
    setExistingUniversities(sampleExistingUniversities);

    // Simulate loading existing cities
    const sampleExistingCities = [
      { id: 1, name: "New York", countryId: 1 },
      { id: 2, name: "London", countryId: 2 },
      { id: 3, name: "Toronto", countryId: 3 },
      { id: 5, name: "Cambridge", countryId: 1 },
      { id: 6, name: "Oxford", countryId: 2 },
      { id: 8, name: "Boston", countryId: 1 },
    ];
    setExistingCities(sampleExistingCities);

    // Simulate loading existing campuses
    const sampleExistingCampuses = [
      {
        id: 1,
        name: "Harvard Main Campus",
        slug: "harvard-main-campus",
        universityId: 1,
        universityName: "Harvard University",
        cityId: 5,
        cityName: "Cambridge",
        countryId: 1,
      },
      {
        id: 2,
        name: "Oxford Main Campus",
        slug: "oxford-main-campus",
        universityId: 2,
        universityName: "University of Oxford",
        cityId: 6,
        cityName: "Oxford",
        countryId: 2,
      },
    ];
    setExistingCampuses(sampleExistingCampuses);

    // Simulate loading existing courses
    const sampleExistingCourses = [
      {
        id: 1,
        name: "Computer Science",
        slug: "computer-science",
        campusId: 1,
      },
      {
        id: 2,
        name: "Software Engineering",
        slug: "software-engineering",
        campusId: 1,
      },
      {
        id: 3,
        name: "English Literature",
        slug: "english-literature",
        campusId: 2,
      },
    ];
    setExistingCourses(sampleExistingCourses);

    // Simulate loading existing intakes
    const sampleExistingIntakes = [
      {
        id: 1,
        courseName: "Computer Science",
        level: "UG",
        intakeName: "Fall 2025",
        startDate: "2025-09-15",
        applicationDeadline: "2025-06-30",
        internationalDepositDeadline: "2025-07-15",
        costDeadline: "2025-08-01",
        status: "Open",
        courseId: 1,
      },
      {
        id: 2,
        courseName: "Computer Science",
        level: "UG",
        intakeName: "Fall 2025", // Fuzzy match - same name
        startDate: "2025-09-20", // Different date
        applicationDeadline: "2025-07-01",
        internationalDepositDeadline: "2025-07-20",
        costDeadline: "2025-08-05",
        status: "Open",
        courseId: 1,
      },
    ];
    setExistingIntakes(sampleExistingIntakes);
  }, []);

  // Get cities filtered by selected country
  const filteredCities = useMemo(() => {
    if (!selectedCountry) return [];
    return existingCities.filter(
      (city) => city.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingCities]);

  // Get universities filtered by selected country
  const filteredUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return existingUniversities.filter(
      (university) => university.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingUniversities]);

  // Get campuses filtered by selected university
  const filteredCampuses = useMemo(() => {
    if (!selectedUniversity) return [];
    return existingCampuses.filter(
      (campus) => campus.universityId === parseInt(selectedUniversity)
    );
  }, [selectedUniversity, existingCampuses]);

  // Get courses filtered by selected campus
  const filteredCourses = useMemo(() => {
    if (!selectedCampus) return [];
    return existingCourses.filter(
      (course) => course.campusId === parseInt(selectedCampus)
    );
  }, [selectedCampus, existingCourses]);

  // Reset dependent selections when parent changes
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCity("");
      setSelectedUniversity("");
      setSelectedCampus("");
      setSelectedCourse("");
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedUniversity) {
      setSelectedCampus("");
      setSelectedCourse("");
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (!selectedCampus) {
      setSelectedCourse("");
    }
  }, [selectedCampus]);

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = [];

    for (let i = 0; i <= len1; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= len2; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          );
        }
      }
    }

    return matrix[len1][len2];
  };

  // Calculate similarity percentage
  const calculateSimilarity = (str1, str2) => {
    const normalized1 = str1.toLowerCase().trim().replace(/\s+/g, " ");
    const normalized2 = str2.toLowerCase().trim().replace(/\s+/g, " ");
    const maxLength = Math.max(normalized1.length, normalized2.length);
    if (maxLength === 0) return 100;
    const distance = levenshteinDistance(normalized1, normalized2);
    return ((maxLength - distance) / maxLength) * 100;
  };

  // Find fuzzy matches for intakes
  const findFuzzyMatch = (intakeName, courseName, level, courseId) => {
    const courseIntakes = existingIntakes.filter(
      (intake) => intake.courseId === courseId
    );

    let bestMatch = null;
    let bestSimilarity = 0;

    for (const existingIntake of courseIntakes) {
      // Check if course name and level match
      const courseMatch =
        existingIntake.courseName.toLowerCase() ===
        courseName.toLowerCase();
      const levelMatch = existingIntake.level === level;

      // Only consider it a match if course name and level match
      if (courseMatch && levelMatch) {
        const similarity = calculateSimilarity(
          intakeName,
          existingIntake.intakeName
        );
        if (similarity > bestSimilarity && similarity >= 70) {
          // 70% similarity threshold
          bestSimilarity = similarity;
          bestMatch = existingIntake;
        }
      }
    }

    return bestMatch ? { match: bestMatch, similarity: bestSimilarity } : null;
  };

  // Simulate AI call to get intakes
  const simulateAICall = (courseId, sourceUrlParam) => {
    console.log("AI call with source URL:", sourceUrlParam);
    console.log("Course ID:", courseId);

    // Get course info
    const course = existingCourses.find((c) => c.id === courseId);
    if (!course) return [];

    // Simulate different intake lists based on course
    const intakeData = {
      1: [
        {
          level: "UG",
          intakeName: "Fall 2025",
          startDate: "2025-09-15",
          applicationDeadline: "2025-06-30",
          internationalDepositDeadline: "2025-07-15",
          costDeadline: "2025-08-01",
          status: "Open",
        },
        {
          level: "UG",
          intakeName: "Winter 2026",
          startDate: "2026-01-20",
          applicationDeadline: "2025-10-01",
          internationalDepositDeadline: "2025-11-01",
          costDeadline: "2025-12-01",
          status: "Open",
        },
        {
          level: "UG",
          intakeName: "Fall 2025", // Fuzzy match candidate
          startDate: "2025-09-20",
          applicationDeadline: "2025-07-01",
          internationalDepositDeadline: "2025-07-20",
          costDeadline: "2025-08-05",
          status: "Open",
        },
      ],
      2: [
        {
          level: "UG",
          intakeName: "Fall 2025",
          startDate: "2025-09-10",
          applicationDeadline: "2025-06-15",
          internationalDepositDeadline: "2025-07-01",
          costDeadline: "2025-07-20",
          status: "Open",
        },
      ],
      3: [
        {
          level: "UG",
          intakeName: "Fall 2025",
          startDate: "2025-09-01",
          applicationDeadline: "2025-05-15",
          internationalDepositDeadline: "2025-06-01",
          costDeadline: "2025-07-01",
          status: "Open",
        },
      ],
    };

    const intakes = intakeData[courseId] || [];

    return intakes.map((intake) => {
      // Use the course name from the selected course
      const courseName = course.name;
      // Check for exact match (by intake name, course name, level, and course)
      const exactMatch = existingIntakes.find(
        (i) =>
          i.intakeName === intake.intakeName &&
          i.courseName.toLowerCase() === courseName.toLowerCase() &&
          i.level === intake.level &&
          i.courseId === courseId
      );

      // Check for fuzzy match
      const fuzzyMatch = !exactMatch
        ? findFuzzyMatch(
            intake.intakeName,
            courseName,
            intake.level,
            courseId
          )
        : null;

      return {
        courseName: courseName,
        level: intake.level,
        intakeName: intake.intakeName,
        startDate: intake.startDate,
        applicationDeadline: intake.applicationDeadline,
        internationalDepositDeadline: intake.internationalDepositDeadline,
        costDeadline: intake.costDeadline,
        status: intake.status,
        courseId,
        exists: !!exactMatch,
        fuzzyMatch,
      };
    });
  };

  const handleCheck = async () => {
    if (
      !selectedCountry ||
      !selectedCity ||
      !selectedUniversity ||
      !selectedCampus ||
      !selectedCourse
    ) {
      alert(
        "Please select Country, City, University, Campus, and Course"
      );
      return;
    }

    setLoading(true);
    setHasSearched(false);
    setSelectedIntakes([]);
    setSearchTerm("");
    setStatusFilter("all");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const courseId = parseInt(selectedCourse);
    const intakes = simulateAICall(courseId, sourceUrl);
    setAiIntakes(intakes);
    setHasSearched(true);
    setLoading(false);
  };

  const handleIntakeToggle = (intakeIndex) => {
    setSelectedIntakes((prev) => {
      if (prev.includes(intakeIndex)) {
        return prev.filter((idx) => idx !== intakeIndex);
      } else {
        return [...prev, intakeIndex];
      }
    });
  };


  const handleSelectAll = () => {
    const importableIntakes = filteredIntakes
      .map((intake, index) => (!intake.exists && !intake.fuzzyMatch ? index : null))
      .filter((idx) => idx !== null);
    setSelectedIntakes(importableIntakes);
  };

  const handleDeselectAll = () => {
    setSelectedIntakes([]);
  };

  const openComparisonModal = (intake) => {
    setComparisonModal({
      aiIntake: intake,
      existingIntake: intake.fuzzyMatch.match,
      override: false,
    });
  };

  const closeComparisonModal = () => {
    setComparisonModal(null);
  };

  const handleOverrideToggle = () => {
    setComparisonModal((prev) => ({
      ...prev,
      override: !prev.override,
    }));
  };

  const handleApplyComparison = () => {
    if (!comparisonModal) return;

    const { aiIntake, override } = comparisonModal;

    if (override) {
      // Update existing intake
      console.log("Updating existing intake:", aiIntake.fuzzyMatch.match.id);
      // In real app, this would be an API call
    } else {
      // Import as new intake
      console.log("Importing as new intake:", aiIntake);
      // In real app, this would be an API call
    }

    // Update the intake in the list
    setAiIntakes((prev) =>
      prev.map((intake) => {
        if (intake === aiIntake) {
          return {
            ...intake,
            exists: override,
            fuzzyMatch: override ? null : intake.fuzzyMatch,
          };
        }
        return intake;
      })
    );

    closeComparisonModal();
  };

  const handleImportSelected = () => {
    const intakesToImport = selectedIntakes.map((idx) => filteredIntakes[idx]);
    console.log("Importing intakes:", intakesToImport);
    // In real app, this would be an API call
    alert(`Importing ${intakesToImport.length} intake(s)...`);
    setSelectedIntakes([]);
  };

  // Filter intakes based on search and status filter
  const filteredIntakes = useMemo(() => {
    let filtered = [...aiIntakes];

    // Apply status filter
    if (statusFilter === "existing") {
      filtered = filtered.filter((intake) => intake.exists || intake.fuzzyMatch);
    } else if (statusFilter === "fuzzy") {
      filtered = filtered.filter((intake) => intake.fuzzyMatch);
    } else if (statusFilter === "new") {
      filtered = filtered.filter(
        (intake) => !intake.exists && !intake.fuzzyMatch
      );
    }

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((intake) => {
        return (
          intake.courseName.toLowerCase().includes(searchLower) ||
          intake.level.toLowerCase().includes(searchLower) ||
          intake.intakeName.toLowerCase().includes(searchLower) ||
          intake.startDate.includes(searchTerm) ||
          intake.applicationDeadline.includes(searchTerm) ||
          intake.internationalDepositDeadline.includes(searchTerm) ||
          intake.costDeadline.includes(searchTerm) ||
          intake.status.toLowerCase().includes(searchLower)
        );
      });
    }

    return filtered;
  }, [aiIntakes, searchTerm, statusFilter]);

  // Calculate statistics based on filtered results
  const stats = useMemo(() => {
    const total = filteredIntakes.length;
    const existing = filteredIntakes.filter(
      (intake) => intake.exists || intake.fuzzyMatch
    ).length;
    const newCount = filteredIntakes.filter(
      (intake) => !intake.exists && !intake.fuzzyMatch
    ).length;
    return { total, existing, new: newCount };
  }, [filteredIntakes]);

  const selectedCountryName = countries.find(
    (c) => c.id === parseInt(selectedCountry)
  )?.name;

  const selectedCityName = filteredCities.find(
    (c) => c.id === parseInt(selectedCity)
  )?.name;

  const selectedUniversityName = filteredUniversities.find(
    (u) => u.id === parseInt(selectedUniversity)
  )?.name;

  const selectedCampusName = filteredCampuses.find(
    (c) => c.id === parseInt(selectedCampus)
  )?.name;

  const selectedCourseName = filteredCourses.find(
    (c) => c.id === parseInt(selectedCourse)
  )?.name;

  return (
    <div className={styles["intake-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Calendar size={24} />
          </div>
          <div>
            <h1>AI Import - Intake</h1>
            <p>Import intake data using AI</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles["filter-bar"]}>
        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <Globe size={18} />
            Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className={styles["filter-select"]}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <MapPin size={18} />
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={styles["filter-select"]}
            disabled={!selectedCountry}
          >
            <option value="">Select City</option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <Building2 size={18} />
            University
          </label>
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className={styles["filter-select"]}
            disabled={!selectedCountry}
          >
            <option value="">Select University</option>
            {filteredUniversities.map((university) => (
              <option key={university.id} value={university.id}>
                {university.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <School size={18} />
            Campus
          </label>
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className={styles["filter-select"]}
            disabled={!selectedUniversity}
          >
            <option value="">Select Campus</option>
            {filteredCampuses.map((campus) => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <BookOpen size={18} />
            Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={styles["filter-select"]}
            disabled={!selectedCampus}
          >
            <option value="">Select Course</option>
            {filteredCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <LinkIcon size={18} />
            Source URL (Optional)
          </label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://example.com/intakes"
            className={styles["source-url-input"]}
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={
            loading ||
            !selectedCountry ||
            !selectedCity ||
            !selectedUniversity ||
            !selectedCampus ||
            !selectedCourse
          }
          className={styles["check-btn"]}
        >
          {loading ? (
            <>
              <Loader2 size={18} className={styles["spinner"]} />
              Checking...
            </>
          ) : (
            <>
              <Check size={18} />
              Check
            </>
          )}
        </button>
      </div>

      {/* Search and Stats Bar */}
      {hasSearched && aiIntakes.length > 0 && (
        <div className={styles["search-stats-bar"]}>
          <div className={styles["search-container"]}>
            <Search size={18} className={styles["search-icon"]} />
            <input
              type="text"
              placeholder="Search intakes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles["search-input"]}
            />
          </div>
          <div className={styles["filter-status-container"]}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles["status-filter-select"]}
            >
              <option value="all">All Intakes</option>
              <option value="existing">Existing (with Compare)</option>
              <option value="fuzzy">With Compare Button</option>
              <option value="new">New (Importable)</option>
            </select>
          </div>
          <div className={styles["stats-minimal"]}>
            Total: {stats.total} · Exists: {stats.existing} · New: {stats.new}
          </div>
        </div>
      )}

      {/* Results Table */}
      {loading && (
        <div className={styles["loading-state"]}>
          <Loader2 size={48} className={styles["spinner"]} />
          <p>Fetching intake data from AI...</p>
        </div>
      )}

      {!loading && hasSearched && (
        <>
          {filteredIntakes.length > 0 ? (
            <>
              <div className={styles["table-actions"]}>
                <button
                  onClick={handleSelectAll}
                  className={styles["select-all-btn"]}
                >
                  Select All
                </button>
                <button
                  onClick={handleDeselectAll}
                  className={styles["deselect-all-btn"]}
                >
                  Deselect All
                </button>
                <button
                  onClick={handleImportSelected}
                  disabled={selectedIntakes.length === 0}
                  className={styles["import-btn"]}
                >
                  Import Selected ({selectedIntakes.length})
                </button>
              </div>

              <div className={styles["table-container"]}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            filteredIntakes.length > 0 &&
                            filteredIntakes.every(
                              (intake, idx) =>
                                intake.exists ||
                                intake.fuzzyMatch ||
                                selectedIntakes.includes(idx)
                            )
                          }
                          onChange={(e) =>
                            e.target.checked
                              ? handleSelectAll()
                              : handleDeselectAll()
                          }
                          className={styles["select-all-checkbox"]}
                        />
                      </th>
                      <th>Course Name</th>
                      <th>Level</th>
                      <th>Intake Name</th>
                      <th>Start Date</th>
                      <th>Application Deadline</th>
                      <th>International Deposit Deadline</th>
                      <th>Cost Deadline</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIntakes.map((intake, index) => (
                      <React.Fragment key={`${intake.intakeName}-${index}`}>
                        <tr
                          className={
                            intake.exists
                              ? styles["exists-row"]
                              : intake.fuzzyMatch
                              ? styles["exists-row"]
                              : ""
                          }
                        >
                          <td>
                            {intake.exists ? (
                              <span className={styles["exists-badge"]}>
                                Exists
                              </span>
                            ) : intake.fuzzyMatch ? (
                              <span className={styles["exists-badge"]}>
                                Exists
                              </span>
                            ) : (
                              <input
                                type="checkbox"
                                checked={selectedIntakes.includes(index)}
                                onChange={() => handleIntakeToggle(index)}
                                className={styles["intake-checkbox"]}
                              />
                            )}
                          </td>
                          <td className={styles["course-name-cell"]}>
                            <span>{intake.courseName}</span>
                          </td>
                          <td className={styles["level-cell"]}>
                            <span>{intake.level}</span>
                          </td>
                          <td className={styles["intake-name-cell"]}>
                            <span>{intake.intakeName}</span>
                          </td>
                          <td className={styles["date-cell"]}>
                            <span>{intake.startDate}</span>
                          </td>
                          <td className={styles["date-cell"]}>
                            <span>{intake.applicationDeadline}</span>
                          </td>
                          <td className={styles["date-cell"]}>
                            <span>{intake.internationalDepositDeadline}</span>
                          </td>
                          <td className={styles["date-cell"]}>
                            <span>{intake.costDeadline}</span>
                          </td>
                          <td>
                            <span
                              className={
                                intake.status === "Open"
                                  ? styles["status-active"]
                                  : styles["status-inactive"]
                              }
                            >
                              {intake.status}
                            </span>
                          </td>
                          <td>
                            {intake.exists || intake.fuzzyMatch ? (
                              <div className={styles["action-cell"]}>
                                <span className={styles["exists-label"]}>
                                  Exists
                                </span>
                                {intake.fuzzyMatch && (
                                  <button
                                    onClick={() => openComparisonModal(intake)}
                                    className={styles["compare-btn"]}
                                  >
                                    Compare
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span className={styles["ready-label"]}>
                                Ready to import
                              </span>
                            )}
                          </td>
                        </tr>
                        {intake.fuzzyMatch && (
                          <tr className={styles["fuzzy-match-row"]}>
                            <td colSpan="10">
                              <div className={styles["fuzzy-match-warning"]}>
                                <AlertTriangle size={16} />
                                <span>
                                  A similar intake exists. You may override or
                                  import as new.
                                </span>
                                <button
                                  onClick={() => openComparisonModal(intake)}
                                  className={styles["compare-btn"]}
                                >
                                  Compare
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className={styles["empty-state"]}>
              <Calendar size={48} className={styles["empty-icon"]} />
              <h3>
                {searchTerm
                  ? "No intakes match your search"
                  : "No intakes found"}
              </h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "Click 'Check' to fetch intake data from AI"}
              </p>
            </div>
          )}
        </>
      )}

      {!loading && !hasSearched && (
        <div className={styles["empty-state"]}>
          <Calendar size={48} className={styles["empty-icon"]} />
          <h3>Ready to Import Intakes</h3>
          <p>
            Select Country, City, University, Campus, and Course, then click
            "Check" to fetch intake data from AI
          </p>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonModal && (
        <div className={styles["modal-overlay"]} onClick={closeComparisonModal}>
          <div
            className={styles["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <h2>Compare Intake</h2>
              <button
                onClick={closeComparisonModal}
                className={styles["modal-close"]}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles["comparison-container"]}>
              <div className={styles["comparison-column"]}>
                <h3>AI-Generated Intake</h3>
                <div className={styles["comparison-field"]}>
                  <label>Course Name</label>
                  <div>{comparisonModal.aiIntake.courseName}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Level</label>
                  <div>{comparisonModal.aiIntake.level}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Intake Name</label>
                  <div>{comparisonModal.aiIntake.intakeName}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Start Date</label>
                  <div>{comparisonModal.aiIntake.startDate}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Application Deadline</label>
                  <div>{comparisonModal.aiIntake.applicationDeadline}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>International Deposit Deadline</label>
                  <div>
                    {comparisonModal.aiIntake.internationalDepositDeadline}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Cost Deadline</label>
                  <div>{comparisonModal.aiIntake.costDeadline}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Status</label>
                  <div>{comparisonModal.aiIntake.status}</div>
                </div>
              </div>

              <div className={styles["comparison-column"]}>
                <h3>Existing Intake</h3>
                <div className={styles["comparison-field"]}>
                  <label>Course Name</label>
                  <div>{comparisonModal.existingIntake.courseName}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Level</label>
                  <div>{comparisonModal.existingIntake.level}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Intake Name</label>
                  <div>{comparisonModal.existingIntake.intakeName}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Start Date</label>
                  <div>{comparisonModal.existingIntake.startDate}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Application Deadline</label>
                  <div>{comparisonModal.existingIntake.applicationDeadline}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>International Deposit Deadline</label>
                  <div>
                    {comparisonModal.existingIntake.internationalDepositDeadline}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Cost Deadline</label>
                  <div>{comparisonModal.existingIntake.costDeadline}</div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Status</label>
                  <div>{comparisonModal.existingIntake.status}</div>
                </div>
              </div>
            </div>

            <div className={styles["override-section"]}>
              <div className={styles["override-option"]}>
                <label className={styles["override-checkbox-label"]}>
                  <input
                    type="checkbox"
                    checked={comparisonModal.override}
                    onChange={handleOverrideToggle}
                    className={styles["override-checkbox-input"]}
                  />
                  <span className={styles["override-checkbox-custom"]}></span>
                  <div className={styles["override-content"]}>
                    <div className={styles["override-title"]}>Override</div>
                    <div className={styles["override-description"]}>
                      Update the existing intake with the AI-generated data
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className={styles["modal-footer"]}>
              <button
                onClick={closeComparisonModal}
                className={styles["cancel-btn"]}
              >
                Cancel
              </button>
              <button
                onClick={handleApplyComparison}
                className={styles["apply-btn"]}
              >
                {comparisonModal.override
                  ? "Update Existing Intake"
                  : "Import as New Intake"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Intake;
