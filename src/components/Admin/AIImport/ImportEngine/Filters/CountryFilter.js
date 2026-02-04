import React from "react";
import { Globe } from "lucide-react";
import styles from "../ImportEngine.module.css";

const CountryFilter = ({ countries, selectedCountry, onCountryChange, required = true }) => {
  return (
    <div className={styles["filter-group"]}>
      <label className={styles["filter-label"]}>
        <Globe size={16} />
        Country {required && <span className={styles["required"]}>*</span>}
      </label>
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
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
  );
};

export default CountryFilter;

