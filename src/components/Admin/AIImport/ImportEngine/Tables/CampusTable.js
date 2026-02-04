import React from "react";
import { Building2, MapPin } from "lucide-react";
import TableHeader from "./TableHeader";
import styles from "../ImportEngine.module.css";

const CampusTable = ({
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
}) => {
  const allNewSelected =
    filteredData.filter((c) => !c.exists && c.cityExists).length > 0 &&
    filteredData
      .filter((c) => !c.exists && c.cityExists)
      .every((c) => selectedItems.includes(c.id));

  const handleSelectAll = () => {
    if (allNewSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleImport = () => {
    alert(`Importing ${selectedItems.length} campuses...`);
    if (onImport) onImport();
  };

  return (
    <div className={styles["results-section"]}>
      <TableHeader
        title={`Campuses (${filteredData.length} found)`}
        description={`${stats.new} new campuses available for import, ${stats.existing} already exist in database`}
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search campuses..."
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
              <th>University</th>
              <th>City</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((campus) => (
              <tr
                key={campus.id}
                className={
                  campus.exists
                    ? styles["exists-row"]
                    : !campus.cityExists
                    ? styles["invalid-row"]
                    : ""
                }
              >
                <td>
                  {campus.exists ? (
                    <span className={styles["exists-badge"]}>Exists</span>
                  ) : !campus.cityExists ? (
                    <span className={styles["invalid-badge"]}>Invalid</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(campus.id)}
                      onChange={() => onItemToggle(campus.id)}
                      className={styles["item-checkbox"]}
                    />
                  )}
                </td>
                <td className={styles["name-cell"]}>
                  <div className={styles["name-content"]}>
                    <span className={styles["name"]}>{campus.name}</span>
                    <code className={styles["slug"]}>{campus.slug}</code>
                  </div>
                </td>
                <td>
                  <div className={styles["university-cell"]}>
                    <Building2 size={14} />
                    <span>{campus.university}</span>
                  </div>
                </td>
                <td>
                  <div className={styles["city-cell"]}>
                    <MapPin size={14} />
                    <span>{campus.city}</span>
                    {!campus.cityExists && (
                      <span className={styles["missing-badge"]}>Missing</span>
                    )}
                  </div>
                </td>
                <td className={styles["address"]}>{campus.address}</td>
                <td>
                  <span
                    className={
                      campus.status === "Active"
                        ? styles["status-active"]
                        : styles["status-inactive"]
                    }
                  >
                    {campus.status}
                  </span>
                </td>
                <td>
                  {campus.exists ? (
                    <span className={styles["exists-label"]}>Exists</span>
                  ) : !campus.cityExists ? (
                    <span className={styles["missing-city-label"]}>
                      City does not exist
                    </span>
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

export default CampusTable;

