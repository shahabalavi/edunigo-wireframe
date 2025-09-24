import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CreateEducationLevelModal from "./CreateEducationLevelModal";
import EditEducationLevelModal from "./EditEducationLevelModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./EducationLevels.module.css";

const EducationLevels = () => {
  const [educationLevels, setEducationLevels] = useState([]);
  const [filteredEducationLevels, setFilteredEducationLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleEducationLevels = [
        {
          id: 1,
          name: "High School Diploma",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Associate Degree",
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          name: "Bachelor's Degree",
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          name: "Master's Degree",
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          name: "Doctorate (PhD)",
          createdAt: "2024-01-19",
        },
        {
          id: 6,
          name: "Professional Degree",
          createdAt: "2024-01-20",
        },
        {
          id: 7,
          name: "Certificate",
          createdAt: "2024-01-21",
        },
        {
          id: 8,
          name: "Diploma",
          createdAt: "2024-01-22",
        },
        {
          id: 9,
          name: "Postgraduate Certificate",
          createdAt: "2024-01-23",
        },
        {
          id: 10,
          name: "Foundation Year",
          createdAt: "2024-01-24",
        },
      ];
      setEducationLevels(sampleEducationLevels);
      setFilteredEducationLevels(sampleEducationLevels);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = educationLevels;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((level) =>
        level.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters if needed
    if (filterBy !== "all") {
      // Add custom filter logic here if needed
    }

    setFilteredEducationLevels(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, educationLevels]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEducationLevels.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEducationLevels.length / itemsPerPage);

  const handleCreateEducationLevel = (educationLevelData) => {
    const newEducationLevel = {
      id: Math.max(...educationLevels.map((e) => e.id)) + 1,
      ...educationLevelData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setEducationLevels([...educationLevels, newEducationLevel]);
    setShowCreateModal(false);
  };

  const handleEditEducationLevel = (educationLevelData) => {
    const updatedEducationLevels = educationLevels.map((level) =>
      level.id === selectedEducationLevel.id
        ? { ...level, ...educationLevelData }
        : level
    );
    setEducationLevels(updatedEducationLevels);
    setShowEditModal(false);
    setSelectedEducationLevel(null);
  };

  const handleDeleteEducationLevel = () => {
    const updatedEducationLevels = educationLevels.filter(
      (level) => level.id !== selectedEducationLevel.id
    );
    setEducationLevels(updatedEducationLevels);
    setShowDeleteModal(false);
    setSelectedEducationLevel(null);
  };

  const openEditModal = (educationLevel) => {
    setSelectedEducationLevel(educationLevel);
    setShowEditModal(true);
  };

  const openDeleteModal = (educationLevel) => {
    setSelectedEducationLevel(educationLevel);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading education levels...</p>
      </div>
    );
  }

  return (
    <div className={styles["education-levels-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <BookOpen size={24} />
          </div>
          <div>
            <h1>Education Levels Management</h1>
            <p>Manage education levels and qualifications</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Add Education Level
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search education levels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles["search-input"]}
          />
        </div>

        <div className={styles["filter-container"]}>
          <Filter size={18} className={styles["filter-icon"]} />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className={styles["filter-select"]}
          >
            <option value="all">All Education Levels</option>
            <option value="recent">Recently Added</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <span>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredEducationLevels.length)} of{" "}
          {filteredEducationLevels.length} education levels
        </span>
      </div>

      {/* Education Levels Table */}
      <div className={styles["table-container"]}>
        <table className={styles["education-levels-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Education Level Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((level) => (
                <tr key={level.id}>
                  <td>{level.id}</td>
                  <td>
                    <div className={styles["education-level-name"]}>
                      <div className={styles["education-level-icon"]}>
                        <BookOpen size={16} />
                      </div>
                      {level.name}
                    </div>
                  </td>
                  <td>{level.createdAt}</td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => openEditModal(level)}
                        className={styles["edit-btn"]}
                        title="Edit Education Level"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(level)}
                        className={styles["delete-btn"]}
                        title="Delete Education Level"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={styles["empty-state"]}>
                  <div className={styles["empty-content"]}>
                    <BookOpen size={48} className={styles["empty-icon"]} />
                    <h3>No education levels found</h3>
                    <p>
                      {searchTerm
                        ? "No education levels match your search criteria"
                        : "Start by adding your first education level"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles["pagination-btn"]}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className={styles["pagination-numbers"]}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={[
                  styles["pagination-number"],
                  currentPage === page ? styles["active"] : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles["pagination-btn"]}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateEducationLevelModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateEducationLevel}
        />
      )}

      {showEditModal && selectedEducationLevel && (
        <EditEducationLevelModal
          educationLevel={selectedEducationLevel}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEducationLevel(null);
          }}
          onSubmit={handleEditEducationLevel}
        />
      )}

      {showDeleteModal && selectedEducationLevel && (
        <DeleteConfirmationModal
          educationLevel={selectedEducationLevel}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedEducationLevel(null);
          }}
          onConfirm={handleDeleteEducationLevel}
        />
      )}
    </div>
  );
};

export default EducationLevels;
