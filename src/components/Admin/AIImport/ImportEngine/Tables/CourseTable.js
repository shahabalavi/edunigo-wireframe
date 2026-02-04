import React from "react";
import { Building2, School } from "lucide-react";
import TableHeader from "./TableHeader";
import styles from "../ImportEngine.module.css";

const CourseTable = ({
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
    filteredData.filter((c) => !c.exists).length > 0 &&
    filteredData
      .filter((c) => !c.exists)
      .every((c) => selectedItems.includes(c.id));

  const handleSelectAll = () => {
    if (allNewSelected) {
      onDeselectAll();
    } else {
      onSelectAll();
    }
  };

  const handleImport = () => {
    alert(`Importing ${selectedItems.length} courses...`);
    if (onImport) onImport();
  };

  return (
    <div className={styles["results-section"]}>
      <TableHeader
        title={`Courses (${filteredData.length} found)`}
        description={`${stats.new} new courses available for import, ${stats.existing} already exist in database`}
        stats={stats}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        searchPlaceholder="Search courses..."
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
              <th>Education Level</th>
              <th>Major</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((course) => (
              <tr
                key={course.id}
                className={course.exists ? styles["exists-row"] : ""}
              >
                <td>
                  {course.exists ? (
                    <span className={styles["exists-badge"]}>Exists</span>
                  ) : (
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(course.id)}
                      onChange={() => onItemToggle(course.id)}
                      className={styles["item-checkbox"]}
                    />
                  )}
                </td>
                <td className={styles["name-cell"]}>
                  <div className={styles["name-content"]}>
                    <span className={styles["name"]}>{course.name}</span>
                    <code className={styles["slug"]}>{course.slug}</code>
                  </div>
                </td>
                <td>
                  <div className={styles["education-level-cell"]}>
                    <School size={14} />
                    <span>{course.educationLevel}</span>
                  </div>
                </td>
                <td>
                  <div className={styles["major-cell"]}>
                    <Building2 size={14} />
                    <span>{course.major}</span>
                  </div>
                </td>
                <td className={styles["description"]}>{course.description}</td>
                <td>
                  <span
                    className={
                      course.status === "Active"
                        ? styles["status-active"]
                        : styles["status-inactive"]
                    }
                  >
                    {course.status}
                  </span>
                </td>
                <td>
                  {course.exists ? (
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

export default CourseTable;

