import React from "react";
import { Building2, MapPin } from "lucide-react";
import CountryFilter from "./CountryFilter";
import styles from "../ImportEngine.module.css";

const CampusFilter = ({
  countries,
  selectedCountry,
  selectedUniversity,
  selectedCity,
  filteredUniversities,
  filteredCities,
  onCountryChange,
  onUniversityChange,
  onCityChange,
}) => {
  return (
    <div className={styles["filters-container"]}>
      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={(value) => {
          onCountryChange(value);
          onUniversityChange("");
          onCityChange("");
        }}
      />
      <div className={styles["filter-group"]}>
        <label className={styles["filter-label"]}>
          <Building2 size={16} />
          University <span className={styles["required"]}>*</span>
        </label>
        <select
          value={selectedUniversity}
          onChange={(e) => onUniversityChange(e.target.value)}
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
          <MapPin size={16} />
          City (Optional)
        </label>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className={styles["filter-select"]}
          disabled={!selectedCountry}
        >
          <option value="">Select City (Optional)</option>
          {filteredCities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CampusFilter;

