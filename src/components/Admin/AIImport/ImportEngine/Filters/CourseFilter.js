import React from "react";
import { Building2, School, MapPin } from "lucide-react";
import CountryFilter from "./CountryFilter";
import styles from "../ImportEngine.module.css";

const CourseFilter = ({
  countries,
  selectedCountry,
  selectedCity,
  selectedUniversity,
  selectedCampus,
  filteredCities,
  filteredUniversitiesByCity,
  filteredCampuses,
  onCountryChange,
  onCityChange,
  onUniversityChange,
  onCampusChange,
}) => {
  return (
    <div className={styles["filters-container"]}>
      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={(value) => {
          onCountryChange(value);
          onCityChange("");
          onUniversityChange("");
          onCampusChange("");
        }}
      />
      <div className={styles["filter-group"]}>
        <label className={styles["filter-label"]}>
          <MapPin size={16} />
          City <span className={styles["required"]}>*</span>
        </label>
        <select
          value={selectedCity}
          onChange={(e) => {
            onCityChange(e.target.value);
            onUniversityChange("");
            onCampusChange("");
          }}
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
          <Building2 size={16} />
          University <span className={styles["required"]}>*</span>
        </label>
        <select
          value={selectedUniversity}
          onChange={(e) => {
            onUniversityChange(e.target.value);
            onCampusChange("");
          }}
          className={styles["filter-select"]}
          disabled={!selectedCity}
        >
          <option value="">Select University</option>
          {filteredUniversitiesByCity.map((university) => (
            <option key={university.id} value={university.id}>
              {university.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["filter-group"]}>
        <label className={styles["filter-label"]}>
          <School size={16} />
          Campus <span className={styles["required"]}>*</span>
        </label>
        <select
          value={selectedCampus}
          onChange={(e) => onCampusChange(e.target.value)}
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
    </div>
  );
};

export default CourseFilter;

