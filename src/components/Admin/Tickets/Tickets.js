import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Ticket,
  ChevronLeft,
  ChevronRight,
  Eye,
  Paperclip,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import styles from "./Tickets.module.css";
import {
  applyScopeFilter,
  getCurrentUser,
  getScopeLabel,
} from "../../../utils/scopeFilter";
import { entityOwnership } from "../../../config/entityOwnership";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const currentUser = getCurrentUser();
  const scopeLabel = getScopeLabel(currentUser, "tickets");

  // Sample data - replace with actual API call
  useEffect(() => {
    const fetchTickets = async () => {
      // Simulate API call delay
      setTimeout(() => {
        const currentAdmin = "Admin User";
        const sampleTickets = [
          {
            id: 1,
            code: "TCK-2026-1042",
            subject: "Application Status Inquiry",
            user: { id: 12, name: "John Doe" },
            assignedAdmin: { id: 4, name: "Admin User" },
            organization: "Edunigo Global",
            project: "Computer Science - Fall 2026",
            topic: null,
            status: { id: 1, name: "open", title: "Open" },
            priority: { id: 2, name: "medium", title: "Medium" },
            description:
              "I would like to know the current status of my application for the Computer Science program.",
            attachments: 2,
            lastResponse: {
              by: "Admin User",
              at: "2026-02-03T14:12:00Z",
              type: "admin",
            },
            userRating: null,
            createdByType: "user",
            createdByAdmin: null,
            createdAt: "2026-02-01T10:18:00Z",
            updatedAt: "2026-02-03T14:12:00Z",
            assignedAdminId: 4,
          },
          {
            id: 2,
            code: "TCK-2026-1065",
            subject: "Document Upload Issue",
            user: { id: 22, name: "Jane Smith" },
            assignedAdmin: { id: 7, name: "Olivia Grant" },
            organization: "BrightPath Academy",
            project: "MBA Admission Review",
            topic: { id: 7, title: "Document Uploads" },
            status: { id: 2, name: "in_progress", title: "In Progress" },
            priority: { id: 1, name: "high", title: "High" },
            description:
              "I'm having trouble uploading my academic transcripts. The file upload keeps failing.",
            attachments: 1,
            lastResponse: {
              by: "Jane Smith",
              at: "2026-02-04T09:05:00Z",
              type: "user",
            },
            userRating: { score: 4, comment: "Resolved after follow-up." },
            createdByType: "user",
            createdByAdmin: null,
            createdAt: "2026-02-02T08:40:00Z",
            updatedAt: "2026-02-04T09:05:00Z",
            assignedAdminId: 7,
          },
          {
            id: 3,
            code: "TCK-2026-1081",
            subject: "Payment Processing Question",
            user: { id: 31, name: "Robert Chen" },
            assignedAdmin: { id: 4, name: "Admin User" },
            organization: "NextGen Scholars",
            project: "Fee Payment Portal",
            topic: { id: 5, title: "Payments" },
            status: { id: 1, name: "open", title: "Open" },
            priority: { id: 3, name: "low", title: "Low" },
            description:
              "I want to confirm if my payment was processed successfully. I see the charge on my card but not in my account.",
            attachments: 0,
            lastResponse: {
              by: "Finance Team",
              at: "2026-02-02T16:40:00Z",
              type: "internal",
            },
            userRating: { score: 5, comment: "Very helpful." },
            createdByType: "user",
            createdByAdmin: null,
            createdAt: "2026-02-02T13:05:00Z",
            updatedAt: "2026-02-02T16:40:00Z",
            assignedAdminId: 4,
          },
          {
            id: 4,
            code: "TCK-2026-1090",
            subject: "Course Enrollment Help",
            user: { id: 44, name: "Lisa Morgan" },
            assignedAdmin: { id: 9, name: "Ethan Blake" },
            organization: "Edunigo Global",
            project: "Enrollment Services",
            topic: null,
            status: { id: 3, name: "closed", title: "Closed" },
            priority: { id: 2, name: "medium", title: "Medium" },
            description:
              "I need help enrolling in the Advanced Data Structures course. The enrollment button is disabled.",
            attachments: 1,
            lastResponse: {
              by: "Ethan Blake",
              at: "2026-01-28T11:22:00Z",
              type: "admin",
            },
            userRating: { score: 3, comment: "Took a while." },
            createdByType: "admin",
            createdByAdmin: "Ethan Blake",
            createdAt: "2026-01-25T09:30:00Z",
            updatedAt: "2026-01-28T11:22:00Z",
            assignedAdminId: 9,
          },
          {
            id: 5,
            code: "TCK-2026-1123",
            subject: "Profile Information Update",
            user: { id: 55, name: "Ahmed Ali" },
            assignedAdmin: { id: 7, name: "Olivia Grant" },
            organization: "BrightPath Academy",
            project: "Student Profile",
            topic: { id: 11, title: "Profile Updates" },
            status: { id: 2, name: "in_progress", title: "In Progress" },
            priority: { id: 2, name: "medium", title: "Medium" },
            description:
              "I'd like to update my personal information on my profile, but I can't find where to do it.",
            attachments: 0,
            lastResponse: {
              by: "Ahmed Ali",
              at: "2026-02-05T10:02:00Z",
              type: "user",
            },
            userRating: null,
            createdByType: "admin",
            createdByAdmin: "Admin User",
            createdAt: "2026-02-04T15:10:00Z",
            updatedAt: "2026-02-05T10:02:00Z",
            assignedAdminId: 7,
          },
        ];

        const taggedTickets = sampleTickets.map((ticket) => ({
          ...ticket,
          isEditable:
            ticket.createdByType === "admin" &&
            ticket.createdByAdmin === currentAdmin,
        }));

        const scopedTickets = applyScopeFilter(
          taggedTickets,
          currentUser,
          "tickets",
          entityOwnership.tickets
        );

        setTickets(scopedTickets);
        setFilteredTickets(scopedTickets);
        setLoading(false);
      }, 1000);
    };

    fetchTickets();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = tickets;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.assignedAdmin.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          ticket.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (ticket.topic?.title || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterBy !== "all") {
      filtered = filtered.filter((ticket) => ticket.status.name === filterBy);
    }

    setFilteredTickets(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchTerm, filterBy, tickets]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const handleDeleteTicket = () => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket.id !== selectedTicket.id
    );
    setTickets(updatedTickets);
    setShowDeleteModal(false);
    setSelectedTicket(null);
  };

  const openDeleteModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowDeleteModal(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: {
        label: "Open",
        className: styles["status-open"],
        icon: AlertCircle,
      },
      in_progress: {
        label: "In Progress",
        className: styles["status-in-progress"],
        icon: Clock,
      },
      closed: {
        label: "Closed",
        className: styles["status-closed"],
        icon: CheckCircle,
      },
    };

    const config = statusConfig[status.name] || statusConfig.open;
    const IconComponent = config.icon;

    return (
      <span className={`${styles["status-badge"]} ${config.className}`}>
        <IconComponent size={12} />
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      low: {
        label: "Low",
        className: styles["priority-low"],
      },
      medium: {
        label: "Medium",
        className: styles["priority-medium"],
      },
      high: {
        label: "High",
        className: styles["priority-high"],
      },
    };

    const config = priorityConfig[priority.name] || priorityConfig.medium;

    return (
      <span className={`${styles["priority-badge"]} ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className={styles["loading-container"]}>
        <div className={styles["loading-spinner"]}></div>
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className={styles["tickets-container"]}>
      {/* Page Header */}
      <div className={styles["page-header"]}>
        <div className={styles["header-left"]}>
          <div className={styles["page-icon"]}>
            <Ticket size={24} />
          </div>
          <div>
            <h1>Ticket Management</h1>
            <p>Relationship-based support · Scope: {scopeLabel}</p>
          </div>
        </div>
        <div className={styles["header-actions"]}>
          <button
            className={styles["action-btn"]}
            onClick={() => navigate("/admin/tickets/create")}
          >
            Create Ticket
          </button>
        </div>
      </div>

      <div className={styles["info-panel"]}>
        <div className={styles["info-card"]}>
          <h3>Automatic Assignment</h3>
          <p>
            Each user is bound to a dedicated support admin. Every ticket
            inherits this assignment, ensuring continuity and accountability.
          </p>
        </div>
        <div className={styles["info-card"]}>
          <h3>Internal Collaboration</h3>
          <p>
            Internal messages allow cross-team collaboration without exposing
            discussions to the user or reassigning ownership.
          </p>
        </div>
      </div>

      {/* Controls Section */}
      <div className={styles["controls-section"]}>
        <div className={styles["search-container"]}>
          <Search className={styles["search-icon"]} size={20} />
          <input
            type="text"
            placeholder="Search by code, subject, user, admin, or topic..."
            className={styles["search-input"]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles["filter-container"]}>
          <Filter className={styles["filter-icon"]} size={20} />
          <select
            className={styles["filter-select"]}
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className={styles["results-info"]}>
        Showing {currentItems.length} of {filteredTickets.length} tickets
      </div>

      {/* Table Container */}
      <div className={styles["table-container"]}>
        {currentItems.length === 0 ? (
          <div className={styles["empty-state"]}>
            <div className={styles["empty-content"]}>
              <Ticket className={styles["empty-icon"]} size={48} />
              <h3>No tickets found</h3>
              <p>
                {searchTerm || filterBy !== "all"
                  ? "Try adjusting your search criteria"
                  : "No tickets have been created yet"}
              </p>
            </div>
          </div>
        ) : (
          <table className={styles["tickets-table"]}>
            <thead>
              <tr>
                <th>Ticket</th>
                <th>User</th>
                <th>Support Admin</th>
                <th>Target</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Priority</th>
                <th>User Rating</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <div className={styles["ticket-info"]}>
                      <div className={styles["ticket-avatar"]}>
                        <span>T#{ticket.id}</span>
                      </div>
                      <div>
                        <div className={styles["ticket-code"]}>
                          {ticket.code}
                        </div>
                        <div className={styles["ticket-subject"]}>
                          {ticket.subject}
                        </div>
                        <div className={styles["ticket-description"]}>
                          {ticket.description.length > 50
                            ? `${ticket.description.substring(0, 50)}...`
                            : ticket.description}
                        </div>
                        {ticket.attachments > 0 && (
                          <div className={styles["attachment-info"]}>
                            <Paperclip size={12} />
                            {ticket.attachments} attachment
                            {ticket.attachments !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["user-pill"]}>
                      {ticket.user.name}
                    </div>
                  </td>
                  <td>
                    <div className={styles["assigned-info"]}>
                      <div className={styles["assigned-avatar"]}>
                        <span>{getInitials(ticket.assignedAdmin.name)}</span>
                      </div>
                      <div className={styles["assigned-name"]}>
                        {ticket.assignedAdmin.name}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles["project-text"]}>
                      {ticket.project}
                    </div>
                  </td>
                  <td>
                    <div className={styles["topic-pill"]}>
                      {ticket.topic?.title || "General"}
                    </div>
                  </td>
                  <td>{getStatusBadge(ticket.status)}</td>
                  <td>{getPriorityBadge(ticket.priority)}</td>
                  <td>
                    {ticket.userRating ? (
                      <span className={styles["rating-pill"]}>
                        {ticket.userRating.score} / 5
                      </span>
                    ) : (
                      <span className={styles["rating-empty"]}>—</span>
                    )}
                  </td>
                  <td>
                    <div className={styles["created-date"]}>
                      {formatDate(ticket.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className={styles["action-buttons"]}>
                      <button
                        className={styles["view-btn"]}
                        onClick={() =>
                          navigate(`/admin/tickets/view/${ticket.id}`)
                        }
                        title="View Ticket"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className={`${styles["edit-btn"]} ${
                          ticket.isEditable ? "" : styles["disabled"]
                        }`}
                        onClick={() =>
                          ticket.isEditable
                            ? navigate(`/admin/tickets/edit/${ticket.id}`)
                            : null
                        }
                        title={
                          ticket.isEditable
                            ? "Edit Ticket"
                            : "User-submitted tickets cannot be edited"
                        }
                        disabled={!ticket.isEditable}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className={styles["delete-btn"]}
                        onClick={() => openDeleteModal(ticket)}
                        title="Delete Ticket"
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteTicket}
          itemName={`Ticket #${selectedTicket.id} - ${selectedTicket.subject}`}
          itemType="ticket"
        />
      )}
    </div>
  );
};

export default Tickets;
