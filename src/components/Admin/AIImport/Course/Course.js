import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Check,
  Globe,
  Loader2,
  Link as LinkIcon,
  Search,
  MapPin,
  Building2,
  School,
  GraduationCap,
  Briefcase,
  X,
  AlertTriangle,
} from "lucide-react";
import styles from "./Course.module.css";

const Course = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [aiCourses, setAiCourses] = useState([]);
  const [existingCourses, setExistingCourses] = useState([]);
  const [existingCampuses, setExistingCampuses] = useState([]);
  const [existingUniversities, setExistingUniversities] = useState([]);
  const [existingCities, setExistingCities] = useState([]);
  const [existingEducationLevels, setExistingEducationLevels] = useState([]);
  const [existingMajors, setExistingMajors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [comparisonModal, setComparisonModal] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "existing", "new", "fuzzy"

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
        name: "Computer  Science", // Fuzzy match - extra space
        slug: "computer-science",
        description: "Comprehensive study of computer science fundamentals.",
        status: "Active",
        educationLevelId: 1, // Bachelor's Degree
        majorId: 1, // Computer Science
        campusId: 1, // Harvard Main Campus
      },
      {
        id: 2,
        name: "SoftwareEngineering", // Fuzzy match - missing space
        slug: "software-engineering",
        description: "Software development and engineering principles.",
        status: "Active",
        educationLevelId: 1, // Bachelor's Degree
        majorId: 1, // Computer Science
        campusId: 1, // Harvard Main Campus
      },
      {
        id: 3,
        name: "Data  Science", // Fuzzy match - extra space
        slug: "data-science",
        description: "Advanced data analysis and machine learning.",
        status: "Active",
        educationLevelId: 2, // Master's Degree
        majorId: 1, // Computer Science (assuming Data Science maps to Computer Science)
        campusId: 1, // Harvard Main Campus
      },
    ];
    setExistingCourses(sampleExistingCourses);

    // Simulate loading existing education levels
    const sampleEducationLevels = [
      { id: 1, name: "Bachelor's Degree" },
      { id: 2, name: "Master's Degree" },
      { id: 3, name: "Doctorate" },
      { id: 4, name: "Certificate" },
    ];
    setExistingEducationLevels(sampleEducationLevels);

    // Simulate loading existing majors
    const sampleMajors = [
      { id: 1, name: "Computer Science" },
      { id: 2, name: "Business Administration" },
      { id: 3, name: "Engineering" },
      { id: 4, name: "Medicine" },
      { id: 5, name: "Law" },
    ];
    setExistingMajors(sampleMajors);
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
      (uni) => uni.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingUniversities]);

  // Get campuses filtered by selected university
  const filteredCampuses = useMemo(() => {
    if (!selectedUniversity) return [];
    return existingCampuses.filter(
      (campus) => campus.universityId === parseInt(selectedUniversity)
    );
  }, [selectedUniversity, existingCampuses]);

  // Reset filters when parent changes
  useEffect(() => {
    setSelectedCity("");
    setSelectedUniversity("");
    setSelectedCampus("");
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCampus("");
  }, [selectedUniversity]);

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Calculate Levenshtein distance for fuzzy matching
  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;

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

  // Find fuzzy matches for courses
  const findFuzzyMatch = (courseName, educationLevelId, majorId, campusId) => {
    // Only check courses in the same campus
    const campusCourses = existingCourses.filter(
      (course) => course.campusId === campusId
    );

    let bestMatch = null;
    let bestSimilarity = 0;

    for (const existingCourse of campusCourses) {
      // Check if education level and major match
      const educationLevelMatch = existingCourse.educationLevelId === educationLevelId;
      const majorMatch = existingCourse.majorId === majorId;

      // Only consider it a match if education level and major match
      if (educationLevelMatch && majorMatch) {
        const similarity = calculateSimilarity(courseName, existingCourse.name);
        if (similarity > bestSimilarity && similarity >= 70) {
          // 70% similarity threshold
          bestSimilarity = similarity;
          bestMatch = existingCourse;
        }
      }
    }

    return bestMatch ? { match: bestMatch, similarity: bestSimilarity } : null;
  };

  // Check if education level exists
  const checkEducationLevelExists = (levelName) => {
    return existingEducationLevels.find(
      (level) => level.name.toLowerCase() === levelName.toLowerCase()
    );
  };

  // Check if major exists
  const checkMajorExists = (majorName) => {
    return existingMajors.find(
      (major) => major.name.toLowerCase() === majorName.toLowerCase()
    );
  };

  // Simulate AI call to get courses
  const simulateAICall = (campusId, sourceUrlParam) => {
    console.log("AI call with source URL:", sourceUrlParam);
    console.log("Campus ID:", campusId);

    // Simulate different course lists based on campus
    const courseData = {
      1: [
        {
          name: "Computer Science",
          description: "Fundamental concepts of computer science and programming.",
          status: "Active",
          educationLevel: "Bachelor's Degree",
          major: "Computer Science",
        },
        {
          name: "Software Engineering",
          description: "Software development and engineering principles.",
          status: "Active",
          educationLevel: "Bachelor's Degree",
          major: "Computer Science",
        },
        {
          name: "Data Science",
          description: "Advanced data analysis and machine learning.",
          status: "Active",
          educationLevel: "Master's Degree",
          major: "Data Science", // Major doesn't exist - will need to be created
        },
        {
          name: "Digital Marketing",
          description: "Certificate program in digital marketing strategies.",
          status: "Active",
          educationLevel: "Professional Certificate", // Education level doesn't exist
          major: "Marketing", // Major doesn't exist
        },
      ],
      2: [
        {
          name: "English Literature",
          description: "Study of English literature from medieval to modern times.",
          status: "Active",
          educationLevel: "Bachelor's Degree",
          major: "Literature", // Major doesn't exist
        },
        {
          name: "Medieval History",
          description: "Comprehensive study of medieval European history.",
          status: "Active",
          educationLevel: "Master's Degree",
          major: "History", // Major doesn't exist
        },
      ],
    };

    const courses = courseData[campusId] || [];

    return courses.map((course) => {
      const slug = generateSlug(course.name);
      const educationLevelExists = checkEducationLevelExists(
        course.educationLevel
      );
      const majorExists = checkMajorExists(course.major);
      const educationLevelId = educationLevelExists ? educationLevelExists.id : null;
      const majorId = majorExists ? majorExists.id : null;

      // Check for exact match (by slug and campus)
      const exactMatch = existingCourses.find(
        (c) => c.slug === slug && c.campusId === campusId
      );

      // Check for fuzzy match only if education level and major exist
      // and match with existing courses (same campus, same education level, same major)
      const fuzzyMatch = !exactMatch && educationLevelExists && majorExists
        ? findFuzzyMatch(
            course.name,
            educationLevelId,
            majorId,
            campusId
          )
        : null;

      return {
        name: course.name,
        slug,
        description: course.description,
        status: course.status,
        educationLevel: course.educationLevel,
        major: course.major,
        campusId,
        exists: !!exactMatch,
        fuzzyMatch,
        educationLevelExists: !!educationLevelExists,
        educationLevelId,
        majorExists: !!majorExists,
        majorId,
      };
    });
  };

  const handleCheck = async () => {
    if (!selectedCountry || !selectedCity || !selectedUniversity || !selectedCampus) {
      alert("Please select Country, City, University, and Campus");
      return;
    }

    setLoading(true);
    setSearchTerm(""); // Reset search term on new check
    setStatusFilter("all"); // Reset status filter on new check

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiGeneratedCourses = simulateAICall(
      parseInt(selectedCampus),
      sourceUrl
    );

    setAiCourses(aiGeneratedCourses);
    setHasSearched(true);
    setLoading(false);
  };

  const handleCourseToggle = (slug) => {
    setSelectedCourses((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSelectAll = () => {
    const importableCourses = aiCourses.filter(
      (course) =>
        !course.exists &&
        course.educationLevelExists &&
        course.majorExists
    );
    const allSlugs = importableCourses.map((c) => c.slug);
    setSelectedCourses(allSlugs);
  };

  const handleDeselectAll = () => {
    setSelectedCourses([]);
  };

  const openComparisonModal = (course) => {
    setComparisonModal({
      aiCourse: course,
      existingCourse: course.fuzzyMatch.match,
      similarity: course.fuzzyMatch.similarity,
      override: false, // Default: insert as new
    });
  };

  const closeComparisonModal = () => {
    setComparisonModal(null);
  };

  const handleOverrideToggle = (checked) => {
    setComparisonModal((prev) => ({
      ...prev,
      override: checked,
    }));
  };

  const handleApplyComparison = () => {
    if (!comparisonModal) return;

    const { aiCourse, existingCourse, override } = comparisonModal;

    // Validate dependencies
    if (!aiCourse.educationLevelExists || !aiCourse.majorExists) {
      alert(
        "Cannot import: Education Level or Major is missing. Please create them first."
      );
      return;
    }

    if (override) {
      // Update existing course with AI data
      setExistingCourses((prev) =>
        prev.map((course) =>
          course.id === existingCourse.id
            ? {
                ...course,
                name: aiCourse.name,
                slug: aiCourse.slug,
                description: aiCourse.description,
                status: aiCourse.status,
                educationLevelId: aiCourse.educationLevelId,
                majorId: aiCourse.majorId,
              }
            : course
        )
      );

      // Update AI courses list to mark as existing
      setAiCourses((prev) =>
        prev.map((course) =>
          course.slug === aiCourse.slug
            ? { ...course, exists: true, fuzzyMatch: null }
            : course
        )
      );

      alert(
        `Successfully updated "${existingCourse.name}" with AI-generated data!`
      );
    } else {
      // Import as new course
      const newCourse = {
        id: existingCourses.length + 1,
        name: aiCourse.name,
        slug: aiCourse.slug,
        description: aiCourse.description,
        status: aiCourse.status,
        educationLevelId: aiCourse.educationLevelId,
        majorId: aiCourse.majorId,
        campusId: aiCourse.campusId,
      };

      setExistingCourses((prev) => [...prev, newCourse]);

      // Update AI courses list to mark as existing
      setAiCourses((prev) =>
        prev.map((course) =>
          course.slug === aiCourse.slug
            ? { ...course, exists: true, fuzzyMatch: null }
            : course
        )
      );

      alert(`Successfully imported "${aiCourse.name}" as a new course!`);
    }

    closeComparisonModal();
  };

  const handleInsertEducationLevel = (course) => {
    const levelName = course.educationLevel.trim();
    if (!levelName) {
      alert("Education level name cannot be empty");
      return;
    }

    // Check if already exists
    const exists = existingEducationLevels.find(
      (level) => level.name.toLowerCase() === levelName.toLowerCase()
    );

    if (exists) {
      alert("This education level already exists");
      return;
    }

    // Create new education level
    const newLevel = {
      id: existingEducationLevels.length + 1,
      name: levelName,
    };

    setExistingEducationLevels((prev) => [...prev, newLevel]);

    // Update AI courses to mark education level as existing
    setAiCourses((prev) =>
      prev.map((c) =>
        c.slug === course.slug
          ? {
              ...c,
              educationLevelExists: true,
              educationLevelId: newLevel.id,
            }
          : c
      )
    );

    alert(`Successfully created education level "${levelName}"!`);
  };

  const handleInsertMajor = (course) => {
    const majorName = course.major.trim();
    if (!majorName) {
      alert("Major name cannot be empty");
      return;
    }

    // Check if already exists
    const exists = existingMajors.find(
      (major) => major.name.toLowerCase() === majorName.toLowerCase()
    );

    if (exists) {
      alert("This major already exists");
      return;
    }

    // Create new major
    const newMajor = {
      id: existingMajors.length + 1,
      name: majorName,
    };

    setExistingMajors((prev) => [...prev, newMajor]);

    // Update AI courses to mark major as existing
    setAiCourses((prev) =>
      prev.map((c) =>
        c.slug === course.slug
          ? {
              ...c,
              majorExists: true,
              majorId: newMajor.id,
            }
          : c
      )
    );

    alert(`Successfully created major "${majorName}"!`);
  };

  const handleImportSelected = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course to import");
      return;
    }

    // Validate all selected courses have required dependencies
    const invalidCourses = selectedCourses.filter((slug) => {
      const course = aiCourses.find((c) => c.slug === slug);
      return !course || !course.educationLevelExists || !course.majorExists;
    });

    if (invalidCourses.length > 0) {
      alert(
        "Some selected courses have missing education levels or majors. Please create them first."
      );
      return;
    }

    // Simulate import
    console.log("Importing courses:", selectedCourses);
    alert(`Successfully imported ${selectedCourses.length} course/courses!`);

    // Update existing courses
    const coursesToImport = aiCourses.filter((course) =>
      selectedCourses.includes(course.slug)
    );

    const newCourses = coursesToImport.map((course, index) => ({
      id: existingCourses.length + index + 1,
      name: course.name,
      slug: course.slug,
      description: course.description,
      status: course.status,
      educationLevelId: course.educationLevelId,
      majorId: course.majorId,
      campusId: course.campusId,
    }));

    setExistingCourses([...existingCourses, ...newCourses]);

    // Update AI courses list to mark imported courses as existing
    setAiCourses((prev) =>
      prev.map((course) =>
        selectedCourses.includes(course.slug)
          ? { ...course, exists: true }
          : course
      )
    );

    setSelectedCourses([]);
  };

  // Filter courses based on search term and status filter
  const filteredCourses = useMemo(() => {
    let filtered = aiCourses;

    // Apply status filter
    if (statusFilter === "existing") {
      filtered = filtered.filter((course) => course.exists || course.fuzzyMatch);
    } else if (statusFilter === "new") {
      filtered = filtered.filter(
        (course) =>
          !course.exists &&
          !course.fuzzyMatch &&
          course.educationLevelExists &&
          course.majorExists
      );
    } else if (statusFilter === "fuzzy") {
      filtered = filtered.filter((course) => course.fuzzyMatch);
    }

    // Apply search term filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((course) => {
        return (
          course.name.toLowerCase().includes(searchLower) ||
          course.slug.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.educationLevel.toLowerCase().includes(searchLower) ||
          course.major.toLowerCase().includes(searchLower) ||
          course.status.toLowerCase().includes(searchLower)
        );
      });
    }

    return filtered;
  }, [aiCourses, searchTerm, statusFilter]);

  // Calculate statistics based on filtered results
  const stats = useMemo(() => {
    const total = filteredCourses.length;
    const existing = filteredCourses.filter((course) => course.exists).length;
    const newCount = filteredCourses.filter(
      (course) => !course.exists && !course.fuzzyMatch && course.educationLevelExists && course.majorExists
    ).length;
    const missingEducationLevels = filteredCourses.filter(
      (course) => !course.educationLevelExists
    ).length;
    const missingMajors = filteredCourses.filter(
      (course) => !course.majorExists
    ).length;
    return { total, existing, new: newCount, missingEducationLevels, missingMajors };
  }, [filteredCourses]);

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

  return (
    <div className={styles["course-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <BookOpen size={24} />
          </div>
          <div>
            <h1>AI Import - Course</h1>
            <p>Import course data using AI</p>
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
            <LinkIcon size={18} />
            Source URL (Optional)
          </label>
          <input
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            placeholder="https://example.com/courses"
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
            !selectedCampus
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

      {hasSearched && (
        <div className={styles["results-section"]}>
          <div className={styles["results-header"]}>
            <h2>
              Results for {selectedCampusName} - {selectedUniversityName}
            </h2>
            {selectedCourses.length > 0 && (
              <button
                onClick={handleImportSelected}
                disabled={
                  selectedCourses.some((slug) => {
                    const course = aiCourses.find((c) => c.slug === slug);
                    return (
                      !course ||
                      !course.educationLevelExists ||
                      !course.majorExists
                    );
                  })
                }
                className={styles["import-btn"]}
              >
                Import Selected ({selectedCourses.length})
              </button>
            )}
          </div>

          <div className={styles["search-stats-bar"]}>
            <div className={styles["search-container"]}>
              <Search size={16} className={styles["search-icon"]} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search courses..."
                className={styles["search-input"]}
              />
            </div>
            <div className={styles["filter-status-container"]}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles["status-filter-select"]}
              >
                <option value="all">All Courses</option>
                <option value="existing">Existing (with Compare)</option>
                <option value="fuzzy">With Compare Button</option>
                <option value="new">New (Importable)</option>
              </select>
            </div>
            <div className={styles["stats-minimal"]}>
              Total: {stats.total} · Exists: {stats.existing} · New: {stats.new} · Missing Education Levels: {stats.missingEducationLevels} · Missing Majors: {stats.missingMajors}
            </div>
          </div>

          <div className={styles["table-container"]}>
            <table className={styles["courses-table"]}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        filteredCourses.filter(
                          (c) =>
                            !c.exists &&
                            !c.fuzzyMatch &&
                            c.educationLevelExists &&
                            c.majorExists
                        ).length > 0 &&
                        filteredCourses
                          .filter(
                            (c) =>
                              !c.exists &&
                              !c.fuzzyMatch &&
                              c.educationLevelExists &&
                              c.majorExists
                          )
                          .every((c) => selectedCourses.includes(c.slug))
                      }
                      onChange={(e) =>
                        e.target.checked ? handleSelectAll() : handleDeselectAll()
                      }
                      className={styles["select-all-checkbox"]}
                    />
                  </th>
                  <th>Name</th>
                  <th>Education Level</th>
                  <th>Major</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course, index) => (
                    <React.Fragment key={`${course.slug}-${index}`}>
                    <tr
                      className={
                        course.exists
                          ? styles["exists-row"]
                          : course.fuzzyMatch
                          ? styles["exists-row"]
                          : !course.educationLevelExists || !course.majorExists
                          ? styles["invalid-row"]
                          : ""
                      }
                    >
                      <td>
                        {course.exists ? (
                          <span className={styles["exists-badge"]}>Exists</span>
                        ) : course.fuzzyMatch ? (
                          <span className={styles["exists-badge"]}>Exists</span>
                        ) : !course.educationLevelExists ||
                          !course.majorExists ? (
                          <span className={styles["invalid-badge"]}>Invalid</span>
                        ) : (
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(course.slug)}
                            onChange={() => handleCourseToggle(course.slug)}
                            className={styles["course-checkbox"]}
                          />
                        )}
                      </td>
                      <td className={styles["name-cell"]}>
                        <div className={styles["name-content"]}>
                          <span className={styles["name"]}>{course.name}</span>
                          <code className={styles["slug"]}>{course.slug}</code>
                        </div>
                      </td>
                      <td>
                        <div className={styles["education-level-cell"]}>
                          <GraduationCap size={14} />
                          <span>{course.educationLevel}</span>
                          {!course.educationLevelExists && (
                            <button
                              onClick={() => handleInsertEducationLevel(course)}
                              className={styles["insert-btn-small"]}
                            >
                              Insert
                            </button>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className={styles["major-cell"]}>
                          <Briefcase size={14} />
                          <span>{course.major}</span>
                          {!course.majorExists && (
                            <button
                              onClick={() => handleInsertMajor(course)}
                              className={styles["insert-btn-small"]}
                            >
                              Insert
                            </button>
                          )}
                        </div>
                      </td>
                      <td className={styles["description"]}>
                        {course.description}
                      </td>
                      <td>
                        <span
                          className={
                            course.status === "Active"
                              ? styles["status-active"]
                              : styles["status-inactive"]
                          }
                        >
                          {course.status}
                        </span>
                      </td>
                      <td>
                        {course.exists || course.fuzzyMatch ? (
                          <div className={styles["action-cell"]}>
                            <span className={styles["exists-label"]}>Exists</span>
                            {course.fuzzyMatch && (
                              <button
                                onClick={() => openComparisonModal(course)}
                                className={styles["compare-btn"]}
                              >
                                Compare
                              </button>
                            )}
                          </div>
                        ) : !course.educationLevelExists ||
                          !course.majorExists ? (
                          <span className={styles["invalid-label"]}>
                            Missing dependencies
                          </span>
                        ) : (
                          <span className={styles["ready-label"]}>
                            Ready to import
                          </span>
                        )}
                      </td>
                    </tr>
                    {course.fuzzyMatch && (
                      <tr className={styles["fuzzy-match-row"]}>
                        <td colSpan="7">
                          <div className={styles["fuzzy-match-warning"]}>
                            <AlertTriangle size={16} />
                            <span>
                              A similar course exists. You may override or
                              import as new.
                            </span>
                            <button
                              onClick={() => openComparisonModal(course)}
                              className={styles["compare-btn"]}
                            >
                              Compare
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className={styles["empty-state"]}>
                      <div className={styles["empty-content"]}>
                        <BookOpen size={48} className={styles["empty-icon"]} />
                        <h3>
                          {searchTerm
                            ? "No courses match your search"
                            : "No courses found"}
                        </h3>
                        <p>
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Select Country, City, University, Campus and click 'Check' to find courses"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!hasSearched && (
        <div className={styles["empty-state-section"]}>
          <div className={styles["empty-state"]}>
            <BookOpen size={48} className={styles["empty-icon"]} />
            <h3>Ready to Import Courses</h3>
            <p>
              Select Country, City, University, and Campus, then click "Check"
              to find courses using AI.
            </p>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonModal && (
        <div
          className={styles["modal-overlay"]}
          onClick={closeComparisonModal}
        >
          <div
            className={styles["comparison-modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <div>
                <h2>Course Comparison</h2>
                <p>
                  Similarity: {comparisonModal.similarity.toFixed(1)}%
                </p>
              </div>
              <button
                onClick={closeComparisonModal}
                className={styles["close-btn"]}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles["comparison-content"]}>
              <div className={styles["comparison-column"]}>
                <h3>AI-Generated Course</h3>
                <div className={styles["comparison-field"]}>
                  <label>Name</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCourse.name}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Slug</label>
                  <div className={styles["field-value"]}>
                    <code>{comparisonModal.aiCourse.slug}</code>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Description</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCourse.description}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Education Level</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCourse.educationLevel}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Major</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCourse.major}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Status</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCourse.status}
                  </div>
                </div>
              </div>

              <div className={styles["comparison-column"]}>
                <h3>Existing Database Record</h3>
                <div className={styles["comparison-field"]}>
                  <label>Name</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCourse.name}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Slug</label>
                  <div className={styles["field-value"]}>
                    <code>{comparisonModal.existingCourse.slug}</code>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Description</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCourse.description}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Education Level</label>
                  <div className={styles["field-value"]}>
                    {existingEducationLevels.find(
                      (el) => el.id === comparisonModal.existingCourse.educationLevelId
                    )?.name || "N/A"}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Major</label>
                  <div className={styles["field-value"]}>
                    {existingMajors.find(
                      (m) => m.id === comparisonModal.existingCourse.majorId
                    )?.name || "N/A"}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Status</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCourse.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Override Option Section */}
            <div className={styles["override-section"]}>
              <div className={styles["override-option"]}>
                <label className={styles["override-checkbox-label"]}>
                  <input
                    type="checkbox"
                    checked={comparisonModal.override}
                    onChange={(e) => handleOverrideToggle(e.target.checked)}
                    className={styles["override-checkbox-input"]}
                  />
                  <span className={styles["override-checkbox-custom"]}></span>
                  <div className={styles["override-content"]}>
                    <span className={styles["override-title"]}>
                      Override (Update Existing Course)
                    </span>
                    <span className={styles["override-description"]}>
                      Override will update the existing course with the AI
                      data. If you do not override, the record will be imported
                      as a new course.
                    </span>
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
                disabled={
                  !comparisonModal.aiCourse.educationLevelExists ||
                  !comparisonModal.aiCourse.majorExists
                }
                className={styles["apply-btn"]}
              >
                {comparisonModal.override
                  ? "Update Existing Course"
                  : "Import as New Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
