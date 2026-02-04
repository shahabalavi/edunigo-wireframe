import React from "react";
import CountryFilter from "./CountryFilter";
import styles from "../ImportEngine.module.css";

const UniversityFilter = ({
  countries,
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <div className={styles["filters-container"]}>
      <CountryFilter
        countries={countries}
        selectedCountry={selectedCountry}
        onCountryChange={onCountryChange}
      />
    </div>
  );
};

export default UniversityFilter;

