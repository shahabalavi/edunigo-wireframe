import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Check, Globe, Loader2, Link as LinkIcon, Search } from "lucide-react";
import styles from "./Cities.module.css";

const Cities = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [aiCities, setAiCities] = useState([]);
  const [existingCities, setExistingCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Load countries and existing cities on mount
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

    // Simulate loading existing cities from database
    const sampleExistingCities = [
      { id: 1, name: "New York", countryId: 1 },
      { id: 2, name: "London", countryId: 2 },
      { id: 3, name: "Toronto", countryId: 3 },
      { id: 4, name: "Sydney", countryId: 4 },
      { id: 5, name: "Berlin", countryId: 5 },
      { id: 6, name: "Paris", countryId: 6 },
      { id: 7, name: "Tokyo", countryId: 7 },
      { id: 8, name: "Seoul", countryId: 8 },
      { id: 9, name: "Tehran", countryId: 9 },
      { id: 10, name: "Los Angeles", countryId: 1 },
    ];
    setExistingCities(sampleExistingCities);
  }, []);

  // Simulate AI call to get cities for a country
  const simulateAICall = (countryId, sourceUrlParam) => {
    // In real implementation, sourceUrlParam would be sent to AI
    console.log("AI call with source URL:", sourceUrlParam);
    // Simulate different city lists based on country
    const cityData = {
      1: [
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
      ],
      2: [
        "London",
        "Manchester",
        "Birmingham",
        "Liverpool",
        "Leeds",
        "Sheffield",
        "Edinburgh",
        "Bristol",
        "Cardiff",
        "Glasgow",
      ],
      3: [
        "Toronto",
        "Vancouver",
        "Montreal",
        "Calgary",
        "Edmonton",
        "Ottawa",
        "Winnipeg",
        "Quebec City",
        "Hamilton",
        "Kitchener",
      ],
      4: [
        "Sydney",
        "Melbourne",
        "Brisbane",
        "Perth",
        "Adelaide",
        "Gold Coast",
        "Newcastle",
        "Canberra",
        "Sunshine Coast",
        "Wollongong",
      ],
      5: [
        "Berlin",
        "Munich",
        "Hamburg",
        "Cologne",
        "Frankfurt",
        "Stuttgart",
        "Düsseldorf",
        "Dortmund",
        "Essen",
        "Leipzig",
      ],
      6: [
        "Paris",
        "Marseille",
        "Lyon",
        "Toulouse",
        "Nice",
        "Nantes",
        "Strasbourg",
        "Montpellier",
        "Bordeaux",
        "Lille",
      ],
      7: [
        "Tokyo",
        "Yokohama",
        "Osaka",
        "Nagoya",
        "Sapporo",
        "Fukuoka",
        "Kobe",
        "Kawasaki",
        "Kyoto",
        "Saitama",
      ],
      8: [
        "Seoul",
        "Busan",
        "Incheon",
        "Daegu",
        "Daejeon",
        "Gwangju",
        "Suwon",
        "Ulsan",
        "Changwon",
        "Goyang",
      ],
      9: [
        "Tehran",
        "Mashhad",
        "Isfahan",
        "Karaj",
        "Shiraz",
        "Tabriz",
        "Qom",
        "Ahvaz",
        "Kermanshah",
        "Rasht",
      ],
    };

    return cityData[countryId] || [];
  };

  const handleCheck = async () => {
    if (!selectedCountry) {
      alert("Please select a country first");
      return;
    }

    setLoading(true);
    setHasSearched(false);
    setSelectedCities([]);
    setSearchTerm("");

    // Simulate AI call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Get AI-generated cities
    const aiGeneratedCities = simulateAICall(parseInt(selectedCountry), sourceUrl);
    
    // Compare with existing cities
    const countryId = parseInt(selectedCountry);
    const existingCityNames = existingCities
      .filter((city) => city.countryId === countryId)
      .map((city) => city.name.toLowerCase());

    const processedCities = aiGeneratedCities.map((cityName) => {
      const exists = existingCityNames.includes(cityName.toLowerCase());
      return {
        name: cityName,
        countryId: countryId,
        exists: exists,
      };
    });

    setAiCities(processedCities);
    setLoading(false);
    setHasSearched(true);
  };

  const handleCityToggle = (cityName) => {
    setSelectedCities((prev) => {
      if (prev.includes(cityName)) {
        return prev.filter((name) => name !== cityName);
      } else {
        return [...prev, cityName];
      }
    });
  };

  const handleSelectAll = () => {
    const newCities = aiCities
      .filter((city) => !city.exists)
      .map((city) => city.name);
    
    if (selectedCities.length === newCities.length) {
      setSelectedCities([]);
    } else {
      setSelectedCities(newCities);
    }
  };

  const handleImportSelected = () => {
    if (selectedCities.length === 0) {
      alert("Please select at least one city to import");
      return;
    }

    // Simulate import
    console.log("Importing cities:", selectedCities);
    alert(`Successfully imported ${selectedCities.length} city/cities!`);
    
    // Update existing cities (in real app, this would be an API call)
    const newCities = selectedCities.map((cityName, index) => ({
      id: existingCities.length + index + 1,
      name: cityName,
      countryId: parseInt(selectedCountry),
    }));
    
    setExistingCities([...existingCities, ...newCities]);
    
    // Update AI cities list to mark imported cities as existing
    setAiCities((prev) =>
      prev.map((city) =>
        selectedCities.includes(city.name)
          ? { ...city, exists: true }
          : city
      )
    );
    
    setSelectedCities([]);
  };

  const selectedCountryName = countries.find(
    (c) => c.id === parseInt(selectedCountry)
  )?.name;

  // Filter cities based on search term
  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) {
      return aiCities;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return aiCities.filter((city) => {
      return city.name.toLowerCase().includes(searchLower);
    });
  }, [aiCities, searchTerm]);

  // Calculate statistics based on filtered results
  const stats = useMemo(() => {
    const total = filteredCities.length;
    const existing = filteredCities.filter((city) => city.exists).length;
    const newCount = total - existing;
    return { total, existing, new: newCount };
  }, [filteredCities]);

  const newCitiesCount = aiCities.filter((city) => !city.exists).length;
  const allNewSelected =
    newCitiesCount > 0 &&
    selectedCities.length === newCitiesCount &&
    aiCities
      .filter((city) => !city.exists)
      .every((city) => selectedCities.includes(city.name));

  return (
    <div className={styles["cities-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <MapPin size={24} />
          </div>
          <div>
            <h1>AI Import - Cities</h1>
            <p>Import cities data using AI</p>
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
              setAiCities([]);
              setSelectedCities([]);
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
            placeholder="https://example.com/cities"
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
                Cities for {selectedCountryName} ({aiCities.length} found)
              </h3>
              <p>
                {newCitiesCount} new cities available for import,{" "}
                {aiCities.length - newCitiesCount} already exist in database
              </p>
            </div>
            {newCitiesCount > 0 && (
              <div className={styles["action-buttons"]}>
                <button
                  onClick={handleSelectAll}
                  className={styles["select-all-btn"]}
                >
                  {allNewSelected ? "Deselect All" : "Select All New"}
                </button>
            {selectedCities.length > 0 && (
              <button
                onClick={handleImportSelected}
                disabled={
                  selectedCities.some((cityName) => {
                    return !cityName || cityName.trim() === "";
                  })
                }
                className={styles["import-btn"]}
              >
                Import Selected ({selectedCities.length})
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
                placeholder="Search cities..."
                className={styles["search-input"]}
              />
            </div>
            <div className={styles["stats-minimal"]}>
              Total: {stats.total} · Existing: {stats.existing} · New: {stats.new}
            </div>
          </div>

          {/* Cities Table */}
          <div className={styles["table-container"]}>
            <table className={styles["cities-table"]}>
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th>City Name</th>
                  <th>Country</th>
                  <th style={{ width: "150px", textAlign: "center" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <tr key={`${city.name}-${index}`}>
                      <td>{index + 1}</td>
                      <td>
                        <div className={styles["city-name"]}>
                          <div className={styles["city-icon"]}>
                            <MapPin size={16} />
                          </div>
                          {city.name}
                        </div>
                      </td>
                      <td>
                        <span className={styles["country-badge"]}>
                          {selectedCountryName}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {city.exists ? (
                          <span className={styles["exists-badge"]}>
                            Exists
                          </span>
                        ) : (
                          <label className={styles["checkbox-label"]}>
                            <input
                              type="checkbox"
                              checked={selectedCities.includes(city.name)}
                              onChange={() => handleCityToggle(city.name)}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles["empty-state"]}>
                      <div className={styles["empty-content"]}>
                        <MapPin size={48} className={styles["empty-icon"]} />
                        <h3>
                          {searchTerm
                            ? "No cities match your search"
                            : "No cities found"}
                        </h3>
                        <p>
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Select a country and click 'Check' to find cities"}
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
            <MapPin size={48} className={styles["empty-icon"]} />
            <h3>Ready to Import Cities</h3>
            <p>
              Select a country from the dropdown above and click "Check" to
              find cities using AI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cities;
