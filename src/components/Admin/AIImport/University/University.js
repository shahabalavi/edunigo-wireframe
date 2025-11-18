import React, { useState, useEffect, useMemo } from "react";
import { Building2, Check, Globe, Loader2, ExternalLink, X, Link as LinkIcon, AlertTriangle, Search } from "lucide-react";
import styles from "./University.module.css";

const University = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [aiUniversities, setAiUniversities] = useState([]);
  const [existingUniversities, setExistingUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [comparisonModal, setComparisonModal] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load countries and existing universities on mount
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

    // Simulate loading existing universities from database (with more data for fuzzy matching)
    const sampleExistingUniversities = [
      {
        id: 1,
        name: "Harvard University",
        slug: "harvard-university",
        website: "https://www.harvard.edu",
        description: "A private Ivy League research university in Cambridge, Massachusetts.",
        logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=H",
        countryId: 1,
      },
      {
        id: 2,
        name: "University of Oxford",
        slug: "university-of-oxford",
        website: "https://www.ox.ac.uk",
        description: "A collegiate research university in Oxford, England.",
        logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=O",
        countryId: 2,
      },
      {
        id: 3,
        name: "University of Toronto",
        slug: "university-of-toronto",
        website: "https://www.utoronto.ca",
        description: "A public research university in Toronto, Ontario, Canada.",
        logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UoT",
        countryId: 3,
      },
      {
        id: 4,
        name: "University of Melbourne",
        slug: "university-of-melbourne",
        website: "https://www.unimelb.edu.au",
        description: "A public research university located in Melbourne, Australia.",
        logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UM",
        countryId: 4,
      },
      {
        id: 5,
        name: "Technical University of Munich",
        slug: "technical-university-of-munich",
        website: "https://www.tum.de",
        description: "A research university with campuses in Munich, Germany.",
        logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=TUM",
        countryId: 5,
      },
    ];
    setExistingUniversities(sampleExistingUniversities);
  }, []);

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

  // Find fuzzy matches
  const findFuzzyMatch = (universityName, countryId) => {
    const countryUniversities = existingUniversities.filter(
      (uni) => uni.countryId === countryId
    );

    let bestMatch = null;
    let bestSimilarity = 0;

    for (const existingUni of countryUniversities) {
      const similarity = calculateSimilarity(
        universityName,
        existingUni.name
      );
      if (similarity > bestSimilarity && similarity >= 70) {
        // 70% similarity threshold
        bestSimilarity = similarity;
        bestMatch = existingUni;
      }
    }

    return bestMatch ? { match: bestMatch, similarity: bestSimilarity } : null;
  };

  // Simulate AI call to get universities for a country
  const simulateAICall = (countryId, sourceUrlParam) => {
    // In real implementation, sourceUrlParam would be sent to AI
    console.log("AI call with source URL:", sourceUrlParam);

    // Simulate different university lists based on country
    const universityData = {
      1: [
        {
          name: "Harvard University", // Exact match
          website: "https://www.harvard.edu",
          description:
            "A private Ivy League research university in Cambridge, Massachusetts.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=H",
        },
        {
          name: "Harvard  University", // Fuzzy match - extra space
          website: "https://www.harvard.edu",
          description:
            "A private Ivy League research university in Cambridge, Massachusetts.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=H",
        },
        {
          name: "Massachusetts Institute of Technology",
          website: "https://www.mit.edu",
          description:
            "A private research university in Cambridge, Massachusetts, known for its programs in engineering and physical sciences.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=MIT",
        },
        {
          name: "Stanford University",
          website: "https://www.stanford.edu",
          description:
            "A private research university in Stanford, California, known for its entrepreneurial character.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=S",
        },
        {
          name: "Yale University",
          website: "https://www.yale.edu",
          description:
            "A private Ivy League research university in New Haven, Connecticut.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=Y",
        },
        {
          name: "Princeton University",
          website: "https://www.princeton.edu",
          description:
            "A private Ivy League research university in Princeton, New Jersey.",
          logoUrl: null,
        },
      ],
      2: [
        {
          name: "University of Oxford", // Exact match
          website: "https://www.ox.ac.uk",
          description:
            "A collegiate research university in Oxford, England, and the oldest university in the English-speaking world.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=O",
        },
        {
          name: "University Of Oxford", // Fuzzy match - different casing
          website: "https://www.ox.ac.uk",
          description:
            "A collegiate research university in Oxford, England, and the oldest university in the English-speaking world.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=O",
        },
        {
          name: "University of Cambridge",
          website: "https://www.cam.ac.uk",
          description:
            "A collegiate research university in Cambridge, United Kingdom.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=C",
        },
        {
          name: "Imperial College London",
          website: "https://www.imperial.ac.uk",
          description:
            "A public research university in London, specializing in science, engineering, medicine, and business.",
          logoUrl: null,
        },
        {
          name: "London School of Economics",
          website: "https://www.lse.ac.uk",
          description:
            "A public research university in London, specializing in social sciences.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=LSE",
        },
      ],
      3: [
        {
          name: "University of Toronto", // Exact match
          website: "https://www.utoronto.ca",
          description:
            "A public research university in Toronto, Ontario, Canada, and one of the top universities in the world.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UoT",
        },
        {
          name: "University of  Toronto", // Fuzzy match - extra space
          website: "https://www.utoronto.ca",
          description:
            "A public research university in Toronto, Ontario, Canada, and one of the top universities in the world.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UoT",
        },
        {
          name: "McGill University",
          website: "https://www.mcgill.ca",
          description:
            "A public research university in Montreal, Quebec, Canada.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=MU",
        },
        {
          name: "University of British Columbia",
          website: "https://www.ubc.ca",
          description:
            "A public research university with campuses in Vancouver and Kelowna, British Columbia.",
          logoUrl: null,
        },
      ],
      4: [
        {
          name: "University of Melbourne", // Exact match
          website: "https://www.unimelb.edu.au",
          description:
            "A public research university located in Melbourne, Australia.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UM",
        },
        {
          name: "University ofMelbourne", // Fuzzy match - missing space
          website: "https://www.unimelb.edu.au",
          description:
            "A public research university located in Melbourne, Australia.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UM",
        },
        {
          name: "Australian National University",
          website: "https://www.anu.edu.au",
          description:
            "A public research university located in Canberra, Australia.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=ANU",
        },
        {
          name: "University of Sydney",
          website: "https://www.sydney.edu.au",
          description:
            "A public research university located in Sydney, Australia.",
          logoUrl: null,
        },
      ],
      5: [
        {
          name: "Technical University of Munich", // Exact match
          website: "https://www.tum.de",
          description:
            "A research university with campuses in Munich, Garching, and Freising-Weihenstephan, Germany.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=TUM",
        },
        {
          name: "Technical University Of Munich", // Fuzzy match - different casing
          website: "https://www.tum.de",
          description:
            "A research university with campuses in Munich, Garching, and Freising-Weihenstephan, Germany.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=TUM",
        },
        {
          name: "Ludwig Maximilian University of Munich",
          website: "https://www.lmu.de",
          description:
            "A public research university in Munich, Germany, and one of the oldest universities in Germany.",
          logoUrl: null,
        },
      ],
      6: [
        {
          name: "Sorbonne University",
          website: "https://www.sorbonne-universite.fr",
          description:
            "A public research university in Paris, France, formed by the merger of Paris-Sorbonne University and Pierre and Marie Curie University.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=SU",
        },
        {
          name: "École Polytechnique",
          website: "https://www.polytechnique.edu",
          description:
            "A public research university in Palaiseau, France, specializing in science and engineering.",
          logoUrl: null,
        },
      ],
      7: [
        {
          name: "University of Tokyo",
          website: "https://www.u-tokyo.ac.jp",
          description:
            "A public research university located in Bunkyō, Tokyo, Japan.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UT",
        },
        {
          name: "Kyoto University",
          website: "https://www.kyoto-u.ac.jp",
          description:
            "A public research university located in Kyoto, Japan.",
          logoUrl: null,
        },
      ],
      8: [
        {
          name: "Seoul National University",
          website: "https://www.snu.ac.kr",
          description:
            "A public research university located in Seoul, South Korea.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=SNU",
        },
        {
          name: "Korea Advanced Institute of Science and Technology",
          website: "https://www.kaist.ac.kr",
          description:
            "A national research university located in Daejeon, South Korea.",
          logoUrl: null,
        },
      ],
      9: [
        {
          name: "University of Tehran",
          website: "https://www.ut.ac.ir",
          description:
            "A public research university in Tehran, Iran, and the oldest and largest university in Iran.",
          logoUrl: "https://via.placeholder.com/100x100/0037ff/ffffff?text=UT",
        },
        {
          name: "Sharif University of Technology",
          website: "https://www.sharif.edu",
          description:
            "A public research university in Tehran, Iran, specializing in engineering and physical sciences.",
          logoUrl: null,
        },
      ],
    };

    return universityData[countryId] || [];
  };

  const handleCheck = async () => {
    if (!selectedCountry) {
      alert("Please select a country first");
      return;
    }

    setLoading(true);
    setHasSearched(false);
    setSelectedUniversities([]);
    setSearchTerm("");

    // Simulate AI call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get AI-generated universities
    const aiGeneratedUniversities = simulateAICall(
      parseInt(selectedCountry),
      sourceUrl
    );

    // Compare with existing universities
    const countryId = parseInt(selectedCountry);
    const existingUniversitySlugs = existingUniversities
      .filter((uni) => uni.countryId === countryId)
      .map((uni) => uni.slug.toLowerCase());

    const processedUniversities = aiGeneratedUniversities.map((uni) => {
      const slug = generateSlug(uni.name);
      const exactMatch = existingUniversitySlugs.includes(slug.toLowerCase());
      
      // Check for fuzzy match if no exact match
      let fuzzyMatch = null;
      if (!exactMatch) {
        fuzzyMatch = findFuzzyMatch(uni.name, countryId);
      }

      return {
        name: uni.name,
        slug: slug,
        website: uni.website,
        description: uni.description,
        logoUrl: uni.logoUrl,
        countryId: countryId,
        exists: exactMatch,
        fuzzyMatch: fuzzyMatch,
      };
    });

    setAiUniversities(processedUniversities);
    setLoading(false);
    setHasSearched(true);
  };

  const handleUniversityToggle = (universitySlug) => {
    setSelectedUniversities((prev) => {
      if (prev.includes(universitySlug)) {
        return prev.filter((slug) => slug !== universitySlug);
      } else {
        return [...prev, universitySlug];
      }
    });
  };

  const handleSelectAll = () => {
    const newUniversities = aiUniversities
      .filter((uni) => !uni.exists)
      .map((uni) => uni.slug);

    if (selectedUniversities.length === newUniversities.length) {
      setSelectedUniversities([]);
    } else {
      setSelectedUniversities(newUniversities);
    }
  };

  const handleImportSelected = () => {
    if (selectedUniversities.length === 0) {
      alert("Please select at least one university to import");
      return;
    }

    // Simulate import
    console.log("Importing universities:", selectedUniversities);
    alert(`Successfully imported ${selectedUniversities.length} university/universities!`);

    // Update existing universities (in real app, this would be an API call)
    const universitiesToImport = aiUniversities.filter((uni) =>
      selectedUniversities.includes(uni.slug)
    );

    const newUniversities = universitiesToImport.map((uni, index) => ({
      id: existingUniversities.length + index + 1,
      name: uni.name,
      slug: uni.slug,
      website: uni.website,
      description: uni.description,
      logoUrl: uni.logoUrl,
      countryId: uni.countryId,
    }));

    setExistingUniversities([...existingUniversities, ...newUniversities]);

    // Update AI universities list to mark imported universities as existing
    setAiUniversities((prev) =>
      prev.map((uni) =>
        selectedUniversities.includes(uni.slug)
          ? { ...uni, exists: true, fuzzyMatch: null }
          : uni
      )
    );

    setSelectedUniversities([]);
  };

  const openComparisonModal = (university) => {
    setComparisonModal({
      aiUniversity: university,
      existingUniversity: university.fuzzyMatch.match,
      similarity: university.fuzzyMatch.similarity,
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

    const { aiUniversity, existingUniversity, override } = comparisonModal;

    if (override) {
      // Update existing university with AI data
      setExistingUniversities((prev) =>
        prev.map((uni) =>
          uni.id === existingUniversity.id
            ? {
                ...uni,
                name: aiUniversity.name,
                slug: aiUniversity.slug,
                website: aiUniversity.website,
                description: aiUniversity.description,
                logoUrl: aiUniversity.logoUrl,
              }
            : uni
        )
      );

      // Update AI universities list to mark as existing
      setAiUniversities((prev) =>
        prev.map((uni) =>
          uni.slug === aiUniversity.slug
            ? { ...uni, exists: true, fuzzyMatch: null }
            : uni
        )
      );

      alert(
        `Successfully updated "${existingUniversity.name}" with AI-generated data!`
      );
    } else {
      // Import as new university
      const newUniversity = {
        id: existingUniversities.length + 1,
        name: aiUniversity.name,
        slug: aiUniversity.slug,
        website: aiUniversity.website,
        description: aiUniversity.description,
        logoUrl: aiUniversity.logoUrl,
        countryId: aiUniversity.countryId,
      };

      setExistingUniversities((prev) => [...prev, newUniversity]);

      // Update AI universities list to mark as existing
      setAiUniversities((prev) =>
        prev.map((uni) =>
          uni.slug === aiUniversity.slug
            ? { ...uni, exists: true, fuzzyMatch: null }
            : uni
        )
      );

      alert(
        `Successfully imported "${aiUniversity.name}" as a new university!`
      );
    }

    closeComparisonModal();
  };

  const selectedCountryName = countries.find(
    (c) => c.id === parseInt(selectedCountry)
  )?.name;

  // Filter universities based on search term
  const filteredUniversities = useMemo(() => {
    if (!searchTerm.trim()) {
      return aiUniversities;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return aiUniversities.filter((uni) => {
      return (
        uni.name.toLowerCase().includes(searchLower) ||
        uni.slug.toLowerCase().includes(searchLower) ||
        uni.website.toLowerCase().includes(searchLower) ||
        uni.description.toLowerCase().includes(searchLower)
      );
    });
  }, [aiUniversities, searchTerm]);

  // Calculate statistics based on filtered results
  const stats = useMemo(() => {
    const total = filteredUniversities.length;
    const existing = filteredUniversities.filter((uni) => uni.exists).length;
    const newCount = total - existing;
    return { total, existing, new: newCount };
  }, [filteredUniversities]);

  const newUniversitiesCount = aiUniversities.filter(
    (uni) => !uni.exists
  ).length;
  const allNewSelected =
    newUniversitiesCount > 0 &&
    selectedUniversities.length === newUniversitiesCount &&
    aiUniversities
      .filter((uni) => !uni.exists)
      .every((uni) => selectedUniversities.includes(uni.slug));

  return (
    <div className={styles["university-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Building2 size={24} />
          </div>
          <div>
            <h1>AI Import - University</h1>
            <p>Import university data using AI</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className={styles["filter-bar"]}>
        <div className={styles["filter-group"]}>
          <label className={styles["filter-label"]}>
            <Globe size={18} />
            Select Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setHasSearched(false);
              setAiUniversities([]);
              setSelectedUniversities([]);
            }}
            className={styles["country-select"]}
          >
            <option value="">Choose a country...</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
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
            placeholder="https://example.com/universities"
            className={styles["source-url-input"]}
          />
        </div>
        <button
          onClick={handleCheck}
          disabled={!selectedCountry || loading}
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

      {/* Results Section */}
      {hasSearched && (
        <div className={styles["results-section"]}>
          <div className={styles["results-header"]}>
            <div className={styles["results-info"]}>
              <h3>
                Universities for {selectedCountryName} ({aiUniversities.length}{" "}
                found)
              </h3>
              <p>
                {newUniversitiesCount} new universities available for import,{" "}
                {aiUniversities.length - newUniversitiesCount} already exist in
                database
              </p>
            </div>
            {newUniversitiesCount > 0 && (
              <div className={styles["action-buttons"]}>
                <button
                  onClick={handleSelectAll}
                  className={styles["select-all-btn"]}
                >
                  {allNewSelected ? "Deselect All" : "Select All New"}
                </button>
            {selectedUniversities.length > 0 && (
              <button
                onClick={handleImportSelected}
                disabled={
                  selectedUniversities.some((slug) => {
                    const university = aiUniversities.find((u) => u.slug === slug);
                    return !university || !university.name || !university.slug;
                  })
                }
                className={styles["import-btn"]}
              >
                Import Selected ({selectedUniversities.length})
              </button>
            )}
              </div>
            )}
          </div>

          {/* Search and Stats Bar */}
          <div className={styles["search-stats-bar"]}>
            <div className={styles["search-container"]}>
              <Search size={16} className={styles["search-icon"]} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search universities..."
                className={styles["search-input"]}
              />
            </div>
            <div className={styles["stats-minimal"]}>
              Total: {stats.total} · Existing: {stats.existing} · New: {stats.new}
            </div>
          </div>

          {/* Universities Table */}
          <div className={styles["table-container"]}>
            <table className={styles["universities-table"]}>
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th>University</th>
                  <th>Slug</th>
                  <th>Website</th>
                  <th>Description</th>
                  <th style={{ width: "150px", textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUniversities.length > 0 ? (
                  filteredUniversities.map((university, index) => (
                    <React.Fragment key={`${university.slug}-${index}`}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <div className={styles["university-info"]}>
                            {university.logoUrl ? (
                              <div className={styles["university-logo"]}>
                                <img
                                  src={university.logoUrl}
                                  alt={`${university.name} logo`}
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    if (e.target.nextSibling) {
                                      e.target.nextSibling.style.display = "flex";
                                    }
                                  }}
                                />
                                <div
                                  className={styles["logo-fallback"]}
                                  style={{ display: "none" }}
                                >
                                  <Building2 size={16} />
                                </div>
                              </div>
                            ) : (
                              <div className={styles["university-logo"]}>
                                <div className={styles["logo-fallback"]}>
                                  <Building2 size={16} />
                                </div>
                              </div>
                            )}
                            <div className={styles["university-details"]}>
                              <span className={styles["university-name"]}>
                                {university.name}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <code className={styles["slug-code"]}>
                            {university.slug}
                          </code>
                        </td>
                        <td>
                          <a
                            href={university.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles["website-link"]}
                          >
                            <ExternalLink size={14} />
                            Visit Website
                          </a>
                        </td>
                        <td>
                          <div className={styles["description"]}>
                            {university.description}
                          </div>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {university.exists ? (
                            <span className={styles["exists-badge"]}>
                              Exists
                            </span>
                          ) : (
                            <label className={styles["checkbox-label"]}>
                              <input
                                type="checkbox"
                                checked={selectedUniversities.includes(
                                  university.slug
                                )}
                                onChange={() =>
                                  handleUniversityToggle(university.slug)
                                }
                                className={styles["checkbox-input"]}
                              />
                              <span className={styles["checkbox-custom"]}></span>
                              <span className={styles["checkbox-text"]}>
                                Select
                              </span>
                            </label>
                          )}
                        </td>
                      </tr>
                      {/* Fuzzy Match Warning */}
                      {university.fuzzyMatch && !university.exists && (
                        <tr className={styles["fuzzy-match-row"]}>
                          <td colSpan="6">
                            <div className={styles["fuzzy-match-warning"]}>
                              <AlertTriangle size={16} />
                              <span>
                                A similar university already exists (
                                {university.fuzzyMatch.similarity.toFixed(1)}%
                                similarity). You can still import it.
                              </span>
                              <button
                                onClick={() => openComparisonModal(university)}
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
                    <td colSpan="6" className={styles["empty-state"]}>
                      <div className={styles["empty-content"]}>
                        <Building2 size={48} className={styles["empty-icon"]} />
                        <h3>
                          {searchTerm
                            ? "No universities match your search"
                            : "No universities found"}
                        </h3>
                        <p>
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Select a country and click 'Check' to find universities"}
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

      {/* Empty State - Before Search */}
      {!hasSearched && !loading && (
        <div className={styles["empty-state-container"]}>
          <div className={styles["empty-state"]}>
            <Building2 size={48} className={styles["empty-icon"]} />
            <h3>Ready to Import Universities</h3>
            <p>
              Select a country from the dropdown above and click "Check" to
              find universities using AI
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
                <h2>University Comparison</h2>
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
                <h3>AI-Generated University</h3>
                <div className={styles["comparison-field"]}>
                  <label>Name</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiUniversity.name}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Slug</label>
                  <div className={styles["field-value"]}>
                    <code>{comparisonModal.aiUniversity.slug}</code>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Website</label>
                  <div className={styles["field-value"]}>
                    <a
                      href={comparisonModal.aiUniversity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {comparisonModal.aiUniversity.website}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Description</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiUniversity.description}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Logo URL</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.aiUniversity.logoUrl || "Not provided"}
                  </div>
                </div>
              </div>

              <div className={styles["comparison-column"]}>
                <h3>Existing Database Record</h3>
                <div className={styles["comparison-field"]}>
                  <label>Name</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingUniversity.name}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Slug</label>
                  <div className={styles["field-value"]}>
                    <code>{comparisonModal.existingUniversity.slug}</code>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Website</label>
                  <div className={styles["field-value"]}>
                    <a
                      href={comparisonModal.existingUniversity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {comparisonModal.existingUniversity.website}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Description</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingUniversity.description}
                  </div>
                </div>
                <div className={styles["comparison-field"]}>
                  <label>Logo URL</label>
                  <div className={styles["field-value"]}>
                    {comparisonModal.existingUniversity.logoUrl || "Not provided"}
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
                      Override (Update Existing University)
                    </span>
                    <span className={styles["override-description"]}>
                      Override will update the existing university with the AI
                      data. If you do not override, the record will be imported
                      as a new university.
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
                  !comparisonModal.aiUniversity.name ||
                  !comparisonModal.aiUniversity.slug
                }
                className={styles["apply-btn"]}
              >
                {comparisonModal.override
                  ? "Update Existing University"
                  : "Import as New University"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default University;
