import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CountriesWeSupport.module.css";

const DEFAULT_COUNTRIES = [
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "GB", name: "UK", flag: "🇬🇧" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "US", name: "USA", flag: "🇺🇸" },
];

const CountriesWeSupport = ({ config = {}, isRtl = false }) => {
  const navigate = useNavigate();
  const {
    layout = "grid",
    cardStyle = "default",
    countryDetailLink = "/visa/",
    countries = DEFAULT_COUNTRIES,
  } = config;

  const handleCountry = (code) => {
    const base = countryDetailLink.replace(/\/$/, "");
    navigate(`${base}/${code.toLowerCase()}`);
  };

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>Countries We Support</h2>
        <p className={styles.subtitle}>Study abroad in top destinations with expert visa support</p>
        <div className={layout === "carousel" ? styles.carousel : styles.grid}>
          {countries.map((c) => (
            <button
              type="button"
              key={c.code}
              className={`${styles.card} ${styles[cardStyle]}`}
              onClick={() => handleCountry(c.code)}
            >
              <span className={styles.flag}>{c.flag}</span>
              <span className={styles.name}>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesWeSupport;
