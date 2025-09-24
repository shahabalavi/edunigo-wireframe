import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import CreatePriorityModal from "./CreatePriorityModal";
import EditPriorityModal from "./EditPriorityModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import styles from "./Priorities.module.css";

const Priorities = () => {
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState([]);
  const [filteredPriorities, setFilteredPriorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchPriorities = async () => {
      setTimeout(() => {
        const samplePriorities = [
          { id: 1, name: "low", title: "Low" },
          { id: 2, name: "medium", title: "Medium" },
          { id: 3, name: "high", title: "High" },
          { id: 4, name: "urgent", title: "Urgent" },
          { id: 5, name: "critical", title: "Critical" },
        ];

        setPriorities(samplePriorities);
        setFilteredPriorities(samplePriorities);
        setLoading(false);
      }, 1000);
    };

    fetchPriorities();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = priorities;

    if (searchTerm) {
      filtered = filtered.filter(
        (priority) =>
          priority.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          priority.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPriorities(filtered);
    setCurrentPage(1);
  }, [searchTerm, priorities]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPriorities.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredPriorities.length / itemsPerPage);

  const handleCreatePriority = (newPriority) => {
    const id = Math.max(...priorities.map((p) => p.id)) + 1;
    const priorityWithId = { ...newPriority, id };
    setPriorities([...priorities, priorityWithId]);
    setShowCreateModal(false);
  };

  const handleEditPriority = (updatedPriority) => {
    setPriorities(
      priorities.map((priority) =>
        priority.id === updatedPriority.id ? updatedPriority : priority
      )
    );
    setShowEditModal(false);
    setSelectedPriority(null);
  };

  const handleDeletePriority = () => {
    setPriorities(
      priorities.filter((priority) => priority.id !== selectedPriority.id)
    );
    setShowDeleteModal(false);
    setSelectedPriority(null);
  };

  const openEditModal = (priority) => {
    setSelectedPriority(priority);
    setShowEditModal(true);
  };

  const openDeleteModal = (priority) => {
    setSelectedPriority(priority);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading priorities...</p>
      </div>
    );
  }

  return (
    <div className={styles["priorities-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate("/admin/tickets")}
          >
            <ArrowLeft size={20} />
          </button>
          <div className={styles["page-icon"]}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <h1>Priorities</h1>
            <p>Manage ticket priority levels</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Create Priority
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search priorities..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredPriorities.length} priorities
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <AlertTriangle className={styles["empty-icon"]} size={48} />
              <h3>No priorities found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No priorities have been created yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["priorities-table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((priority) => (
                <tr key={priority.id}>
                  <td>
                    <div className={styles["priority-id"]}>#{priority.id}</div>
                  </td>
                  <td>
                    <div className={styles["priority-name"]}>
                      {priority.name}
                    </div>
                  </td>
                  <td>
                    <div className={styles["priority-title"]}>
                      {priority.title}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => openEditModal(priority)}
                        title="Edit Priority"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(priority)}
                        title="Delete Priority"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button
            className={styles["pagination-btn"]}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className={styles["pagination-numbers"]}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${styles["pagination-number"]} ${
                    currentPage === pageNumber ? styles["active"] : ""
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>

          <button
            className={styles["pagination-btn"]}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreatePriorityModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePriority}
        />
      )}

      {showEditModal && selectedPriority && (
        <EditPriorityModal
          priority={selectedPriority}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPriority(null);
          }}
          onUpdate={handleEditPriority}
        />
      )}

      {showDeleteModal && selectedPriority && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPriority(null);
          }}
          onConfirm={handleDeletePriority}
          itemName={`${selectedPriority.title} (${selectedPriority.name})`}
          itemType="priority"
        />
      )}
    </div>
  );
};

export default Priorities;
