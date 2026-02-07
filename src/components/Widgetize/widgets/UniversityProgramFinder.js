import React, { useState } from "react";
import { Search } from "lucide-react";
import styles from "./UniversityProgramFinder.module.css";

const UniversityProgramFinder = ({ config = {}, isRtl = false }) => {
  const {
    placeholder = "Find programs in Canada",
    filterOptions = ["country", "degree", "intake"],
    featuredUniversities = [],
  } = config;
  const [query, setQuery] = useState("");

  return (
    <section className={`${styles.section} ${isRtl ? styles.rtl : ""}`}>
      <div className={styles.container}>
        <h2 className={styles.title}>University & Program Finder</h2>
        <p className={styles.subtitle}>Search programs and get matched with universities</p>
        <div className={styles.searchWrap}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="search"
            className={styles.search}
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search programs"
          />
        </div>
        {filterOptions.length > 0 && (
          <div className={styles.filters}>
            {filterOptions.map((f) => (
              <select key={f} className={styles.filter} aria-label={f}>
                <option value="">{f.charAt(0).toUpperCase() + f.slice(1)}</option>
              </select>
            ))}
          </div>
        )}
        {featuredUniversities.length > 0 && (
          <div className={styles.featured}>
            <h3 className={styles.featuredTitle}>Featured Universities</h3>
            <div className={styles.featuredGrid}>
              {featuredUniversities.map((u, i) => (
                <div key={i} className={styles.uniCard}>{u.name || `University ${i + 1}`}</div>
              ))}
            </div>
          </div>
        )}
        {featuredUniversities.length === 0 && (
          <p className={styles.hint}>Configure featured universities in the page builder.</p>
        )}
      </div>
    </section>
  );
};

export default UniversityProgramFinder;
