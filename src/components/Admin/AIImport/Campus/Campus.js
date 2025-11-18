import React, { useState, useEffect, useMemo } from "react";
import {
  School,
  Check,
  Globe,
  Loader2,
  Link as LinkIcon,
  Search,
  X,
  AlertTriangle,
  MapPin,
  Building2,
  ExternalLink,
} from "lucide-react";
import styles from "./Campus.module.css";

const Campus = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [aiCampuses, setAiCampuses] = useState([]);
  const [existingCampuses, setExistingCampuses] = useState([]);
  const [existingUniversities, setExistingUniversities] = useState([]);
  const [existingCities, setExistingCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCampuses, setSelectedCampuses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(null);
  const [cityRegistrationModal, setCityRegistrationModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load countries, universities, cities, and existing campuses on mount
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
      {
        id: 4,
        name: "University of Melbourne",
        slug: "university-of-melbourne",
        countryId: 4,
      },
      {
        id: 5,
        name: "Massachusetts Institute of Technology",
        slug: "massachusetts-institute-of-technology",
        countryId: 1,
      },
    ];
    setExistingUniversities(sampleExistingUniversities);

    // Simulate loading existing cities
    const sampleExistingCities = [
      { id: 1, name: "New York", countryId: 1 },
      { id: 2, name: "London", countryId: 2 },
      { id: 3, name: "Toronto", countryId: 3 },
      { id: 4, name: "Sydney", countryId: 4 },
      { id: 5, name: "Cambridge", countryId: 1 },
      { id: 6, name: "Oxford", countryId: 2 },
      { id: 7, name: "Melbourne", countryId: 4 },
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
        address: "Massachusetts Hall, Cambridge, MA 02138",
        status: "Active",
      },
      {
        id: 2,
        name: "Oxford Main Campus",
        slug: "oxford-main-campus",
        universityId: 2,
        universityName: "University of Oxford",
        cityId: 6,
        cityName: "Oxford",
        address: "Wellington Square, Oxford OX1 2JD, UK",
        status: "Active",
      },
    ];
    setExistingCampuses(sampleExistingCampuses);
  }, []);

  // Get universities filtered by selected country
  const filteredUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return existingUniversities.filter(
      (uni) => uni.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingUniversities]);

  // Get cities filtered by selected country
  const filteredCities = useMemo(() => {
    if (!selectedCountry) return [];
    return existingCities.filter(
      (city) => city.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingCities]);

  // Reset university and city when country changes
  useEffect(() => {
    setSelectedUniversity("");
    setSelectedCity("");
  }, [selectedCountry]);

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

  // Find fuzzy matches for campuses
  const findFuzzyMatch = (campusName, universityId) => {
    const universityCampuses = existingCampuses.filter(
      (campus) => campus.universityId === universityId
    );

    let bestMatch = null;
    let bestSimilarity = 0;

    for (const existingCampus of universityCampuses) {
      const similarity = calculateSimilarity(campusName, existingCampus.name);
      if (similarity > bestSimilarity && similarity >= 70) {
        // 70% similarity threshold
        bestSimilarity = similarity;
        bestMatch = existingCampus;
      }
    }

    return bestMatch ? { match: bestMatch, similarity: bestSimilarity } : null;
  };

  // Check if city exists in database
  const checkCityExists = (cityName, countryId) => {
    return existingCities.find(
      (city) =>
        city.name.toLowerCase() === cityName.toLowerCase() &&
        city.countryId === countryId
    );
  };

  // Simulate AI call to get campuses
  const simulateAICall = (countryId, universityId, cityId, sourceUrlParam) => {
    console.log("AI call with source URL:", sourceUrlParam);
    console.log("Country:", countryId, "University:", universityId, "City:", cityId);

    // Get university name
    const university = existingUniversities.find((u) => u.id === universityId);
    const universityName = university ? university.name : "Unknown University";

    // Simulate different campus lists based on university
    const campusData = {
      1: [
        {
          name: "Harvard Main Campus",
          city: "Cambridge",
          address: "Massachusetts Hall, Cambridge, MA 02138",
          status: "Active",
        },
        {
          name: "Harvard  Main Campus", // Fuzzy match - extra space
          city: "Cambridge",
          address: "Massachusetts Hall, Cambridge, MA 02138",
          status: "Active",
        },
        {
          name: "Harvard Medical Campus",
          city: "Boston",
          address: "25 Shattuck St, Boston, MA 02115",
          status: "Active",
        },
        {
          name: "Harvard Business School",
          city: "Boston",
          address: "Soldiers Field, Boston, MA 02163",
          status: "Active",
        },
        {
          name: "Harvard Extension Campus",
          city: "New York", // City exists
          address: "51 Brattle St, Cambridge, MA 02138",
          status: "Active",
        },
        {
          name: "Harvard Research Campus",
          city: "San Francisco", // City doesn't exist
          address: "123 Research Way, San Francisco, CA 94105",
          status: "Active",
        },
      ],
      2: [
        {
          name: "Oxford Main Campus",
          city: "Oxford",
          address: "Wellington Square, Oxford OX1 2JD, UK",
          status: "Active",
        },
        {
          name: "Oxford Of Main Campus", // Fuzzy match - typo
          city: "Oxford",
          address: "Wellington Square, Oxford OX1 2JD, UK",
          status: "Active",
        },
        {
          name: "Oxford Science Campus",
          city: "London",
          address: "Parks Rd, Oxford OX1 3PU, UK",
          status: "Active",
        },
        {
          name: "Oxford Medical Campus",
          city: "Manchester", // City doesn't exist
          address: "John Radcliffe Hospital, Oxford OX3 9DU, UK",
          status: "Active",
        },
      ],
      3: [
        {
          name: "Toronto St. George Campus",
          city: "Toronto",
          address: "27 King's College Circle, Toronto, ON M5S 1A1",
          status: "Active",
        },
        {
          name: "Toronto Mississauga Campus",
          city: "Toronto",
          address: "3359 Mississauga Rd, Mississauga, ON L5L 1C6",
          status: "Active",
        },
        {
          name: "Toronto Scarborough Campus",
          city: "Vancouver", // City doesn't exist in this context
          address: "1265 Military Trail, Scarborough, ON M1C 1A4",
          status: "Active",
        },
      ],
      5: [
        {
          name: "MIT Main Campus",
          city: "Cambridge",
          address: "77 Massachusetts Ave, Cambridge, MA 02139",
          status: "Active",
        },
        {
          name: "MIT Lincoln Laboratory",
          city: "Boston",
          address: "244 Wood St, Lexington, MA 02421",
          status: "Active",
        },
      ],
    };

    const campuses = campusData[universityId] || [];

    return campuses.map((campus) => {
      const slug = generateSlug(campus.name);
      const cityExists = checkCityExists(campus.city, countryId);

      // Check for exact match
      const exactMatch = existingCampuses.find(
        (c) =>
          c.slug === slug &&
          c.universityId === universityId &&
          c.cityName.toLowerCase() === campus.city.toLowerCase()
      );

      // Check for fuzzy match
      const fuzzyMatch = !exactMatch
        ? findFuzzyMatch(campus.name, universityId)
        : null;

      return {
        name: campus.name,
        slug,
        university: universityName,
        universityId,
        city: campus.city,
        address: campus.address,
        status: campus.status,
        countryId,
        exists: !!exactMatch,
        fuzzyMatch,
        cityExists: !!cityExists,
        cityId: cityExists ? cityExists.id : null,
      };
    });
  };

  const handleCheck = async () => {
    if (!selectedCountry || !selectedUniversity) {
      alert("Please select a country and university");
      return;
    }

    setLoading(true);
    setSearchTerm(""); // Reset search term on new check

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const aiGeneratedCampuses = simulateAICall(
      parseInt(selectedCountry),
      parseInt(selectedUniversity),
      selectedCity ? parseInt(selectedCity) : null,
      sourceUrl
    );

    setAiCampuses(aiGeneratedCampuses);
    setHasSearched(true);
    setLoading(false);
  };

  const handleCampusToggle = (slug) => {
    setSelectedCampuses((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const handleSelectAll = () => {
    const importableCampuses = aiCampuses.filter(
      (campus) =>
        !campus.exists &&
        campus.cityExists &&
        !campus.fuzzyMatch
    );
    const allSlugs = importableCampuses.map((c) => c.slug);
    setSelectedCampuses(allSlugs);
  };

  const handleDeselectAll = () => {
    setSelectedCampuses([]);
  };

  const openCityRegistrationModal = (campus) => {
    setCityRegistrationModal({
      campus,
      cityName: campus.city,
      countryId: campus.countryId,
      selectedCountryForCity: campus.countryId.toString(),
    });
  };

  const closeCityRegistrationModal = () => {
    setCityRegistrationModal(null);
  };

  const handleRegisterCity = () => {
    if (!cityRegistrationModal) return;

    const { cityName, selectedCountryForCity } = cityRegistrationModal;

    if (!cityName.trim() || !selectedCountryForCity) {
      alert("Please provide a city name and select a country");
      return;
    }

    // Check if city already exists
    const cityExists = existingCities.find(
      (c) =>
        c.name.toLowerCase() === cityName.toLowerCase() &&
        c.countryId === parseInt(selectedCountryForCity)
    );

    if (cityExists) {
      alert("This city already exists in the database");
      return;
    }

    // Register the new city
    const newCity = {
      id: existingCities.length + 1,
      name: cityName.trim(),
      countryId: parseInt(selectedCountryForCity),
    };

    setExistingCities((prev) => [...prev, newCity]);

    // Update AI campuses to mark city as existing
    setAiCampuses((prev) =>
      prev.map((campus) =>
        campus.city.toLowerCase() === cityName.toLowerCase() &&
        campus.countryId === parseInt(selectedCountryForCity)
          ? {
              ...campus,
              cityExists: true,
              cityId: newCity.id,
            }
          : campus
      )
    );

    alert(`Successfully registered "${cityName}"!`);
    closeCityRegistrationModal();
  };

  const openComparisonModal = (campus) => {
    setComparisonModal({
      aiCampus: campus,
      existingCampus: campus.fuzzyMatch.match,
      similarity: campus.fuzzyMatch.similarity,
      override: false, // Default: insert as new
      selectedCityId: campus.cityId || null, // Selected city from dropdown
      showInsertCityForm: false, // Whether to show insert city form
      newCityName: campus.city, // Default new city name
      newCityCountryId: campus.countryId.toString(), // Default country for new city
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

  const handleInsertCityFromComparison = () => {
    if (!comparisonModal) return;

    const { newCityName, newCityCountryId } = comparisonModal;

    if (!newCityName.trim() || !newCityCountryId) {
      alert("Please provide a city name and select a country");
      return;
    }

    // Check if city already exists
    const cityExists = existingCities.find(
      (c) =>
        c.name.toLowerCase() === newCityName.toLowerCase() &&
        c.countryId === parseInt(newCityCountryId)
    );

    if (cityExists) {
      // Use existing city
      setComparisonModal((prev) => ({
        ...prev,
        selectedCityId: cityExists.id,
        showInsertCityForm: false,
      }));

      // Update AI campus
      setAiCampuses((prev) =>
        prev.map((campus) =>
          campus.slug === comparisonModal.aiCampus.slug
            ? {
                ...campus,
                cityExists: true,
                cityId: cityExists.id,
              }
            : campus
        )
      );
      return;
    }

    // Register the new city
    const newCity = {
      id: existingCities.length + 1,
      name: newCityName.trim(),
      countryId: parseInt(newCityCountryId),
    };

    setExistingCities((prev) => [...prev, newCity]);

    // Update AI campuses to mark city as existing
    setAiCampuses((prev) =>
      prev.map((campus) =>
        campus.slug === comparisonModal.aiCampus.slug
          ? {
              ...campus,
              cityExists: true,
              cityId: newCity.id,
            }
          : campus
      )
    );

    // Update comparison modal
    setComparisonModal((prev) => ({
      ...prev,
      selectedCityId: newCity.id,
      showInsertCityForm: false,
    }));
  };

  const handleApplyComparison = () => {
    if (!comparisonModal) return;

    const { aiCampus, existingCampus, override, selectedCityId } = comparisonModal;

    // Validate dependencies - city must be selected or exist
    const finalCityId = selectedCityId || aiCampus.cityId;
    if (!finalCityId) {
      alert(
        "Please select an existing city or insert a new city before importing."
      );
      return;
    }

    if (override) {
      // Update existing campus with AI data
      const selectedCity = existingCities.find((c) => c.id === finalCityId);
      setExistingCampuses((prev) =>
        prev.map((campus) =>
          campus.id === existingCampus.id
            ? {
                ...campus,
                name: aiCampus.name,
                slug: aiCampus.slug,
                address: aiCampus.address,
                status: aiCampus.status,
                cityId: finalCityId,
                cityName: selectedCity?.name || aiCampus.city,
              }
            : campus
        )
      );

      // Update AI campuses list to mark as existing
      setAiCampuses((prev) =>
        prev.map((campus) =>
          campus.slug === aiCampus.slug
            ? { ...campus, exists: true, fuzzyMatch: null, cityId: finalCityId, cityExists: true }
            : campus
        )
      );

      alert(
        `Successfully updated "${existingCampus.name}" with AI-generated data!`
      );
    } else {
      // Import as new campus
      const selectedCity = existingCities.find((c) => c.id === finalCityId);
      const newCampus = {
        id: existingCampuses.length + 1,
        name: aiCampus.name,
        slug: aiCampus.slug,
        universityId: aiCampus.universityId,
        universityName: aiCampus.university,
        cityId: finalCityId,
        cityName: selectedCity?.name || aiCampus.city,
        address: aiCampus.address,
        status: aiCampus.status,
      };

      setExistingCampuses((prev) => [...prev, newCampus]);

      // Update AI campuses list to mark as existing
      setAiCampuses((prev) =>
        prev.map((campus) =>
          campus.slug === aiCampus.slug
            ? { ...campus, exists: true, fuzzyMatch: null }
            : campus
        )
      );

      alert(`Successfully imported "${aiCampus.name}" as a new campus!`);
    }

    closeComparisonModal();
  };

  const handleImportSelected = () => {
    if (selectedCampuses.length === 0) {
      alert("Please select at least one campus to import");
      return;
    }

    // Validate all selected campuses have required dependencies (only city needs to exist)
    const invalidCampuses = selectedCampuses.filter((slug) => {
      const campus = aiCampuses.find((c) => c.slug === slug);
      return !campus || !campus.cityExists;
    });

    if (invalidCampuses.length > 0) {
      alert(
        "Some selected campuses have missing cities. Please register the cities first."
      );
      return;
    }

    // Simulate import
    console.log("Importing campuses:", selectedCampuses);
    alert(`Successfully imported ${selectedCampuses.length} campus/campuses!`);

    // Update existing campuses
    const campusesToImport = aiCampuses.filter((campus) =>
      selectedCampuses.includes(campus.slug)
    );

    const newCampuses = campusesToImport.map((campus, index) => ({
      id: existingCampuses.length + index + 1,
      name: campus.name,
      slug: campus.slug,
      universityId: campus.universityId,
      universityName: campus.university,
      cityId: campus.cityId,
      cityName: campus.city,
      address: campus.address,
      status: campus.status,
    }));

    setExistingCampuses([...existingCampuses, ...newCampuses]);

    // Update AI campuses list to mark imported campuses as existing
    setAiCampuses((prev) =>
      prev.map((campus) =>
        selectedCampuses.includes(campus.slug)
          ? { ...campus, exists: true, fuzzyMatch: null }
          : campus
      )
    );

    setSelectedCampuses([]);
  };

  // Filter campuses based on search term
  const filteredCampuses = useMemo(() => {
    if (!searchTerm.trim()) {
      return aiCampuses;
    }
    const searchLower = searchTerm.toLowerCase().trim();
    return aiCampuses.filter((campus) => {
      return (
        campus.name.toLowerCase().includes(searchLower) ||
        campus.slug.toLowerCase().includes(searchLower) ||
        campus.university.toLowerCase().includes(searchLower) ||
        campus.city.toLowerCase().includes(searchLower) ||
        campus.address.toLowerCase().includes(searchLower) ||
        campus.status.toLowerCase().includes(searchLower)
      );
    });
  }, [aiCampuses, searchTerm]);

  // Calculate statistics based on filtered results
  const stats = useMemo(() => {
    const total = filteredCampuses.length;
    const existing = filteredCampuses.filter((campus) => campus.exists).length;
    const newCount = filteredCampuses.filter(
      (campus) => !campus.exists && campus.cityExists
    ).length;
    const missingCities = filteredCampuses.filter(
      (campus) => !campus.cityExists
    ).length;
    return { total, existing, new: newCount, missingCities };
  }, [filteredCampuses]);

  const selectedCountryName = countries.find(
    (c) => c.id === parseInt(selectedCountry)
  )?.name;

  const selectedUniversityName = filteredUniversities.find(
    (u) => u.id === parseInt(selectedUniversity)
  )?.name;

  return (
    <div className={styles["campus-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <School size={24} />
          </div>
          <div>
            <h1>AI Import - Campus</h1>
            <p>Import campus data using AI</p>
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
            <MapPin size={18} />
            City (Optional)
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className={styles["filter-select"]}
            disabled={!selectedCountry}
          >
            <option value="">All Cities</option>
            {filteredCities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
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
            placeholder="https://example.com/campuses"
            className={styles["source-url-input"]}
          />
        </div>

        <button
          onClick={handleCheck}
          disabled={loading || !selectedCountry || !selectedUniversity}
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
              Results for {selectedUniversityName} in {selectedCountryName}
            </h2>
            {selectedCampuses.length > 0 && (
              <button
                onClick={handleImportSelected}
                disabled={
                  selectedCampuses.some((slug) => {
                    const campus = aiCampuses.find((c) => c.slug === slug);
                    return !campus || !campus.cityExists;
                  })
                }
                className={styles["import-btn"]}
              >
                Import Selected ({selectedCampuses.length})
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
                placeholder="Search campuses..."
                className={styles["search-input"]}
              />
            </div>
            <div className={styles["stats-minimal"]}>
              Total: {stats.total} · Exists: {stats.existing} · New: {stats.new} · Missing Cities: {stats.missingCities}
            </div>
          </div>

          <div className={styles["table-container"]}>
            <table className={styles["campuses-table"]}>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        filteredCampuses.filter(
                          (c) =>
                            !c.exists &&
                            c.cityExists &&
                            !c.fuzzyMatch
                        ).length > 0 &&
                        filteredCampuses
                          .filter(
                            (c) =>
                              !c.exists &&
                              c.cityExists &&
                              !c.fuzzyMatch
                          )
                          .every((c) => selectedCampuses.includes(c.slug))
                      }
                      onChange={(e) =>
                        e.target.checked ? handleSelectAll() : handleDeselectAll()
                      }
                      className={styles["select-all-checkbox"]}
                    />
                  </th>
                  <th>Name</th>
                  <th>University</th>
                  <th>City</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampuses.length > 0 ? (
                  filteredCampuses.map((campus, index) => (
                    <React.Fragment key={`${campus.slug}-${index}`}>
                      <tr
                        className={
                          campus.exists
                            ? styles["exists-row"]
                            : !campus.cityExists
                            ? styles["invalid-row"]
                            : ""
                        }
                      >
                        <td>
                          {campus.exists ? (
                            <span className={styles["exists-badge"]}>
                              Exists
                            </span>
                          ) : campus.fuzzyMatch ? (
                            <span className={styles["exists-badge"]}>
                              Exists
                            </span>
                          ) : !campus.cityExists ? (
                            <span className={styles["invalid-badge"]}>
                              Invalid
                            </span>
                          ) : (
                            <input
                              type="checkbox"
                              checked={selectedCampuses.includes(campus.slug)}
                              onChange={() => handleCampusToggle(campus.slug)}
                              className={styles["campus-checkbox"]}
                            />
                          )}
                        </td>
                        <td className={styles["name-cell"]}>
                          <div className={styles["name-content"]}>
                            <span className={styles["name"]}>{campus.name}</span>
                            <code className={styles["slug"]}>{campus.slug}</code>
                          </div>
                        </td>
                        <td>
                          <div className={styles["university-cell"]}>
                            <Building2 size={14} />
                            <span>{campus.university}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles["city-cell"]}>
                            <MapPin size={14} />
                            <span>{campus.city}</span>
                            {!campus.cityExists && (
                              <span className={styles["missing-badge"]}>
                                Missing
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={styles["address"]}>{campus.address}</td>
                        <td>
                          <span
                            className={
                              campus.status === "Active"
                                ? styles["status-active"]
                                : styles["status-inactive"]
                            }
                          >
                            {campus.status}
                          </span>
                        </td>
                        <td>
                          {campus.exists || campus.fuzzyMatch ? (
                            <div className={styles["action-cell"]}>
                              <span className={styles["exists-label"]}>
                                Exists
                              </span>
                              {campus.fuzzyMatch && (
                                <button
                                  onClick={() => openComparisonModal(campus)}
                                  className={styles["compare-btn"]}
                                >
                                  Compare
                                </button>
                              )}
                            </div>
                          ) : !campus.cityExists ? (
                            <div className={styles["action-cell"]}>
                              <span
                                className={styles["missing-city-label"]}
                              >
                                This city does not exist in the database
                              </span>
                              <button
                                onClick={() => openCityRegistrationModal(campus)}
                                className={styles["register-city-btn"]}
                              >
                                Register City
                              </button>
                            </div>
                          ) : (
                            <span className={styles["ready-label"]}>
                              Ready to import
                            </span>
                          )}
                        </td>
                      </tr>
                      {campus.fuzzyMatch && (
                        <tr className={styles["fuzzy-match-row"]}>
                          <td colSpan="7">
                            <div className={styles["fuzzy-match-warning"]}>
                              <AlertTriangle size={16} />
                              <span>
                                A similar campus exists. You may override or
                                import as new.
                              </span>
                              <button
                                onClick={() => openComparisonModal(campus)}
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
                        <School size={48} className={styles["empty-icon"]} />
                        <h3>
                          {searchTerm
                            ? "No campuses match your search"
                            : "No campuses found"}
                        </h3>
                        <p>
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Select a country, university, and click 'Check' to find campuses"}
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
            <School size={48} className={styles["empty-icon"]} />
            <h3>Ready to Import Campuses</h3>
            <p>
              Select a country, university, and optionally a city, then click
              "Check" to find campuses using AI.
            </p>
          </div>
        </div>
      )}

      {/* City Registration Modal */}
      {cityRegistrationModal && (
        <div
          className={styles["modal-overlay"]}
          onClick={closeCityRegistrationModal}
        >
          <div
            className={styles["city-registration-modal"]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles["modal-header"]}>
              <div>
                <h2>Register City</h2>
                <p>Register a new city to enable campus import</p>
              </div>
              <button
                onClick={closeCityRegistrationModal}
                className={styles["close-btn"]}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles["modal-body"]}>
              <div className={styles["form-group"]}>
                <label>City Name</label>
                <input
                  type="text"
                  value={cityRegistrationModal.cityName}
                  onChange={(e) =>
                    setCityRegistrationModal((prev) => ({
                      ...prev,
                      cityName: e.target.value,
                    }))
                  }
                  placeholder="Enter city name"
                  className={styles["form-input"]}
                />
              </div>

              <div className={styles["form-group"]}>
                <label>Country</label>
                <select
                  value={cityRegistrationModal.selectedCountryForCity}
                  onChange={(e) =>
                    setCityRegistrationModal((prev) => ({
                      ...prev,
                      selectedCountryForCity: e.target.value,
                    }))
                  }
                  className={styles["form-select"]}
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <p className={styles["form-hint"]}>
                  Auto-suggested:{" "}
                  {
                    countries.find(
                      (c) =>
                        c.id === cityRegistrationModal.countryId
                    )?.name
                  }
                </p>
              </div>
            </div>

            <div className={styles["modal-footer"]}>
              <button
                onClick={closeCityRegistrationModal}
                className={styles["cancel-btn"]}
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterCity}
                className={styles["register-btn"]}
              >
                Register City
              </button>
            </div>
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
                <h2>Campus Comparison</h2>
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
                <h3>AI-Generated Campus</h3>
                <div className={styles["comparison-field"]}>
                  <label>Name</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCampus.name}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Slug</label>
                  <div className={styles["field-value"]}>
                    <code>{comparisonModal.aiCampus.slug}</code>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>University</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCampus.university}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>City</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCampus.cityExists ||
                    comparisonModal.selectedCityId ? (
                      <span>
                        {comparisonModal.selectedCityId
                          ? existingCities.find(
                              (c) => c.id === comparisonModal.selectedCityId
                            )?.name || comparisonModal.aiCampus.city
                          : comparisonModal.aiCampus.city}
                      </span>
                    ) : (
                      <div className={styles["city-selection-container"]}>
                        {!comparisonModal.showInsertCityForm ? (
                          <>
                            <select
                              value={comparisonModal.selectedCityId || ""}
                              onChange={(e) =>
                                setComparisonModal((prev) => ({
                                  ...prev,
                                  selectedCityId: e.target.value
                                    ? parseInt(e.target.value)
                                    : null,
                                }))
                              }
                              className={styles["city-select"]}
                            >
                              <option value="">Select existing city...</option>
                              {existingCities
                                .filter((city) => city.countryId === comparisonModal.aiCampus.countryId)
                                .map((city) => (
                                  <option key={city.id} value={city.id}>
                                    {city.name}
                                  </option>
                                ))}
                            </select>
                            <button
                              onClick={() =>
                                setComparisonModal((prev) => ({
                                  ...prev,
                                  showInsertCityForm: true,
                                }))
                              }
                              className={styles["insert-city-btn-small"]}
                            >
                              Insert City
                            </button>
                          </>
                        ) : (
                          <div className={styles["insert-city-form"]}>
                            <input
                              type="text"
                              value={comparisonModal.newCityName}
                              onChange={(e) =>
                                setComparisonModal((prev) => ({
                                  ...prev,
                                  newCityName: e.target.value,
                                }))
                              }
                              placeholder="City name"
                              className={styles["city-input-small"]}
                            />
                            <select
                              value={comparisonModal.newCityCountryId}
                              onChange={(e) =>
                                setComparisonModal((prev) => ({
                                  ...prev,
                                  newCityCountryId: e.target.value,
                                }))
                              }
                              className={styles["city-country-select-small"]}
                            >
                              {countries.map((country) => (
                                <option key={country.id} value={country.id}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={handleInsertCityFromComparison}
                              className={styles["insert-city-btn-small"]}
                            >
                              Insert
                            </button>
                            <button
                              onClick={() =>
                                setComparisonModal((prev) => ({
                                  ...prev,
                                  showInsertCityForm: false,
                                }))
                              }
                              className={styles["cancel-city-btn-small"]}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Address</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCampus.address}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Status</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiCampus.status}
                  </div>
                </div>
              </div>

              <div className={styles["comparison-column"]}>
                <h3>Existing Database Record</h3>
                <div className={styles["comparison-field"]}>
                  <label>Name</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCampus.name}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Slug</label>
                  <div className={styles["field-value"]}>
                    <code>{comparisonModal.existingCampus.slug}</code>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>University</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCampus.universityName}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>City</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCampus.cityName}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Address</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCampus.address}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Status</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingCampus.status}
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
                      Override (Update Existing Campus)
                    </span>
                    <span className={styles["override-description"]}>
                      Override will update the existing campus with the AI
                      data. If you do not override, the record will be imported
                      as a new campus.
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
                  !comparisonModal.aiCampus.cityExists &&
                  !comparisonModal.selectedCityId
                }
                className={styles["apply-btn"]}
              >
                {comparisonModal.override
                  ? "Update Existing Campus"
                  : "Import as New Campus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campus;
