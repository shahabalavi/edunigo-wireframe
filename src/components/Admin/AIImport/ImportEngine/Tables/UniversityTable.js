import React from "react";
import TableHeader from "./TableHeader";
import styles from "../ImportEngine.module.css";

const UniversityTable = ({
  data,
  filteredData,
  stats,
  searchTerm,
  onSearchChange,
  selectedItems,
  onItemToggle,
  onSelectAll,
  onDeselectAll,
  onImport,
  selectedCountryName,
}) => {
  const allNewSelected =
    filteredData.filter((u) => !u.exists).length > 0 &&
    filteredData
      .filter((u) => !u.exists)
      .every((u) => selectedItems.includes(u.id));

  const handleSelectAll = () => {
    if (allNewSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleImport = () => {
    alert(`Importing ${selectedItems.length} universities...`);
    if (onImport) onImport();
  };

  return (
    <div className={styles["results-section"]}>
      <TableHeader
        title={`Universities for ${selectedCountryName} (${filteredData.length} found)`}
        description={`${stats.new} new universities available for import, ${stats.existing} already exist in database`}
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search universities..."
        onSelectAll={handleSelectAll}
        onDeselectAll={onDeselectAll}
        onImport={handleImport}
        selectedItems={selectedItems}
        showSelectAll={true}
        allSelected={allNewSelected}
      />

      <div className={styles["table-container"]}>
        <table className={styles["data-table"]}>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allNewSelected}
                  onChange={handleSelectAll}
                  className={styles["select-all-checkbox"]}
                />
              </th>
              <th>Name</th>
              <th>Website</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((university) => (
              <tr
                key={university.id}
                className={university.exists ? styles["exists-row"] : ""}
              >
                <td>
                  {university.exists ? (
                    <span className={styles["exists-badge"]}>Exists</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(university.id)}
                      onChange={() => onItemToggle(university.id)}
                      className={styles["item-checkbox"]}
                    />
                  )}
                </td>
                <td className={styles["name-cell"]}>
                  <div className={styles["name-content"]}>
                    <span className={styles["name"]}>{university.name}</span>
                    <code className={styles["slug"]}>{university.slug}</code>
                  </div>
                </td>
                <td>
                  <a
                    href={university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["website-link"]}
                  >
                    {university.website}
                  </a>
                </td>
                <td className={styles["description"]}>{university.description}</td>
                <td>
                  {university.exists ? (
                    <span className={styles["exists-label"]}>Exists</span>
                  ) : (
                    <span className={styles["ready-label"]}>Ready to import</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityTable;

