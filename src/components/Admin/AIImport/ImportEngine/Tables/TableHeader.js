import React from "react";
import { Search } from "lucide-react";
import styles from "../ImportEngine.module.css";

const TableHeader = ({
  title,
  description,
  stats,
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  onSelectAll,
  onDeselectAll,
  onImport,
  selectedItems,
  showSelectAll = false,
  allSelected = false,
  statsText,
}) => {
  return (
    <>
      <div className={styles["results-header"]}>
        <div className={styles["results-info"]}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {stats.new > 0 && (
          <div className={styles["action-buttons"]}>
            {showSelectAll && (
              <button
                onClick={onSelectAll}
                className={styles["select-all-btn"]}
              >
                Select All New
              </button>
            )}
            {selectedItems.length > 0 && (
              <button
                onClick={onImport}
                className={styles["import-btn"]}
              >
                Import Selected ({selectedItems.length})
              </button>
            )}
          </div>
        )}
      </div>

      <div className={styles["search-stats-bar"]}>
        <div className={styles["search-container"]}>
          <Search size={16} className={styles["search-icon"]} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className={styles["search-input"]}
          />
        </div>
        <div className={styles["stats-minimal"]}>
          {statsText || `Total: ${stats.total} · Existing: ${stats.existing} · New: ${stats.new}`}
        </div>
      </div>
    </>
  );
};

export default TableHeader;

