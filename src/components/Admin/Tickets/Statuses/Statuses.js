import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import CreateStatusModal from "./CreateStatusModal";
import EditStatusModal from "./EditStatusModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import styles from "./Statuses.module.css";

const Statuses = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchStatuses = async () => {
      setTimeout(() => {
        const sampleStatuses = [
          { id: 1, name: "open", title: "Open" },
          { id: 2, name: "in_progress", title: "In Progress" },
          { id: 3, name: "closed", title: "Closed" },
          { id: 4, name: "pending", title: "Pending" },
          { id: 5, name: "resolved", title: "Resolved" },
        ];

        setStatuses(sampleStatuses);
        setFilteredStatuses(sampleStatuses);
        setLoading(false);
      }, 1000);
    };

    fetchStatuses();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = statuses;

    if (searchTerm) {
      filtered = filtered.filter(
        (status) =>
          status.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          status.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStatuses(filtered);
    setCurrentPage(1);
  }, [searchTerm, statuses]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStatuses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredStatuses.length / itemsPerPage);

  const handleCreateStatus = (newStatus) => {
    const id = Math.max(...statuses.map((s) => s.id)) + 1;
    const statusWithId = { ...newStatus, id };
    setStatuses([...statuses, statusWithId]);
    setShowCreateModal(false);
  };

  const handleEditStatus = (updatedStatus) => {
    setStatuses(
      statuses.map((status) =>
        status.id === updatedStatus.id ? updatedStatus : status
      )
    );
    setShowEditModal(false);
    setSelectedStatus(null);
  };

  const handleDeleteStatus = () => {
    setStatuses(statuses.filter((status) => status.id !== selectedStatus.id));
    setShowDeleteModal(false);
    setSelectedStatus(null);
  };

  const openEditModal = (status) => {
    setSelectedStatus(status);
    setShowEditModal(true);
  };

  const openDeleteModal = (status) => {
    setSelectedStatus(status);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading statuses...</p>
      </div>
    );
  }

  return (
    <div className={styles["statuses-container"]}>
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
            <AlertCircle size={24} />
          </div>
          <div>
            <h1>Ticket Statuses</h1>
            <p>Manage ticket status categories</p>
          </div>
        </div>
        <button
          className={styles["create-btn"]}
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={20} />
          Create Status
        </button>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search statuses..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredStatuses.length} statuses
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <AlertCircle className={styles["empty-icon"]} size={48} />
              <h3>No statuses found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No statuses have been created yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["statuses-table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((status) => (
                <tr key={status.id}>
                  <td>
                    <div className={styles["status-id"]}>#{status.id}</div>
                  </td>
                  <td>
                    <div className={styles["status-name"]}>{status.name}</div>
                  </td>
                  <td>
                    <div className={styles["status-title"]}>{status.title}</div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["edit-btn"]}
                        onClick={() => openEditModal(status)}
                        title="Edit Status"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(status)}
                        title="Delete Status"
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
        <CreateStatusModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateStatus}
        />
      )}

      {showEditModal && selectedStatus && (
        <EditStatusModal
          status={selectedStatus}
          onClose={() => {
            setShowEditModal(false);
            setSelectedStatus(null);
          }}
          onUpdate={handleEditStatus}
        />
      )}

      {showDeleteModal && selectedStatus && (
        <DeleteConfirmationModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedStatus(null);
          }}
          onConfirm={handleDeleteStatus}
          itemName={`${selectedStatus.title} (${selectedStatus.name})`}
          itemType="status"
        />
      )}
    </div>
  );
};

export default Statuses;
