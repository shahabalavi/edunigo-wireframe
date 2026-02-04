import React, { useState, useEffect, useMemo } from "react";
import { Upload, Link as LinkIcon, FileText, Globe, Building2, School, MapPin, X, Download, Loader2 } from "lucide-react";
import styles from "./ImportEngine.module.css";

// Filter Components
import CityFilter from "./Filters/CityFilter";
import UniversityFilter from "./Filters/UniversityFilter";
import CampusFilter from "./Filters/CampusFilter";
import CourseFilter from "./Filters/CourseFilter";

// Table Components
import CityTable from "./Tables/CityTable";
import UniversityTable from "./Tables/UniversityTable";
import CampusTable from "./Tables/CampusTable";
import CourseTable from "./Tables/CourseTable";

const ImportEngine = () => {
  const [dataType, setDataType] = useState("");
  const [inputMethod, setInputMethod] = useState("url"); // "url" or "manual"
  const [sourceUrl, setSourceUrl] = useState("");
  const [manualContent, setManualContent] = useState("");
  const [cleanedContent, setCleanedContent] = useState("");
  const [parsedData, setParsedData] = useState([]);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // Filter states for different data types
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCampus, setSelectedCampus] = useState("");

  // Existing data for filtering
  const [existingUniversities, setExistingUniversities] = useState([]);
  const [existingCities, setExistingCities] = useState([]);
  const [existingCampuses, setExistingCampuses] = useState([]);

  // Load all data on mount
  useEffect(() => {
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

    // Load existing universities
    const sampleExistingUniversities = [
      { id: 1, name: "Harvard University", slug: "harvard-university", countryId: 1 },
      { id: 2, name: "University of Oxford", slug: "university-of-oxford", countryId: 2 },
      { id: 3, name: "University of Toronto", slug: "university-of-toronto", countryId: 3 },
      { id: 4, name: "University of Melbourne", slug: "university-of-melbourne", countryId: 4 },
      { id: 5, name: "Massachusetts Institute of Technology", slug: "massachusetts-institute-of-technology", countryId: 1 },
    ];
    setExistingUniversities(sampleExistingUniversities);

    // Load existing cities
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

    // Load existing campuses
    const sampleExistingCampuses = [
      { id: 1, name: "Harvard Main Campus", slug: "harvard-main-campus", universityId: 1, cityId: 5, countryId: 1 },
      { id: 2, name: "Oxford Main Campus", slug: "oxford-main-campus", universityId: 2, cityId: 6, countryId: 2 },
      { id: 3, name: "MIT Main Campus", slug: "mit-main-campus", universityId: 5, cityId: 5, countryId: 1 },
    ];
    setExistingCampuses(sampleExistingCampuses);
  }, []);

  // Filter universities by selected country
  const filteredUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return existingUniversities.filter(
      (uni) => uni.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingUniversities]);

  // Filter cities by selected country
  const filteredCities = useMemo(() => {
    if (!selectedCountry) return [];
    return existingCities.filter(
      (city) => city.countryId === parseInt(selectedCountry)
    );
  }, [selectedCountry, existingCities]);

  // Filter universities by selected city (for Course module)
  const filteredUniversitiesByCity = useMemo(() => {
    if (!selectedCity) return [];
    // In real implementation, this would filter by city
    // For now, return all universities in the same country as the city
    const city = existingCities.find((c) => c.id === parseInt(selectedCity));
    if (!city) return [];
    return existingUniversities.filter(
      (uni) => uni.countryId === city.countryId
    );
  }, [selectedCity, existingCities, existingUniversities]);

  // Filter campuses by selected university
  const filteredCampuses = useMemo(() => {
    if (!selectedUniversity) return [];
    return existingCampuses.filter(
      (campus) => campus.universityId === parseInt(selectedUniversity)
    );
  }, [selectedUniversity, existingCampuses]);

  // Reset filters when data type changes
  useEffect(() => {
    setSelectedCountry("");
    setSelectedCity("");
    setSelectedUniversity("");
    setSelectedCampus("");
  }, [dataType]);

  // Reset child filters when parent changes
  useEffect(() => {
    setSelectedUniversity("");
    setSelectedCity("");
    setSelectedCampus("");
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedUniversity("");
    setSelectedCampus("");
  }, [selectedCity]);

  useEffect(() => {
    setSelectedCampus("");
  }, [selectedUniversity]);

  const handleDataTypeChange = (e) => {
    setDataType(e.target.value);
    setSourceUrl("");
    setManualContent("");
  };

  const handleInputMethodChange = (method) => {
    setInputMethod(method);
    // Don't clear content when switching modes - keep it visible
    if (method === "url") {
      // Keep manualContent visible even in URL mode
    }
  };

  // Simulate fetching content from URL
  const handleFetchUrl = async () => {
    if (!sourceUrl.trim()) {
      return;
    }

    // Validate URL format
    try {
      new URL(sourceUrl);
    } catch (e) {
      return;
    }

    setIsFetching(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate fetched HTML content
    const simulatedHTML = `
<!DOCTYPE html>
<html>
<head>
  <title>Sample University Data</title>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial; }
    .university { margin: 10px 0; }
  </style>
</head>
<body>
  <h1>Universities List</h1>
  <div class="university">
    <h2>Harvard University</h2>
    <p>Website: https://www.harvard.edu</p>
    <p>Description: A private Ivy League research university in Cambridge, Massachusetts.</p>
    <img src="harvard-logo.png" alt="Harvard Logo" />
  </div>
  <div class="university">
    <h2>Massachusetts Institute of Technology</h2>
    <p>Website: https://www.mit.edu</p>
    <p>Description: A private research university in Cambridge, Massachusetts.</p>
    <img src="mit-logo.png" alt="MIT Logo" />
  </div>
  <div class="university">
    <h2>Stanford University</h2>
    <p>Website: https://www.stanford.edu</p>
    <p>Description: A private research university in Stanford, California.</p>
    <img src="stanford-logo.png" alt="Stanford Logo" />
  </div>
  <div class="university">
    <h2>University of California, Berkeley</h2>
    <p>Website: https://www.berkeley.edu</p>
    <p>Description: A public research university in Berkeley, California.</p>
  </div>
  <div class="university">
    <h2>Yale University</h2>
    <p>Website: https://www.yale.edu</p>
    <p>Description: A private Ivy League research university in New Haven, Connecticut.</p>
  </div>
  <script>
    console.log("Some JavaScript code");
  </script>
</body>
</html>
    `.trim();

    // Insert fetched content into textarea
    setManualContent(simulatedHTML);
    setCleanedContent("");
    setParsedData([]);
    setHasProcessed(false);
    setIsFetching(false);
  };

// Super-powered HTML cleaning function for AI data processing
const cleanHTML = (html) => {
    if (!html) return "";
  
    // Prefer DOM-based cleaning (browser / environments with DOMParser)
    if (typeof DOMParser !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
  
      // ---- 0. Preserve page title as top-level heading -----------------------
      const titleText = (doc.querySelector("title")?.textContent || "").trim();
      if (titleText && doc.body) {
        const h1 = doc.createElement("h1");
        h1.textContent = titleText;
        doc.body.insertBefore(h1, doc.body.firstChild);
      }
  
      // ---- 1. Unwrap forms / selects so their inner text is kept -------------
      const unwrapElements = (selector) => {
        doc.querySelectorAll(selector).forEach((el) => {
          const parent = el.parentNode;
          if (!parent) return;
          while (el.firstChild) {
            parent.insertBefore(el.firstChild, el);
          }
          parent.removeChild(el);
        });
      };
  
      unwrapElements("form");
      unwrapElements("select");
  
      // ---- 2. Remove whole blocks / tags we don't want -----------------------
      const removeSelectors = [
        // Structure / boilerplate
        "head",
        "header",
        "nav",
        "footer",
        "aside",
  
        // Code / behaviour / tracking (but keep JSON-LD data)
        "script:not([type='application/ld+json'])",
        "style",
        "link",
        "meta",
        "noscript",
        "iframe",
  
        // Purely visual/media
        "svg",
        "picture",
        "video",
        "img",
  
        // UI controls (search, filters, inputs)
        "input",
        "button",
        "label",
        "option",
        "textarea"
      ];
  
      removeSelectors.forEach((selector) => {
        doc.querySelectorAll(selector).forEach((el) => el.remove());
      });
  
      // ---- 3. Convert JSON-LD scripts into visible <pre> blocks --------------
      doc.querySelectorAll("script[type='application/ld+json']").forEach((el) => {
        const jsonText = el.textContent || "";
        const pre = doc.createElement("pre");
        pre.setAttribute("data-jsonld", "true");
        pre.textContent = jsonText.trim();
        el.replaceWith(pre);
      });
  
      // ---- 4. Strip noisy attributes from remaining elements -----------------
      const attrPatterns = [
        /^class$/i,
        /^className$/i,
        /^style$/i,
        /^id$/i,
        /^data-/i,
        /^aria-/i,
        /^role$/i,
        /^x-/i,        // Alpine / similar
        /^v-/i,        // Vue
        /^@.*/i,       // @click, @change, ...
        /^on[a-z]+/i   // onclick, onmouseover, ...
      ];
  
      doc.querySelectorAll("*").forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          const name = attr.name;
          if (attrPatterns.some((re) => re.test(name))) {
            el.removeAttribute(name);
          }
        });
      });
  
      // ---- 5. Get cleaned body HTML ------------------------------------------
      let cleaned = doc.body ? doc.body.innerHTML : "";
  
      // ---- 6. Normalize whitespace -------------------------------------------
      cleaned = cleaned.replace(/\n\s*\n/g, "\n");  // collapse blank lines
      cleaned = cleaned.replace(/[ \t]+/g, " ");    // collapse spaces/tabs
  
      return cleaned.trim();
    }
  
    // ===== Fallback: regex-only cleaning if DOMParser is not available ========
  
    let cleaned = html;
  
    // Remove <head> and content
    cleaned = cleaned.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
  
    // Remove non-JSON-LD scripts
    cleaned = cleaned.replace(
      /<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
      ""
    );
    cleaned = cleaned.replace(
      /<script(?![^>]*type=["']application\/ld\+json["'])[^>]*\/?>/gi,
      ""
    );
  
    // Keep JSON-LD but surface it as <pre data-jsonld="true">...</pre>
    cleaned = cleaned.replace(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      (_match, json) => `<pre data-jsonld="true">${json.trim()}</pre>`
    );
  
    // Remove style, link, meta, noscript
    cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
    cleaned = cleaned.replace(/<link[^>]*>/gi, "");
    cleaned = cleaned.replace(/<meta[^>]*>/gi, "");
    cleaned = cleaned.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "");
  
    // Remove structural / media / UI tags and content
    const blockTags = [
      "header",
      "nav",
      "footer",
      "aside",
      "iframe",
      "svg",
      "picture",
      "video"
    ];
    blockTags.forEach((tag) => {
      const re = new RegExp(`<${tag}[^>]*>[\\s\\S]*?<\\/${tag}>`, "gi");
      cleaned = cleaned.replace(re, "");
    });
  
    // Remove standalone tags (forms/inputs/buttons etc.)
    cleaned = cleaned.replace(/<form[^>]*>[\s\S]*?<\/form>/gi, "");
    cleaned = cleaned.replace(/<img[^>]*>/gi, "");
    cleaned = cleaned.replace(/<input[^>]*>/gi, "");
    cleaned = cleaned.replace(/<button[^>]*>[\s\S]*?<\/button>/gi, "");
    cleaned = cleaned.replace(/<select[^>]*>[\s\S]*?<\/select>/gi, "");
    cleaned = cleaned.replace(/<textarea[^>]*>[\s\S]*?<\/textarea>/gi, "");
  
    // Remove noisy attributes: class, id, style, data-*, aria-*, role, x-*, v-*, on*, @*
    cleaned = cleaned.replace(/\s+(class|className|id|style|role)\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+(class|className|id|style|role)\s*=\s*[^>\s]*/gi, "");
    cleaned = cleaned.replace(/\s+data-[a-z0-9_-]*\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+data-[a-z0-9_-]*\s*=\s*[^>\s]*/gi, "");
    cleaned = cleaned.replace(/\s+aria-[a-z0-9_-]*\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+aria-[a-z0-9_-]*\s*=\s*[^>\s]*/gi, "");
    cleaned = cleaned.replace(/\s+x-[a-z0-9_-]*\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+x-[a-z0-9_-]*\s*=\s*[^>\s]*/gi, "");
    cleaned = cleaned.replace(/\s+v-[a-z0-9_-]*\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+v-[a-z0-9_-]*\s*=\s*[^>\s]*/gi, "");
    cleaned = cleaned.replace(/\s+@[a-z0-9_-]*\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+@[a-z0-9_-]*\s*=\s*[^>\s]*/gi, "");
    cleaned = cleaned.replace(/\s+on[a-z]+\s*=\s*["'][^"']*["']/gi, "");
    cleaned = cleaned.replace(/\s+on[a-z]+\s*=\s*[^>\s]*/gi, "");
  
    // Whitespace normalization
    cleaned = cleaned.replace(/\n\s*\n/g, "\n");
    cleaned = cleaned.replace(/[ \t]+/g, " ");
  
    return cleaned.trim();
  };

  // Generate mock data based on data type (for Import button)
  const generateMockData = (type) => {
    if (!type) return [];

    switch (type) {
      case "city":
        const cityNames = [
          "Boston", "Chicago", "Los Angeles", "San Francisco", "Seattle",
          "Miami", "Denver", "Portland", "Austin", "Nashville"
        ];
        return cityNames.map((name, index) => ({
          id: index + 1,
          name: name,
          exists: existingCities.some(
            (c) => c.name.toLowerCase() === name.toLowerCase() && c.countryId === parseInt(selectedCountry)
          ),
        }));

      case "university":
        const universityNames = [
          "Harvard University",
          "Stanford University",
          "Massachusetts Institute of Technology",
          "University of California, Berkeley",
          "Yale University",
          "Princeton University",
          "Columbia University",
          "University of Chicago",
          "California Institute of Technology",
          "Duke University"
        ];
        return universityNames.map((name, index) => {
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return {
            id: index + 1,
            name: name,
            slug: slug,
            website: `https://www.${slug.replace(/-/g, "")}.edu`,
            description: `A prestigious university located in the United States. ${name} is known for its academic excellence and research programs.`,
            exists: existingUniversities.some(
              (u) => u.slug === slug && u.countryId === parseInt(selectedCountry)
            ),
          };
        });

      case "campus":
        const selectedUni = filteredUniversities.find((u) => u.id === parseInt(selectedUniversity));
        const campusNames = [
          "Main Campus",
          "North Campus",
          "South Campus",
          "Downtown Campus",
          "Research Campus",
          "Medical Campus",
          "Business Campus",
          "Engineering Campus"
        ];
        const cityOptions = ["Boston", "Cambridge", "New York", "Los Angeles", "Chicago"];
        return campusNames.slice(0, 8).map((campusName, index) => {
          const fullName = selectedUni ? `${selectedUni.name} - ${campusName}` : `Campus ${index + 1}`;
          const city = cityOptions[index % cityOptions.length];
          const slug = fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          const cityExists = existingCities.some(
            (c) => c.name.toLowerCase() === city.toLowerCase() && c.countryId === parseInt(selectedCountry)
          );
          return {
            id: index + 1,
            name: fullName,
            slug: slug,
            university: selectedUni?.name || "Unknown University",
            city: city,
            address: `${fullName}, ${city}, ${countries.find(c => c.id === parseInt(selectedCountry))?.name || ""}`,
            status: index % 3 === 0 ? "Inactive" : "Active",
            exists: existingCampuses.some((c) => c.slug === slug),
            cityExists: cityExists,
          };
        });

      case "course":
        const courseNames = [
          "Computer Science",
          "Business Administration",
          "Mechanical Engineering",
          "Psychology",
          "Economics",
          "Biology",
          "Chemistry",
          "Mathematics",
          "Physics",
          "Political Science"
        ];
        const educationLevels = ["Bachelor's Degree", "Master's Degree", "Doctorate", "Certificate"];
        const majors = ["General", "Specialized", "Advanced", "Research"];
        return courseNames.map((name, index) => {
          const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          return {
            id: index + 1,
            name: name,
            slug: slug,
            description: `A comprehensive ${name} program designed to provide students with in-depth knowledge and practical skills in the field.`,
            educationLevel: educationLevels[index % educationLevels.length],
            major: majors[index % majors.length],
            status: index % 4 === 0 ? "Inactive" : "Active",
            exists: false,
            educationLevelExists: true,
            majorExists: true,
          };
        });

      default:
        return [];
    }
  };

  const handleClean = () => {
    if (manualContent.trim()) {
      const cleaned = cleanHTML(manualContent);
      setCleanedContent(cleaned);
      setManualContent(cleaned);
    }
  };

  const handleImport = () => {
    if (!dataType) {
      return;
    }

    if (inputMethod === "url" && !sourceUrl.trim()) {
      return;
    }

    if (inputMethod === "manual" && !manualContent.trim()) {
      return;
    }

    // Validate filters based on data type
    let isValid = true;
    let errorMessage = "";

    switch (dataType) {
      case "city":
        if (!selectedCountry) {
          isValid = false;
          errorMessage = "Please select a country";
        }
        break;
      case "university":
        if (!selectedCountry) {
          isValid = false;
          errorMessage = "Please select a country";
        }
        break;
      case "campus":
        if (!selectedCountry || !selectedUniversity) {
          isValid = false;
          errorMessage = "Please select a country and university";
        }
        break;
      case "course":
        if (!selectedCountry || !selectedCity || !selectedUniversity || !selectedCampus) {
          isValid = false;
          errorMessage = "Please select all required filters (Country, City, University, Campus)";
        }
        break;
      default:
        break;
    }

    if (!isValid) {
      return;
    }

    // Generate mock data for the table (not parsing actual content)
    const mockData = generateMockData(dataType);
    setParsedData(mockData);
    setHasProcessed(true);
    setSelectedItems([]);
    setSearchTerm("");

    console.log("Importing:", {
      dataType,
      inputMethod,
      sourceUrl: inputMethod === "url" ? sourceUrl : null,
      manualContent: inputMethod === "manual" ? manualContent : null,
      filters: {
        country: selectedCountry,
        city: selectedCity,
        university: selectedUniversity,
        campus: selectedCampus,
      },
      parsedData: mockData,
    });
  };

  const getDataTypeIcon = () => {
    switch (dataType) {
      case "city":
        return <MapPin size={20} />;
      case "university":
        return <Building2 size={20} />;
      case "campus":
        return <School size={20} />;
      case "course":
        return <FileText size={20} />;
      default:
        return <Upload size={20} />;
    }
  };

  // Filter parsed data based on search term
  const filteredParsedData = useMemo(() => {
    if (!searchTerm.trim()) {
      return parsedData;
    }
    const searchLower = searchTerm.toLowerCase().trim();
    return parsedData.filter((item) => {
      if (dataType === "city") {
        return item.name.toLowerCase().includes(searchLower);
      } else if (dataType === "university") {
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.slug.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
        );
      } else if (dataType === "campus") {
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.city.toLowerCase().includes(searchLower) ||
          item.university.toLowerCase().includes(searchLower)
        );
      } else if (dataType === "course") {
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.educationLevel.toLowerCase().includes(searchLower) ||
          item.major.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [parsedData, searchTerm, dataType]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = filteredParsedData.length;
    const existing = filteredParsedData.filter((item) => item.exists).length;
    const newCount = total - existing;
    return { total, existing, new: newCount };
  }, [filteredParsedData]);

  // Handle item toggle
  const handleItemToggle = (itemId) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  // Handle select all
  const handleSelectAll = () => {
    const newItems = filteredParsedData
      .filter((item) => !item.exists)
      .map((item) => item.id);
    setSelectedItems(newItems);
  };

  // Handle deselect all
  const handleDeselectAll = () => {
    setSelectedItems([]);
  };

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const renderFilters = () => {
    if (!dataType) return null;

    switch (dataType) {
      case "city":
        return (
          <CityFilter
            countries={countries}
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        );

      case "university":
        return (
          <UniversityFilter
            countries={countries}
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        );

      case "campus":
        return (
          <CampusFilter
            countries={countries}
            selectedCountry={selectedCountry}
            selectedUniversity={selectedUniversity}
            selectedCity={selectedCity}
            filteredUniversities={filteredUniversities}
            filteredCities={filteredCities}
            onCountryChange={setSelectedCountry}
            onUniversityChange={setSelectedUniversity}
            onCityChange={setSelectedCity}
          />
        );

      case "course":
        return (
          <CourseFilter
            countries={countries}
            selectedCountry={selectedCountry}
            selectedCity={selectedCity}
            selectedUniversity={selectedUniversity}
            selectedCampus={selectedCampus}
            filteredCities={filteredCities}
            filteredUniversitiesByCity={filteredUniversitiesByCity}
            filteredCampuses={filteredCampuses}
            onCountryChange={setSelectedCountry}
            onCityChange={setSelectedCity}
            onUniversityChange={setSelectedUniversity}
            onCampusChange={setSelectedCampus}
          />
        );

      default:
        return null;
    }
  };

  const renderParsedDataTable = () => {
    if (!hasProcessed || parsedData.length === 0) return null;

    const selectedCountryName = countries.find(
      (c) => c.id === parseInt(selectedCountry)
    )?.name;

    switch (dataType) {
      case "city":
        return (
          <CityTable
            data={parsedData}
            filteredData={filteredParsedData}
            stats={stats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedItems={selectedItems}
            onItemToggle={handleItemToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onImport={() => {}}
            selectedCountryName={selectedCountryName}
          />
        );

      case "university":
        return (
          <UniversityTable
            data={parsedData}
            filteredData={filteredParsedData}
            stats={stats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedItems={selectedItems}
            onItemToggle={handleItemToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onImport={() => {}}
            selectedCountryName={selectedCountryName}
          />
        );

      case "campus":
        return (
          <CampusTable
            data={parsedData}
            filteredData={filteredParsedData}
            stats={stats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedItems={selectedItems}
            onItemToggle={handleItemToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onImport={() => {}}
          />
        );

      case "course":
        return (
          <CourseTable
            data={parsedData}
            filteredData={filteredParsedData}
            stats={stats}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedItems={selectedItems}
            onItemToggle={handleItemToggle}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onImport={() => {}}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles["import-engine-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Upload size={24} />
          </div>
          <div>
            <h1>Import Engine</h1>
            <p>Import data using AI with URL or manual content</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles["main-content"]}>
        {/* Data Type Selection */}
        <div className={styles["section"]}>
          <label className={styles["section-label"]}>
            <Upload size={18} />
            Select Data Type <span className={styles["required"]}>*</span>
          </label>
          <select
            value={dataType}
            onChange={handleDataTypeChange}
            className={styles["data-type-select"]}
          >
            <option value="">Choose data type...</option>
            <option value="city">City</option>
            <option value="university">University</option>
            <option value="campus">Campus</option>
            <option value="course">Course</option>
          </select>
        </div>

        {/* Dynamic Filters (shown immediately when data type is selected) */}
        {renderFilters()}

        {/* Input Method Selection */}
        {dataType && (
          <div className={styles["section"]}>
            <label className={styles["section-label"]}>
              {getDataTypeIcon()}
              Input Method
            </label>
            <div className={styles["input-method-buttons"]}>
              <button
                type="button"
                onClick={() => handleInputMethodChange("url")}
                className={`${styles["method-button"]} ${
                  inputMethod === "url" ? styles["method-button-active"] : ""
                }`}
              >
                <LinkIcon size={18} />
                URL
              </button>
              <button
                type="button"
                onClick={() => handleInputMethodChange("manual")}
                className={`${styles["method-button"]} ${
                  inputMethod === "manual" ? styles["method-button-active"] : ""
                }`}
              >
                <FileText size={18} />
                Manual Content
              </button>
            </div>
          </div>
        )}

        {/* URL Input */}
        {dataType && inputMethod === "url" && (
          <div className={styles["section"]}>
            <label className={styles["section-label"]}>
              <LinkIcon size={18} />
              Source URL <span className={styles["required"]}>*</span>
            </label>
            <div className={styles["url-fetch-container"]}>
              <div className={styles["url-input-container"]}>
                <LinkIcon size={18} className={styles["url-input-icon"]} />
                <input
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://example.com/data-source"
                  className={styles["url-input"]}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !isFetching) {
                      handleFetchUrl();
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={handleFetchUrl}
                disabled={!sourceUrl.trim() || isFetching}
                className={styles["fetch-button"]}
              >
                {isFetching ? (
                  <>
                    <Loader2 size={18} className={styles["spinner"]} />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Get
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Content Textarea - Always visible when data type is selected */}
        {dataType && (
          <div className={styles["section"]}>
            <label className={styles["section-label"]}>
              <FileText size={18} />
              {inputMethod === "url" ? "Fetched Content" : "Paste Content"} <span className={styles["required"]}>*</span>
            </label>
            <textarea
              value={manualContent}
              onChange={(e) => setManualContent(e.target.value)}
              placeholder={
                inputMethod === "url"
                  ? "Content will appear here after clicking 'Get' button..."
                  : "Paste your content here..."
              }
              className={styles["manual-content-textarea"]}
              rows={20}
              readOnly={inputMethod === "url" && !manualContent.trim()}
            />
            {inputMethod === "url" && !manualContent.trim() && (
              <p className={styles["hint-text"]}>
                Enter a URL above and click "Get" to fetch the content
              </p>
            )}
          </div>
        )}

        {/* Action Buttons - Show when content is available */}
        {dataType && manualContent.trim() && (
          <div className={styles["action-buttons"]}>
            <button
              type="button"
              onClick={handleClean}
              className={styles["clean-button"]}
            >
              <X size={18} />
              Clean
            </button>
            <button
              type="button"
              onClick={handleImport}
              className={styles["import-button"]}
            >
              <Upload size={18} />
              Import
            </button>
          </div>
        )}

        {/* Parsed Data Table */}
        {hasProcessed && parsedData.length > 0 && renderParsedDataTable()}
      </div>
    </div>
  );
};

export default ImportEngine;

