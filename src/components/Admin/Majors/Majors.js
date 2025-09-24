import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CreateMajorModal from "./CreateMajorModal";
import EditMajorModal from "./EditMajorModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Majors.module.css";

const Majors = () => {
  const [majors, setMajors] = useState([]);
  const [filteredMajors, setFilteredMajors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleMajors = [
        {
          id: 1,
          name: "Computer Science",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Business Administration",
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          name: "Engineering",
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          name: "Medicine",
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          name: "Psychology",
          createdAt: "2024-01-19",
        },
        {
          id: 6,
          name: "Economics",
          createdAt: "2024-01-20",
        },
        {
          id: 7,
          name: "Mathematics",
          createdAt: "2024-01-21",
        },
        {
          id: 8,
          name: "Physics",
          createdAt: "2024-01-22",
        },
        {
          id: 9,
          name: "Chemistry",
          createdAt: "2024-01-23",
        },
        {
          id: 10,
          name: "Biology",
          createdAt: "2024-01-24",
        },
        {
          id: 11,
          name: "Literature",
          createdAt: "2024-01-25",
        },
        {
          id: 12,
          name: "History",
          createdAt: "2024-01-26",
        },
        {
          id: 13,
          name: "Art & Design",
          createdAt: "2024-01-27",
        },
        {
          id: 14,
          name: "Architecture",
          createdAt: "2024-01-28",
        },
        {
          id: 15,
          name: "Law",
          createdAt: "2024-01-29",
        },
      ];
      setMajors(sampleMajors);
      setFilteredMajors(sampleMajors);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = majors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((major) =>
        major.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters if needed
    if (filterBy !== "all") {
      // Add custom filter logic here if needed
    }

    setFilteredMajors(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, majors]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMajors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMajors.length / itemsPerPage);

  const handleCreateMajor = (majorData) => {
    const newMajor = {
      id: Math.max(...majors.map((m) => m.id)) + 1,
      ...majorData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setMajors([...majors, newMajor]);
    setShowCreateModal(false);
  };

  const handleEditMajor = (majorData) => {
    const updatedMajors = majors.map((major) =>
      major.id === selectedMajor.id ? { ...major, ...majorData } : major
    );
    setMajors(updatedMajors);
    setShowEditModal(false);
    setSelectedMajor(null);
  };

  const handleDeleteMajor = () => {
    const updatedMajors = majors.filter(
      (major) => major.id !== selectedMajor.id
    );
    setMajors(updatedMajors);
    setShowDeleteModal(false);
    setSelectedMajor(null);
  };

  const openEditModal = (major) => {
    setSelectedMajor(major);
    setShowEditModal(true);
  };

  const openDeleteModal = (major) => {
    setSelectedMajor(major);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading majors...</p>
      </div>
    );
  }

  return (
    <div className={styles["majors-container"]}>
      {/* Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <GraduationCap size={24} />
          </div>
          <div>
            <h1>Majors/Fields Management</h1>
            <p>Manage academic majors and fields of study</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={18} />
          Add Major/Field
        </button>
      </div>

      {/* Filters and Search */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search size={18} className={styles["search-icon"]} />
          <input
            type="text"
            placeholder="Search majors/fields..."
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
            <option value="all">All Majors/Fields</option>
            <option value="recent">Recently Added</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        <span>
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredMajors.length)} of{" "}
          {filteredMajors.length} majors/fields
        </span>
      </div>

      {/* Majors Table */}
      <div className={styles["table-container"]}>
        <table className={styles["majors-table"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Major/Field Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((major) => (
                <tr key={major.id}>
                  <td>{major.id}</td>
                  <td>
                    <div className={styles["major-name"]}>
                      <div className={styles["major-icon"]}>
                        <GraduationCap size={16} />
                      </div>
                      {major.name}
                    </div>
                  </td>
                  <td>{major.createdAt}</td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        onClick={() => openEditModal(major)}
                        className={styles["edit-btn"]}
                        title="Edit Major/Field"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(major)}
                        className={styles["delete-btn"]}
                        title="Delete Major/Field"
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
                    <GraduationCap size={48} className={styles["empty-icon"]} />
                    <h3>No majors/fields found</h3>
                    <p>
                      {searchTerm
                        ? "No majors/fields match your search criteria"
                        : "Start by adding your first major/field"}
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
        <CreateMajorModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateMajor}
        />
      )}

      {showEditModal && selectedMajor && (
        <EditMajorModal
          major={selectedMajor}
          onClose={() => {
            setShowEditModal(false);
            setSelectedMajor(null);
          }}
          onSubmit={handleEditMajor}
        />
      )}

      {showDeleteModal && selectedMajor && (
        <DeleteConfirmationModal
          major={selectedMajor}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMajor(null);
          }}
          onConfirm={handleDeleteMajor}
        />
      )}
    </div>
  );
};

export default Majors;
