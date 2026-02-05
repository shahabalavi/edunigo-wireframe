import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  AlertCircle,
  ShieldCheck,
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
          {
            id: 1,
            name: "open",
            title: "Open",
            color: "#22c55e",
            description: "Newly created ticket awaiting assignment.",
            display_order: 1,
            is_protected: true,
            created_at: "2025-11-12T09:18:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
          {
            id: 2,
            name: "in_progress",
            title: "In Progress",
            color: "#3b82f6",
            description: "Actively being worked on by a support agent.",
            display_order: 2,
            is_protected: true,
            created_at: "2025-11-12T09:18:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
          {
            id: 3,
            name: "waiting_for_response",
            title: "Waiting for Response",
            color: "#f59e0b",
            description: "Waiting on customer or third-party response.",
            display_order: 3,
            is_protected: true,
            created_at: "2025-11-12T09:18:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
          {
            id: 4,
            name: "resolved",
            title: "Resolved",
            color: "#14b8a6",
            description: "Issue resolved, pending confirmation.",
            display_order: 4,
            is_protected: false,
            created_at: "2025-12-01T11:10:00Z",
            updated_at: "2026-01-10T08:45:00Z",
          },
          {
            id: 5,
            name: "closed",
            title: "Closed",
            color: "#64748b",
            description: "Ticket closed and archived.",
            display_order: 5,
            is_protected: true,
            created_at: "2025-11-12T09:18:00Z",
            updated_at: "2026-01-22T14:31:00Z",
          },
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
          status.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (status.description || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    filtered = [...filtered].sort((a, b) => {
      const orderA = a.display_order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.display_order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.id - b.id;
    });

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
    const id = statuses.length
      ? Math.max(...statuses.map((s) => s.id)) + 1
      : 1;
    const now = new Date().toISOString();
    const statusWithId = {
      ...newStatus,
      id,
      created_at: now,
      updated_at: now,
      is_protected: Boolean(newStatus.is_protected),
    };
    setStatuses([...statuses, statusWithId]);
    setShowCreateModal(false);
  };

  const handleEditStatus = (updatedStatus) => {
    const now = new Date().toISOString();
    setStatuses(
      statuses.map((status) =>
        status.id === updatedStatus.id
          ? { ...updatedStatus, updated_at: now }
          : status
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

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "—";
    return new Date(timestamp).toLocaleString();
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
            <p>Define, organize, and protect lifecycle statuses</p>
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

      <div className={styles["info-panel"]}>
        <div className={styles["info-card"]}>
          <h3>Module Purpose</h3>
          <p>
            Ticket statuses describe each phase of a ticket's lifecycle. Use
            them to keep workflows clear for agents and customers while
            preserving system integrity.
          </p>
        </div>
        <div className={styles["info-card"]}>
          <h3>Protected Statuses</h3>
          <p>
            Protected statuses are core system states. They cannot be deleted
            and may have limited editing depending on system rules.
          </p>
        </div>
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
                <th>Status</th>
                <th>Color</th>
                <th>Description</th>
                <th>Order</th>
                <th>Protected</th>
                <th>Timestamps</th>
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
                    <div className={styles["status-main"]}>
                      <div className={styles["status-title"]}>
                        {status.title}
                      </div>
                      <div className={styles["status-name"]}>
                        {status.name}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["status-color"]}>
                      <span
                        className={styles["color-swatch"]}
                        style={{ backgroundColor: status.color }}
                        aria-label={`Color ${status.color}`}
                      />
                      <span className={styles["color-value"]}>
                        {status.color}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className={styles["status-description"]}>
                      {status.description || "—"}
                    </div>
                  </td>
                  <td>
                    <div className={styles["status-order"]}>
                      {status.display_order ?? "—"}
                    </div>
                  </td>
                  <td>
                    <div className={styles["status-protected"]}>
                      {status.is_protected ? (
                        <span className={styles["protected-badge"]}>
                          <ShieldCheck size={14} />
                          Protected
                        </span>
                      ) : (
                        <span className={styles["custom-badge"]}>Custom</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={styles["status-timestamps"]}>
                      <span>
                        <strong>Created:</strong>{" "}
                        {formatTimestamp(status.created_at)}
                      </span>
                      <span>
                        <strong>Updated:</strong>{" "}
                        {formatTimestamp(status.updated_at)}
                      </span>
                    </div>
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
                        className={`${styles["delete-btn"]} ${
                          status.is_protected ? styles["disabled"] : ""
                        }`}
                        onClick={() =>
                          status.is_protected ? null : openDeleteModal(status)
                        }
                        title={
                          status.is_protected
                            ? "Protected statuses cannot be deleted"
                            : "Delete Status"
                        }
                        disabled={status.is_protected}
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
