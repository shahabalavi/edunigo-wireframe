import React from "react";
import { MapPin } from "lucide-react";
import TableHeader from "./TableHeader";
import styles from "../ImportEngine.module.css";

const CityTable = ({
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
  const handleImport = () => {
    alert(`Importing ${selectedItems.length} cities...`);
    if (onImport) onImport();
  };

  return (
    <div className={styles["results-section"]}>
      <TableHeader
        title={`Cities for ${selectedCountryName} (${filteredData.length} found)`}
        description={`${stats.new} new cities available for import, ${stats.existing} already exist in database`}
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search cities..."
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
        onImport={handleImport}
        selectedItems={selectedItems}
      />

      <div className={styles["table-container"]}>
        <table className={styles["data-table"]}>
          <thead>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>City Name</th>
              <th>Country</th>
              <th style={{ width: "150px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>
                  <div className={styles["city-name"]}>
                    <div className={styles["city-icon"]}>
                      <MapPin size={16} />
                    </div>
                    {city.name}
                  </div>
                </td>
                <td>
                  <span className={styles["country-badge"]}>
                    {selectedCountryName}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  {city.exists ? (
                    <span className={styles["exists-badge"]}>Exists</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(city.id)}
                      onChange={() => onItemToggle(city.id)}
                      className={styles["item-checkbox"]}
                    />
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

export default CityTable;

